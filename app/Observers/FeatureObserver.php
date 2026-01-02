<?php

namespace App\Observers;

use App\Models\Feature;
use Illuminate\Support\Facades\Cache;

class FeatureObserver
{
    /**
     * Handle the Feature "saved" event.
     */
    public function saved(Feature $feature): void
    {
        $this->clearCache($feature);
    }

    /**
     * Handle the Feature "deleted" event.
     */
    public function deleted(Feature $feature): void
    {
        $this->clearCache($feature);
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(Feature $feature): void
    {
        Cache::forget('features.all-ordered');

        if ($feature->category) {
            Cache::forget("features.category.{$feature->category}");
        }

        // Clear wildcard pattern for filtered plans
        $this->clearCacheByPattern('plans.filtered.*');
    }

    /**
     * Clear cache entries matching a pattern.
     * Note: This uses Redis KEYS command which can be expensive in production.
     */
    protected function clearCacheByPattern(string $pattern): void
    {
        try {
            $redis = Cache::getRedis();
            $prefix = config('cache.prefix', '');
            $searchPattern = $prefix . $pattern;

            $keys = $redis->keys($searchPattern);
            if (!empty($keys)) {
                foreach ($keys as $key) {
                    // Remove prefix if it exists to get the actual cache key
                    $cacheKey = $prefix ? str_replace($prefix, '', $key) : $key;
                    Cache::forget($cacheKey);
                }
            }
        } catch (\Exception $e) {
            // Silently fail if Redis is not available or pattern matching fails
            // Log error in production if needed
        }
    }
}

