<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\FeatureController;
use App\Http\Controllers\Api\v1\FilterGroupController;
use App\Http\Controllers\Api\v1\FilterItemController;
use App\Http\Controllers\Api\v1\ImageController;
use App\Http\Controllers\Api\v1\PlanController;
use App\Http\Controllers\Api\v1\PlatformController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('token', [AuthController::class, 'getToken']);
    Route::middleware(['auth:sanctum'])->apiResource('platforms', PlatformController::class)->names([
        'index' => 'api.v1.platforms.index',
        'show' => 'api.v1.platforms.show',
        'store' => 'api.v1.platforms.store',
        'update' => 'api.v1.platforms.update',
        'destroy' => 'api.v1.platforms.destroy',
    ]);
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('plans', PlanController::class)->names([
            'index' => 'api.v1.plans.index',
            'show' => 'api.v1.plans.show',
            'store' => 'api.v1.plans.store',
            'update' => 'api.v1.plans.update',
            'destroy' => 'api.v1.plans.destroy',
        ]);

        // Nested resources for Plan Features
        Route::get('plans/{plan}/plan-features',
            [PlanController::class, 'indexPlanFeatures'])->name('api.v1.plans.plan-features.index');
        Route::get('plans/{plan}/plan-features/{planFeature}',
            [PlanController::class, 'showPlanFeature'])->name('api.v1.plans.plan-features.show');
        Route::post('plans/{plan}/plan-features',
            [PlanController::class, 'storePlanFeature'])->name('api.v1.plans.plan-features.store');
        Route::match(['put', 'patch'], 'plans/{plan}/plan-features/{planFeature}',
            [PlanController::class, 'updatePlanFeature'])->name('api.v1.plans.plan-features.update');
        Route::delete('plans/{plan}/plan-features/{planFeature}',
            [PlanController::class, 'destroyPlanFeature'])->name('api.v1.plans.plan-features.destroy');

        // Nested resources for Plan Prices
        Route::get('plans/{plan}/plan-prices',
            [PlanController::class, 'indexPlanPrices'])->name('api.v1.plans.plan-prices.index');
        Route::get('plans/{plan}/plan-prices/{planPrice}',
            [PlanController::class, 'showPlanPrice'])->name('api.v1.plans.plan-prices.show');
        Route::post('plans/{plan}/plan-prices',
            [PlanController::class, 'storePlanPrice'])->name('api.v1.plans.plan-prices.store');
        Route::match(['put', 'patch'], 'plans/{plan}/plan-prices/{planPrice}',
            [PlanController::class, 'updatePlanPrice'])->name('api.v1.plans.plan-prices.update');
        Route::delete('plans/{plan}/plan-prices/{planPrice}',
            [PlanController::class, 'destroyPlanPrice'])->name('api.v1.plans.plan-prices.destroy');
    });
    Route::middleware(['auth:sanctum'])->apiResource('features', FeatureController::class)->names([
        'index' => 'api.v1.features.index',
        'show' => 'api.v1.features.show',
        'store' => 'api.v1.features.store',
        'update' => 'api.v1.features.update',
        'destroy' => 'api.v1.features.destroy',
    ]);
    Route::middleware(['auth:sanctum'])->apiResource('filter-groups', FilterGroupController::class)->names([
        'index' => 'api.v1.filter-groups.index',
        'show' => 'api.v1.filter-groups.show',
        'store' => 'api.v1.filter-groups.store',
        'update' => 'api.v1.filter-groups.update',
        'destroy' => 'api.v1.filter-groups.destroy',
    ]);
    Route::middleware(['auth:sanctum'])->apiResource('filter-items', FilterItemController::class)->names([
        'index' => 'api.v1.filter-items.index',
        'show' => 'api.v1.filter-items.show',
        'store' => 'api.v1.filter-items.store',
        'update' => 'api.v1.filter-items.update',
        'destroy' => 'api.v1.filter-items.destroy',
    ]);
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('images', [ImageController::class, 'index'])->name('api.v1.images.index');
        Route::get('images/{image}', [ImageController::class, 'show'])->name('api.v1.images.show');
        Route::post('images', [ImageController::class, 'store'])->name('api.v1.images.store');
        Route::delete('images/{image}', [ImageController::class, 'destroy'])->name('api.v1.images.destroy');
    });
});
