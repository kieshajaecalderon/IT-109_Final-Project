<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Canteen;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminCanteenController extends Controller
{
    // List and search canteens
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => [
                'sometimes',
                'nullable',
                Rule::in(['active', 'inactive']),
            ],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
        ]);

        $query = Canteen::with('users:id,name,email')
            ->latest();

        if (!empty($validated['search'])) {
            $search = $validated['search'];

            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'ilike', "%{$search}%")
                    ->orWhere('location', 'ilike', "%{$search}%");
            });
        }

        if (isset($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        $canteens = $query->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'message' => 'Canteens retrieved successfully.',
            'canteens' => $canteens,
        ]);
    }

    // View one canteen
    public function show(int $id): JsonResponse
    {
        $canteen = Canteen::with([
            'users:id,name,email',
        ])->findOrFail($id);

        return response()->json([
            'message' => 'Canteen retrieved successfully.',
            'canteen' => $canteen,
        ]);
    }

    // Create a canteen
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'logo_url' => ['nullable', 'url', 'max:2048'],
            'location' => ['nullable', 'string', 'max:255'],
            'status' => [
                'sometimes',
                Rule::in(['active', 'inactive']),
            ],
        ]);

        $canteen = Canteen::create([
            ...$validated,
            'status' => $validated['status'] ?? 'active',
        ]);

        return response()->json([
            'message' => 'Canteen created successfully.',
            'canteen' => $canteen,
        ], 201);
    }

    // Update a canteen
    public function update(Request $request, int $id): JsonResponse
    {
        $canteen = Canteen::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'logo_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => [
                'sometimes',
                'required',
                Rule::in(['active', 'inactive']),
            ],
        ]);

        $canteen->update($validated);

        return response()->json([
            'message' => 'Canteen updated successfully.',
            'canteen' => $canteen->fresh()->load('users:id,name,email'),
        ]);
    }

    // Delete a canteen
    public function destroy(int $id): JsonResponse
    {
        $canteen = Canteen::findOrFail($id);

        $canteen->delete();

        return response()->json([
            'message' => 'Canteen deleted successfully.',
        ]);
    }

    // Assign a vendor to a canteen
    public function assignVendor(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'assignment' => ['nullable', 'string', 'max:100'],
        ]);

        $canteen = Canteen::findOrFail($id);

        $vendor = \App\Models\User::findOrFail($validated['user_id']);

        if (!$vendor->hasRole('Vendor')) {
            return response()->json([
                'message' => 'Only users with the Vendor role can be assigned to a canteen.',
            ], 422);
        }

        $canteen->users()->syncWithoutDetaching([
            $vendor->id => [
                'assignment' => $validated['assignment'] ?? 'Vendor',
            ],
        ]);

        return response()->json([
            'message' => 'Vendor assigned to canteen successfully.',
            'canteen' => $canteen->fresh()->load('users:id,name,email'),
        ]);
    }

    // Remove a vendor assignment
    public function removeVendor(int $id, int $userId): JsonResponse
    {
        $canteen = Canteen::findOrFail($id);

        $canteen->users()->detach($userId);

        return response()->json([
            'message' => 'Vendor removed from canteen successfully.',
        ]);
    }
}
