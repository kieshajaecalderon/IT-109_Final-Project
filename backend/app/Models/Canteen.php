<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Canteen extends Model
{
    protected $fillable = [
        'name',
        'description',
        'logo_url',
        'location',
        'status',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'canteen_users',
            'canteen_id',
            'user_id'
        )->withPivot('assignment');
    }
}
