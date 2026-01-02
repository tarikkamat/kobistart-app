<?php

use App\Http\Controllers\Plan\PlanController;
use Illuminate\Support\Facades\Route;

Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');

