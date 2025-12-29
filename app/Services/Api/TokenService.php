<?php

namespace App\Services\Api;

use App\Models\User;

class TokenService
{
    public function createToken(User $user)
    {
        return $user->createToken('auth_token')->plainTextToken;
    }
}
