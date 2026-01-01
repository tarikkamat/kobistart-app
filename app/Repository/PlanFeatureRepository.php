<?php

namespace App\Repository;

use App\Models\PlanFeature;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanFeatureRepository extends BaseRepository
{
    public function __construct(PlanFeature $planFeature)
    {
        parent::__construct($planFeature);
    }

    /**
     * Get all plan features for a specific plan.
     *
     * @param int $planId
     * @return Collection<int, PlanFeature>
     */
    public function getByPlanId(int $planId): Collection
    {
        return $this->model
            ->where('plan_id', $planId)
            ->with('feature')
            ->get();
    }
}

