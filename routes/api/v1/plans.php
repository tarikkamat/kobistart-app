<?php

use App\Http\Controllers\Api\v1\PlanController;
use Illuminate\Support\Facades\Route;

Route::get('plans', [PlanController::class, 'index'])->name('api.v1.plans.index');
Route::post('plans', [PlanController::class, 'store'])->name('api.v1.plans.store');
Route::get('plans/{plan}', [PlanController::class, 'show'])->name('api.v1.plans.show');
Route::match(['put', 'patch'], 'plans/{plan}', [PlanController::class, 'update'])->name('api.v1.plans.update');
Route::delete('plans/{plan}', [PlanController::class, 'destroy'])->name('api.v1.plans.destroy');

// Nested resources for Plan Features
Route::get('plans/{plan}/plan-features', [PlanController::class, 'indexPlanFeatures'])->name('api.v1.plans.plan-features.index');
Route::get('plans/{plan}/plan-features/{planFeature}', [PlanController::class, 'showPlanFeature'])->name('api.v1.plans.plan-features.show');
Route::post('plans/{plan}/plan-features', [PlanController::class, 'storePlanFeature'])->name('api.v1.plans.plan-features.store');
Route::match(['put', 'patch'], 'plans/{plan}/plan-features/{planFeature}', [PlanController::class, 'updatePlanFeature'])->name('api.v1.plans.plan-features.update');
Route::delete('plans/{plan}/plan-features/{planFeature}', [PlanController::class, 'destroyPlanFeature'])->name('api.v1.plans.plan-features.destroy');

// Nested resources for Plan Prices
Route::get('plans/{plan}/plan-prices', [PlanController::class, 'indexPlanPrices'])->name('api.v1.plans.plan-prices.index');
Route::get('plans/{plan}/plan-prices/{planPrice}', [PlanController::class, 'showPlanPrice'])->name('api.v1.plans.plan-prices.show');
Route::post('plans/{plan}/plan-prices', [PlanController::class, 'storePlanPrice'])->name('api.v1.plans.plan-prices.store');
Route::match(['put', 'patch'], 'plans/{plan}/plan-prices/{planPrice}', [PlanController::class, 'updatePlanPrice'])->name('api.v1.plans.plan-prices.update');
Route::delete('plans/{plan}/plan-prices/{planPrice}', [PlanController::class, 'destroyPlanPrice'])->name('api.v1.plans.plan-prices.destroy');

