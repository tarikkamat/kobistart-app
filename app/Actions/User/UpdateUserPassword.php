<?php

namespace App\Actions\User;

use App\Actions\Fortify\PasswordValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UpdateUserPassword
{
    use PasswordValidationRules;

    /**
     * Validate and update user password.
     *
     * @param  User  $user
     * @param  array<string, string>  $input
     * @return void
     */
    public function execute(User $user, array $input): void
    {
        Validator::make($input, [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ])->validate();

        $user->update([
            'password' => $input['password'],
        ]);
    }
}

