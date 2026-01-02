<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateUserProfile
{
    /**
     * Validate and update user profile.
     *
     * @param  User  $user
     * @param  array<string, string>  $input
     * @return User
     */
    public function execute(User $user, array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
        ])->validate();

        $user->fill($input);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return $user;
    }
}

