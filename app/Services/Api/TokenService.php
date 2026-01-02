<?php

namespace App\Services\Api;

use App\Contracts\Infrastructure\TokenServiceInterface;
use App\Models\User;

class TokenService implements TokenServiceInterface
{
    public function createToken(User $user): string
    {
        return $user->createToken('auth_token')->plainTextToken;
    }
}
