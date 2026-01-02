<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth routes (no middleware)
    require __DIR__.'/api/v1/auth.php';

    // Protected routes (require authentication)
    Route::middleware(['auth:sanctum'])->group(function () {
        require __DIR__.'/api/v1/platforms.php';
        require __DIR__.'/api/v1/plans.php';
        require __DIR__.'/api/v1/features.php';
        require __DIR__.'/api/v1/filter-groups.php';
        require __DIR__.'/api/v1/filter-items.php';
        require __DIR__.'/api/v1/images.php';
    });
});
