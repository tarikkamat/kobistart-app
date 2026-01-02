<?php

use Illuminate\Support\Facades\Route;

// Public routes
require __DIR__ . '/web/home.php';
require __DIR__ . '/web/wizard.php';
require __DIR__ . '/web/plans.php';
require __DIR__ . '/web/platforms.php';
require __DIR__ . '/web/campaigns.php';
require __DIR__ . '/web/grow-business.php';

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    require __DIR__ . '/web/comments.php';
    require __DIR__ . '/web/favorites.php';
    require __DIR__ . '/web/comparisons.php';
    require __DIR__ . '/web/wizard-analyses.php';
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
