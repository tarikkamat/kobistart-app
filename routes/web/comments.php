<?php

use App\Http\Controllers\Comment\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');

