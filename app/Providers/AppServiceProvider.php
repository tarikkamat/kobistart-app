<?php

namespace App\Providers;

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
        // Migrate session analyses to user when authenticated
        Event::listen(Authenticated::class, function (Authenticated $event) {
            $wizardAnalysisService = app(WizardAnalysisService::class);
            $wizardAnalysisService->migrateSessionAnalyses($event->user->id);
        });
    }
}
