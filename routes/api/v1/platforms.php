<?php

use App\Http\Controllers\Api\v1\PlatformController;
use Illuminate\Support\Facades\Route;

Route::get('platforms', [PlatformController::class, 'index'])->name('api.v1.platforms.index');
Route::post('platforms', [PlatformController::class, 'store'])->name('api.v1.platforms.store');
Route::get('platforms/{platform}', [PlatformController::class, 'show'])->name('api.v1.platforms.show');
Route::match(['put', 'patch'], 'platforms/{platform}', [PlatformController::class, 'update'])->name('api.v1.platforms.update');
Route::delete('platforms/{platform}', [PlatformController::class, 'destroy'])->name('api.v1.platforms.destroy');

