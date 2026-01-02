<?php

use App\Http\Controllers\Api\v1\FilterGroupController;
use Illuminate\Support\Facades\Route;

Route::get('filter-groups', [FilterGroupController::class, 'index'])->name('api.v1.filter-groups.index');
Route::post('filter-groups', [FilterGroupController::class, 'store'])->name('api.v1.filter-groups.store');
Route::get('filter-groups/{filterGroup}', [FilterGroupController::class, 'show'])->name('api.v1.filter-groups.show');
Route::match(['put', 'patch'], 'filter-groups/{filterGroup}', [FilterGroupController::class, 'update'])->name('api.v1.filter-groups.update');
Route::delete('filter-groups/{filterGroup}', [FilterGroupController::class, 'destroy'])->name('api.v1.filter-groups.destroy');

