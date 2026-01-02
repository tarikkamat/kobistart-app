<?php

use App\Http\Controllers\Api\v1\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('token', [AuthController::class, 'getToken'])->name('api.v1.auth.token');

