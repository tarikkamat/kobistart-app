<?php

namespace App\Observers;

use App\Models\PlanFeature;
use Illuminate\Support\Facades\Cache;

class PlanFeatureObserver
{
    /**
     * Handle the PlanFeature "saved" event.
     */
    public function saved(PlanFeature $planFeature): void
    {
        $this->clearCache($planFeature);
    }

    /**
     * Handle the PlanFeature "deleted" event.
     */
    public function deleted(PlanFeature $planFeature): void
    {
        $this->clearCache($planFeature);
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(PlanFeature $planFeature): void
    {
        if ($planFeature->plan_id) {
            Cache::forget("plan-features.plan.{$planFeature->plan_id}");
            Cache::forget('platforms.with-details');
            Cache::forget('platforms.active');
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

