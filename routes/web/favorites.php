<?php

use App\Http\Controllers\Favorite\FavoriteController;
use Illuminate\Support\Facades\Route;

Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
Route::delete('/favorites', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

