<?php

namespace App\Contracts\Infrastructure;

use App\Models\User;

interface TokenServiceInterface
{
    /**
     * Create a token for a user.
     *
     * @param  User  $user
     * @return string
     */
    public function createToken(User $user): string;
}

