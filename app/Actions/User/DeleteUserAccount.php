<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DeleteUserAccount
{
    /**
     * Validate and delete user account.
     *
     * @param  User  $user
     * @param  array<string, string>  $input
     * @return void
     */
    public function execute(User $user, array $input): void
    {
        Validator::make($input, [
            'password' => ['required', 'current_password'],
        ])->validate();

        Auth::logout();

        $user->delete();

        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}

