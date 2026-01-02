<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Api\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct(private TokenService $tokenService)
    {
    }

    public function getToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($user->role !== Role::SUPER_ADMIN) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'access_token' => $this->tokenService->createToken($user),
                'token_type' => 'Bearer',
            ],
        ], 200);
    }
}
