<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Repository\PlanFeatureRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanFeatureService extends BaseService
{
    public function __construct(PlanFeatureRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all plan features for a specific plan.
     *
     * @param  int  $planId
     * @return Collection<int, \App\Models\PlanFeature>
     */
    public function getByPlanId(int $planId): Collection
    {
        /** @var PlanFeatureRepository $repository */
        $repository = $this->repository;
        return $repository->getByPlanId($planId);
    }
}

