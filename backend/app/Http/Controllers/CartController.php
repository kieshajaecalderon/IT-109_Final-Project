<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Http\Requests\UpdateCartItemRequest;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display all carts belonging to the authenticated customer.
     */
    public function index(Request $request)
    {
        $carts = Cart::with('items.menuItem')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $carts,
        ], 200);
    }

    /**
     * Update the quantity of an item in the customer's cart.
     */
    public function updateItem(UpdateCartItemRequest $request, int $id)
    {
        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($id);

        $cartItem->update([
            'quantity' => $request->validated()['quantity'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cart item quantity updated successfully.',
            'data' => $cartItem->fresh(),
        ], 200);
    }

    /**
     * Remove an item from the customer's cart.
     */
    public function removeItem(Request $request, int $id)
    {
        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($id);

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart successfully.',
        ], 200);
    }
}
