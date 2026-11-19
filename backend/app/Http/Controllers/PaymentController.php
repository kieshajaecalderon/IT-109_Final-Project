<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a payment belonging to the authenticated customer.
     */
    public function show(Request $request, int $id)
    {
        $payment = Payment::whereHas('order', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->select([
            'id',
            'order_id',
            'payment_method',
            'amount',
            'currency',
            'status',
            'paid_at',
            'created_at',
        ])
        ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $payment,
        ], 200);
    }
}
