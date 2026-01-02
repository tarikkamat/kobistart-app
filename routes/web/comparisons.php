<?php

use App\Http\Controllers\Comparison\ComparisonController;
use Illuminate\Support\Facades\Route;

Route::post('/comparisons', [ComparisonController::class, 'store'])->name('comparisons.store');
Route::get('/comparisons', [ComparisonController::class, 'index'])->name('comparisons.index');
Route::get('/comparisons/check', [ComparisonController::class, 'check'])->name('comparisons.check');
Route::get('/comparisons/{comparison}', [ComparisonController::class, 'show'])->name('comparisons.show');
Route::delete('/comparisons/{comparison}', [ComparisonController::class, 'destroy'])->name('comparisons.destroy');

