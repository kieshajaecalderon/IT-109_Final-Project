<?php

namespace App\Http\Controllers;

use App\Models\WebhookEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PayMongoWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Get the raw request body and signature header.
        $payload = $request->getContent();
        $signatureHeader = $request->header('Paymongo-Signature');

        $webhookSecret = config('services.paymongo.webhook_secret');

        if (!$webhookSecret || !$signatureHeader) {
            return response()->json([
                'success' => false,
                'message' => 'Webhook configuration or signature is missing.',
            ], 401);
        }

        // Parse the signature header.
        $parts = [];

        foreach (explode(',', $signatureHeader) as $part) {
            $pair = explode('=', trim($part), 2);

            if (count($pair) === 2) {
                $parts[$pair[0]] = $pair[1];
            }
        }

        $timestamp = $parts['t'] ?? null;

        // Decode only to identify test or live mode.
        $event = json_decode($payload, true);

        if (!$timestamp || !is_array($event)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid webhook payload.',
            ], 400);
        }

        $isLive = $event['data']['attributes']['livemode'] ?? false;

        $receivedSignature = $isLive
            ? ($parts['li'] ?? '')
            : ($parts['te'] ?? '');

        // Generate the expected HMAC signature.
        $signedPayload = $timestamp . '.' . $payload;

        $expectedSignature = hash_hmac(
            'sha256',
            $signedPayload,
            $webhookSecret
        );

        // Reject requests with invalid signatures.
        if (
            $receivedSignature === '' ||
            !hash_equals($expectedSignature, $receivedSignature)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid webhook signature.',
            ], 401);
        }

        // Get the event information.
        $eventId = $event['data']['id'] ?? null;
        $eventType = $event['data']['attributes']['type'] ?? null;

        if (!$eventId || !$eventType) {
            return response()->json([
                'success' => false,
                'message' => 'Webhook event information is incomplete.',
            ], 400);
        }

        // Save the event once to prevent duplicate processing.
        $inserted = DB::table('webhook_events')->insertOrIgnore([
            'event_id' => $eventId,
            'event_type' => $eventType,
            'payload' => json_encode($event),
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => $inserted
                ? 'Webhook received successfully.'
                : 'Webhook event was already received.',
        ], 200);
    }
}
