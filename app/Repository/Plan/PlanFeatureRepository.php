<?php

namespace App\Repository\Plan;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Plan\PlanFeatureRepositoryInterface;
use App\Models\PlanFeature;
use Illuminate\Database\Eloquent\Collection;

class PlanFeatureRepository extends BaseRepository implements PlanFeatureRepositoryInterface
{
    public function __construct(PlanFeature $planFeature)
    {
        parent::__construct($planFeature);
    }

    /**
     * Get all plan features for a specific plan.
     *
     * @param  int  $planId
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

