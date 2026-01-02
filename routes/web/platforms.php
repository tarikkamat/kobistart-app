<?php

use App\Http\Controllers\Platform\PlatformController;
use Illuminate\Support\Facades\Route;

Route::get('/platforms', [PlatformController::class, 'index'])->name('platforms.index');
Route::get('/platforms/{platform:slug}', [PlatformController::class, 'show'])->name('platforms.show');
Route::get('/platforms/{platform:slug}/{plan:slug}',
    [PlatformController::class, 'planShow'])->name('platforms.plans.show');
Route::get('/compare/{comparison}', [PlatformController::class, 'compare'])->name('platforms.compare');

