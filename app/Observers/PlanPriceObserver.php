<?php

namespace App\Observers;

use App\Models\PlanPrice;
use Illuminate\Support\Facades\Cache;

class PlanPriceObserver
{
    /**
     * Handle the PlanPrice "saved" event.
     */
    public function saved(PlanPrice $planPrice): void
    {
        $this->clearCache($planPrice);
    }

    /**
     * Handle the PlanPrice "deleted" event.
     */
    public function deleted(PlanPrice $planPrice): void
    {
        $this->clearCache($planPrice);
    }

    /**
     * Clear related cache entries.
     */
    protected function clearCache(PlanPrice $planPrice): void
    {
        if ($planPrice->plan_id) {
            Cache::forget("plan-prices.plan.{$planPrice->plan_id}");
            Cache::forget('platforms.with-details');
            Cache::forget('platforms.active');
        }
    }
}

