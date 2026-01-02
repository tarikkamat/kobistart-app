<?php

namespace App\Services\Plan;

use App\Contracts\Base\BaseService;
use App\Contracts\Plan\PlanFeatureServiceInterface;
use App\Repository\Plan\PlanFeatureRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class PlanFeatureService extends BaseService implements PlanFeatureServiceInterface
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
        return Cache::remember("plan-features.plan.{$planId}", 3600, function () use ($planId) {
            /** @var PlanFeatureRepository $repository */
            $repository = $this->repository;
            return $repository->getByPlanId($planId);
        });
    }
}

