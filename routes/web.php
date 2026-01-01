<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ComparisonController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
Route::get('/platforms', [PlatformController::class, 'index'])->name('platforms.index');
Route::get('/platforms/{platform:slug}', [PlatformController::class, 'show'])->name('platforms.show');
Route::get('/platforms/{platform:slug}/{plan:slug}', [PlatformController::class, 'planShow'])->name('platforms.plans.show');
Route::get('/compare/{comparison}', [PlatformController::class, 'compare'])->name('platforms.compare');
Route::post('/comments', [CommentController::class, 'store'])->middleware(['auth'])->name('comments.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites', [FavoriteController::class, 'destroy'])->name('favorites.destroy');
    
    Route::post('/comparisons', [ComparisonController::class, 'store'])->name('comparisons.store');
    Route::get('/comparisons', [ComparisonController::class, 'index'])->name('comparisons.index');
    Route::get('/comparisons/check', [ComparisonController::class, 'check'])->name('comparisons.check');
    Route::get('/comparisons/{comparison}', [ComparisonController::class, 'show'])->name('comparisons.show');
    Route::delete('/comparisons/{comparison}', [ComparisonController::class, 'destroy'])->name('comparisons.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
