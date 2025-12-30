<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/platforms', [PlatformController::class, 'index'])->name('platforms.index');
Route::get('/platforms/{platform:slug}', [PlatformController::class, 'show'])->name('platforms.show');
Route::post('/comments', [CommentController::class, 'store'])->middleware(['auth'])->name('comments.store');

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
