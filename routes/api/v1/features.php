<?php

use App\Http\Controllers\Api\v1\FeatureController;
use Illuminate\Support\Facades\Route;

Route::get('features', [FeatureController::class, 'index'])->name('api.v1.features.index');
Route::post('features', [FeatureController::class, 'store'])->name('api.v1.features.store');
Route::get('features/{feature}', [FeatureController::class, 'show'])->name('api.v1.features.show');
Route::match(['put', 'patch'], 'features/{feature}', [FeatureController::class, 'update'])->name('api.v1.features.update');
Route::delete('features/{feature}', [FeatureController::class, 'destroy'])->name('api.v1.features.destroy');

