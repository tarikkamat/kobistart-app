<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\PlatformController;
use App\Http\Controllers\Api\v1\PlanController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('token', [AuthController::class, 'getToken']);
    Route::middleware(['auth:sanctum'])->apiResource('platforms', PlatformController::class)->names([
        'index' => 'api.v1.platforms.index',
        'show' => 'api.v1.platforms.show',
        'store' => 'api.v1.platforms.store',
        'destroy' => 'api.v1.platforms.destroy',
    ]);
    Route::middleware(['auth:sanctum'])->apiResource('plans', PlanController::class)->names([
        'index' => 'api.v1.plans.index',
        'store' => 'api.v1.plans.store',
    ]);
});
