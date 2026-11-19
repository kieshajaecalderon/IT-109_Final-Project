<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\AdminCanteenController;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:5,1');

    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'me']);
    });
});

// Profile Management
Route::middleware('auth:sanctum')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
    Route::patch('/', [ProfileController::class, 'update']);
    Route::post('/photo', [ProfileController::class, 'uploadPhoto']);
});

// Address Management
Route::middleware('auth:sanctum')->prefix('addresses')->group(function () {
    Route::get('/', [AddressController::class, 'index']);
    Route::post('/', [AddressController::class, 'store']);
    Route::put('/{id}', [AddressController::class, 'update']);
    Route::delete('/{id}', [AddressController::class, 'destroy']);
    Route::patch('/{id}/default', [AddressController::class, 'setDefault']);
});

// Admin User Management
Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/users')
    ->group(function () {
        Route::get('/', [AdminUserController::class, 'index']);
        Route::get('/{id}', [AdminUserController::class, 'show']);
        Route::patch('/{id}/status', [AdminUserController::class, 'updateStatus']);
        Route::patch('/{id}/role', [AdminUserController::class, 'updateRole']);
    });
// Admin Canteen Management
Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/canteens')
    ->group(function () {
        Route::get('/', [AdminCanteenController::class, 'index']);
        Route::post('/', [AdminCanteenController::class, 'store']);

        Route::get('/{id}', [AdminCanteenController::class, 'show']);
        Route::put('/{id}', [AdminCanteenController::class, 'update']);
        Route::patch('/{id}', [AdminCanteenController::class, 'update']);
        Route::delete('/{id}', [AdminCanteenController::class, 'destroy']);

        Route::post('/{id}/vendors', [AdminCanteenController::class, 'assignVendor']);
        Route::delete('/{id}/vendors/{userId}', [AdminCanteenController::class, 'removeVendor']);
    });

// Compatibility endpoint
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load(['roles', 'profile', 'addresses']);
});
