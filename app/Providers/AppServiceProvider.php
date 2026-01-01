<?php

namespace App\Providers;

use App\Services\Ai\AiServiceFactory;
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
        //
    }
}
