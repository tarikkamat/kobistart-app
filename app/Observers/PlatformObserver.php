<?php

namespace App\Observers;

use App\Models\Platform;
use Illuminate\Support\Facades\Cache;

class PlatformObserver
{
    /**
     * Handle the Platform "saved" event.
     */
    public function saved(Platform $platform): void
    {
        $this->clearCache($platform);
    }

    /**
     * Handle the Platform "deleted" event.
     */
    public function deleted(Platform $platform): void
    {
        $this->clearCache($platform);
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(Platform $platform): void
    {
        Cache::forget('platforms.active');
        Cache::forget('platforms.with-details');

        if ($platform->slug) {
            Cache::forget("platform.slug.{$platform->slug}");
        }
    }
}

