<?php

namespace App\Observers;

use App\Models\Plan;
use Illuminate\Support\Facades\Cache;

class PlanObserver
{
    /**
     * Handle the Plan "saved" event.
     */
    public function saved(Plan $plan): void
    {
        $this->clearCache($plan);
    }

    /**
     * Handle the Plan "deleted" event.
     */
    public function deleted(Plan $plan): void
    {
        $this->clearCache($plan);
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(Plan $plan): void
    {
        Cache::forget('plans.active');
        Cache::forget('platforms.active');
        Cache::forget('platforms.with-details');

        if ($plan->platform_id && $plan->slug) {
            Cache::forget("plan.slug.{$plan->platform_id}.{$plan->slug}");
        }

        if ($plan->id) {
            Cache::forget("plan-prices.plan.{$plan->id}");
            Cache::forget("plan-features.plan.{$plan->id}");
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

