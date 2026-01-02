<?php

use App\Http\Controllers\Api\v1\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('images', [ImageController::class, 'index'])->name('api.v1.images.index');
Route::get('images/{image}', [ImageController::class, 'show'])->name('api.v1.images.show');
Route::post('images', [ImageController::class, 'store'])->name('api.v1.images.store');
Route::delete('images/{image}', [ImageController::class, 'destroy'])->name('api.v1.images.destroy');

