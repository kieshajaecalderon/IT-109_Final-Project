<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * Register a new customer, vendor, or runner.
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'phone' => [
                'required',
                'regex:/^09\d{9}$/',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
            'role' => [
                'required',
                Rule::in(['Customer', 'Vendor', 'Runner']),
            ],

            'region' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'street_address' => ['nullable', 'string', 'max:255'],
        ]);

        // Require all four address levels if any is supplied.
        $request->validate([
            'region' => ['required_with:province,city,barangay'],
            'province' => ['required_with:region,city,barangay'],
            'city' => ['required_with:region,province,barangay'],
            'barangay' => ['required_with:region,province,city'],
        ]);

        $role = Role::where('name', $validated['role'])->first();

        if (!$role) {
            return response()->json([
                'message' => 'Selected role is unavailable.',
            ], 422);
        }

        $user = DB::transaction(function () use ($validated, $role) {
            $user = User::create([
                'name' => trim(
                    $validated['first_name'] . ' ' . $validated['last_name']
                ),
                'email' => $validated['email'],
                'password' => $validated['password'],
                'phone' => $validated['phone'],
                'is_active' => true,
            ]);

            $user->profile()->create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'birth_date' => $validated['birth_date'] ?? null,
            ]);

            $user->roles()->attach($role->id);

            if (!empty($validated['region'])) {
                $user->addresses()->create([
                    'label' => 'Home',
                    'region' => $validated['region'],
                    'province' => $validated['province'],
                    'city' => $validated['city'],
                    'barangay' => $validated['barangay'],
                    'street_address' => $validated['street_address'] ?? null,
                    'is_default' => true,
                ]);
            }

            return $user;
        });

        $token = $user->createToken('canteenhub-auth')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful.',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load(['roles', 'profile', 'addresses']),
        ], 201);
    }

    /**
     * Log in an existing user.
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => 'Your account is currently inactive.',
            ], 403);
        }

        $token = $user->createToken('canteenhub-auth')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load(['roles', 'profile', 'addresses']),
        ]);
    }

    /**
     * Log out by revoking the current access token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful.',
        ]);
    }

    /**
     * Return the currently authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()->load([
                'roles',
                'profile',
                'addresses',
                'canteens',
            ]),
        ]);
    }
}
