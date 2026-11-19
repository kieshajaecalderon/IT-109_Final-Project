<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load([
            'roles',
            'profile',
            'addresses',
            'canteens',
        ]);

        return response()->json([
            'message' => 'Profile retrieved successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => ['sometimes', 'required', 'string', 'max:100'],
            'last_name' => ['sometimes', 'required', 'string', 'max:100'],
            'birth_date' => ['sometimes', 'nullable', 'date', 'before:today'],
            'phone' => [
                'sometimes',
                'required',
                'regex:/^09\d{9}$/',
                Rule::unique('users', 'phone')->ignore($user->id),
            ],
        ]);

        $profileData = [];

        foreach (['first_name', 'last_name', 'birth_date'] as $field) {
            if (array_key_exists($field, $validated)) {
                $profileData[$field] = $validated[$field];
            }
        }

        if (!empty($profileData)) {
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                $profileData
            );
        }

        if (array_key_exists('phone', $validated)) {
            $user->phone = $validated['phone'];
        }

        if (
            array_key_exists('first_name', $validated) ||
            array_key_exists('last_name', $validated)
        ) {
            $firstName = $validated['first_name']
                ?? $user->profile?->first_name;

            $lastName = $validated['last_name']
                ?? $user->profile?->last_name;

            $user->name = trim($firstName . ' ' . $lastName);
        }

        if ($user->isDirty()) {
            $user->save();
        }

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user->fresh()->load([
                'roles',
                'profile',
                'addresses',
                'canteens',
            ]),
        ]);
    }

    /**
     * Upload or replace the authenticated user's profile photo.
     */
    public function uploadPhoto(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'photo' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        $user = $request->user();

        $profile = $user->profile()->firstOrCreate(
            ['user_id' => $user->id],
            [
                'first_name' => '',
                'last_name' => '',
            ]
        );

        $oldPhoto = $profile->profile_photo;

        $photoPath = $validated['photo']->store(
            'profile-photos',
            'public'
        );

        $profile->update([
            'profile_photo' => $photoPath,
        ]);

        if (
            $oldPhoto &&
            $oldPhoto !== $photoPath &&
            Storage::disk('public')->exists($oldPhoto)
        ) {
            Storage::disk('public')->delete($oldPhoto);
        }

        return response()->json([
            'message' => 'Profile photo uploaded successfully.',
            'photo_path' => $photoPath,
            'photo_url' => Storage::disk('public')->url($photoPath),
            'user' => $user->fresh()->load([
                'roles',
                'profile',
                'addresses',
                'canteens',
            ]),
        ]);
    }
}
