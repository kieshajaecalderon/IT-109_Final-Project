<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use InvalidArgumentException;
use RuntimeException;

class PayMongoService
{
    private const API_URL = 'https://api.paymongo.com/v2/checkout_sessions';

    /**
     * Create a PayMongo Checkout Session.
     */
    public function createCheckoutSession(
        array $lineItems,
        string $referenceNumber,
        string $successUrl,
        string $cancelUrl
    ): array {
        $secretKey = config('services.paymongo.secret_key');

        if (!$secretKey) {
            throw new RuntimeException(
                'PayMongo Secret Key is not configured.'
            );
        }

        if (empty($lineItems)) {
            throw new InvalidArgumentException(
                'Checkout must contain at least one item.'
            );
        }

        $formattedItems = [];

        foreach ($lineItems as $item) {
            if (
                empty($item['name']) ||
                !isset($item['amount'], $item['quantity']) ||
                !is_numeric($item['amount']) ||
                !is_numeric($item['quantity']) ||
                (int) $item['amount'] <= 0 ||
                (int) $item['quantity'] < 1 ||
                (int) $item['quantity'] > 99
            ) {
                throw new InvalidArgumentException(
                    'Invalid checkout line item.'
                );
            }

            $formattedItems[] = [
                'name' => (string) $item['name'],
                'amount' => (int) $item['amount'],
                'currency' => 'PHP',
                'quantity' => (int) $item['quantity'],
            ];
        }

        $response = Http::withBasicAuth($secretKey, '')
            ->acceptJson()
            ->timeout(30)
            ->post(self::API_URL, [
                'data' => [
                    'attributes' => [
                        'line_items' => $formattedItems,
                        'payment_method_types' => [
                            'card',
                            'gcash',
                            'qrph',
                        ],
                        'success_url' => $successUrl,
                        'cancel_url' => $cancelUrl,
                        'reference_number' => $referenceNumber,
                        'send_email_receipt' => true,
                    ],
                ],
            ]);

        if ($response->failed()) {
            throw new RuntimeException(
                'PayMongo Checkout Session request failed. HTTP status: '
                . $response->status()
            );
        }

        $checkoutSession = $response->json('data');

        if (
            empty($checkoutSession['id']) ||
            empty($checkoutSession['attributes']['checkout_url'])
        ) {
            throw new RuntimeException(
                'PayMongo returned an incomplete Checkout Session response.'
            );
        }

        return [
            'checkout_session_id' => $checkoutSession['id'],
            'checkout_url' => $checkoutSession['attributes']['checkout_url'],
        ];
    }
}
