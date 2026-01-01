<?php

namespace App\Repository;

use App\Models\PlanPrice;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanPriceRepository extends BaseRepository
{
    public function __construct(PlanPrice $planPrice)
    {
        parent::__construct($planPrice);
    }

    /**
     * Get all plan prices for a specific plan.
     *
     * @param int $planId
     * @return Collection<int, PlanPrice>
     */
    public function getByPlanId(int $planId): Collection
    {
        return $this->model
            ->where('plan_id', $planId)
            ->get();
    }
}

