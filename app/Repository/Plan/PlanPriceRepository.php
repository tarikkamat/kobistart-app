<?php

namespace App\Repository\Plan;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Plan\PlanPriceRepositoryInterface;
use App\Models\PlanPrice;
use Illuminate\Database\Eloquent\Collection;

class PlanPriceRepository extends BaseRepository implements PlanPriceRepositoryInterface
{
    public function __construct(PlanPrice $planPrice)
    {
        parent::__construct($planPrice);
    }

    /**
     * Get all plan prices for a specific plan.
     *
     * @param  int  $planId
     * @return Collection<int, PlanPrice>
     */
    public function getByPlanId(int $planId): Collection
    {
        return $this->model
            ->where('plan_id', $planId)
            ->get();
    }
}

