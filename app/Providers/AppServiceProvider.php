<?php

namespace App\Providers;

use App\Models\Feature;
use App\Models\FilterGroup;
use App\Models\FilterItem;
use App\Models\Plan;
use App\Models\PlanFeature;
use App\Models\PlanPrice;
use App\Models\Platform;
use App\Observers\FeatureObserver;
use App\Observers\FilterGroupObserver;
use App\Observers\FilterItemObserver;
use App\Observers\PlanFeatureObserver;
use App\Observers\PlanObserver;
use App\Observers\PlanPriceObserver;
use App\Observers\PlatformObserver;
use App\Services\Ai\AiServiceFactory;
use App\Services\WizardAnalysisService;
use Illuminate\Auth\Events\Authenticated;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(AiServiceFactory::class, function ($app) {
            return new AiServiceFactory();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model observers for cache invalidation
        Platform::observe(PlatformObserver::class);
        Plan::observe(PlanObserver::class);
        PlanPrice::observe(PlanPriceObserver::class);
        PlanFeature::observe(PlanFeatureObserver::class);
        Feature::observe(FeatureObserver::class);
        FilterGroup::observe(FilterGroupObserver::class);
        FilterItem::observe(FilterItemObserver::class);

        // Migrate session analyses to user when authenticated
        Event::listen(Authenticated::class, function (Authenticated $event) {
            $wizardAnalysisService = app(WizardAnalysisService::class);
            $wizardAnalysisService->migrateSessionAnalyses($event->user->id);
        });
    }
}
