<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PayMongoWebhookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Customer Routes
Route::middleware('auth:sanctum')->group(function () {

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::put('/cart/items/{id}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{id}', [CartController::class, 'removeItem']);

    // Order History
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // Payment
    Route::get('/payments/{id}', [PaymentController::class, 'show']);

    // PayMongo Webhook (Public endpoint)
    Route::post('/webhooks/paymongo', [PayMongoWebhookController::class, 'handle']);

});
