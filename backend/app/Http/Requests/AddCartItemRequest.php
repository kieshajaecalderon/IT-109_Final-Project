<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddCartItemRequest extends FormRequest
{
    /**
     * Determine whether the customer is authorized.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Validation rules for adding an item to a cart.
     */
    public function rules(): array
    {
        return [
            'cart_id' => [
                'required',
                'integer',
                'exists:carts,id',
            ],

            'menu_item_id' => [
                'required',
                'integer',
                'exists:menu_items,id',
            ],

            'quantity' => [
                'required',
                'integer',
                'min:1',
                'max:99',
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'cart_id.required' => 'A cart is required.',
            'cart_id.exists' => 'The selected cart does not exist.',
            'menu_item_id.required' => 'Please select a menu item.',
            'menu_item_id.exists' => 'The selected menu item does not exist.',
            'quantity.min' => 'Quantity must be at least 1.',
            'quantity.max' => 'Quantity cannot exceed 99.',
        ];
    }
}