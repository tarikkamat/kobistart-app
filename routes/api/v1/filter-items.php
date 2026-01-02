<?php

use App\Http\Controllers\Api\v1\FilterItemController;
use Illuminate\Support\Facades\Route;

Route::get('filter-items', [FilterItemController::class, 'index'])->name('api.v1.filter-items.index');
Route::post('filter-items', [FilterItemController::class, 'store'])->name('api.v1.filter-items.store');
Route::get('filter-items/{filterItem}', [FilterItemController::class, 'show'])->name('api.v1.filter-items.show');
Route::match(['put', 'patch'], 'filter-items/{filterItem}', [FilterItemController::class, 'update'])->name('api.v1.filter-items.update');
Route::delete('filter-items/{filterItem}', [FilterItemController::class, 'destroy'])->name('api.v1.filter-items.destroy');

