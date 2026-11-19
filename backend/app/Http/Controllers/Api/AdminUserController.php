<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
            'role' => [
                'sometimes',
                'nullable',
                Rule::in(['Customer', 'Vendor', 'Runner', 'Admin']),
            ],
            'status' => [
                'sometimes',
                'nullable',
                Rule::in(['active', 'inactive']),
            ],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
        ]);

        $query = User::with(['roles', 'profile'])->latest();

        if (!empty($validated['search'])) {
            $search = $validated['search'];

            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%");
            });
        }

        if (!empty($validated['role'])) {
            $role = $validated['role'];

            $query->whereHas('roles', function ($builder) use ($role) {
                $builder->where('name', $role);
            });
        }

        if (isset($validated['status'])) {
            $query->where(
                'is_active',
                $validated['status'] === 'active'
            );
        }

        $users = $query->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'message' => 'Users retrieved successfully.',
            'users' => $users,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $user = User::with([
            'roles',
            'profile',
            'addresses',
            'canteens',
        ])->findOrFail($id);

        return response()->json([
            'message' => 'User retrieved successfully.',
            'user' => $user,
        ]);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $admin = $request->user();
        $user = User::with('roles')->findOrFail($id);

        $newStatus = $validated['is_active'];

        if (!$newStatus && $admin->id === $user->id) {
            return response()->json([
                'message' => 'You cannot deactivate your own Admin account.',
            ], 422);
        }

        if (
            !$newStatus &&
            $user->is_active &&
            $user->hasRole('Admin')
        ) {
            $activeAdmins = User::where('is_active', true)
                ->whereHas('roles', function ($query) {
                    $query->where('name', 'Admin');
                })
                ->count();

            if ($activeAdmins <= 1) {
                return response()->json([
                    'message' => 'The last active Admin account cannot be deactivated.',
                ], 422);
            }
        }

        $user->update([
            'is_active' => $newStatus,
        ]);

        if (!$newStatus) {
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => $newStatus
                ? 'User account activated successfully.'
                : 'User account deactivated successfully.',
            'user' => $user->fresh()->load(['roles', 'profile']),
        ]);
    }

    public function updateRole(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'role' => [
                'required',
                'string',
                Rule::in(['Customer', 'Vendor', 'Runner', 'Admin']),
            ],
        ]);

        $admin = $request->user();
        $user = User::with('roles')->findOrFail($id);

        $newRole = Role::where('name', $validated['role'])->firstOrFail();

        if (
            $admin->id === $user->id &&
            $validated['role'] !== 'Admin'
        ) {
            return response()->json([
                'message' => 'You cannot remove your own Admin role.',
            ], 422);
        }

        if (
            $user->hasRole('Admin') &&
            $validated['role'] !== 'Admin'
        ) {
            $activeAdmins = User::where('is_active', true)
                ->whereHas('roles', function ($query) {
                    $query->where('name', 'Admin');
                })
                ->count();

            if ($user->is_active && $activeAdmins <= 1) {
                return response()->json([
                    'message' => 'The last active Admin role cannot be removed.',
                ], 422);
            }
        }

        DB::transaction(function () use ($user, $newRole) {
            $user->roles()->sync([$newRole->id]);
        });

        return response()->json([
            'message' => 'User role updated successfully.',
            'user' => $user->fresh()->load(['roles', 'profile']),
        ]);
    }
}
