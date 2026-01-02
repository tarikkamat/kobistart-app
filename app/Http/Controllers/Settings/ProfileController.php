<?php

namespace App\Http\Controllers\Settings;

use App\Actions\User\DeleteUserAccount;
use App\Actions\User\UpdateUserProfile;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $action = new UpdateUserProfile();
        $action->execute($request->user(), $request->all());

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $action = new DeleteUserAccount();
        $action->execute($request->user(), $request->all());

        return redirect('/');
    }
}
