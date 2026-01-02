<?php

namespace App\Observers;

use App\Models\FilterItem;
use Illuminate\Support\Facades\Cache;

class FilterItemObserver
{
    /**
     * Handle the FilterItem "saved" event.
     */
    public function saved(FilterItem $filterItem): void
    {
        $this->clearCache();
    }

    /**
     * Handle the FilterItem "deleted" event.
     */
    public function deleted(FilterItem $filterItem): void
    {
        $this->clearCache();
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(): void
    {
        Cache::forget('filter-groups.with-items');

        // Clear wildcard pattern for filter items
        $this->clearCacheByPattern('filter-items.ids.*');
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

