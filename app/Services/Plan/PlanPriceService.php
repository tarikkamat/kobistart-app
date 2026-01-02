<?php

namespace App\Services\Plan;

use App\Contracts\Base\BaseService;
use App\Contracts\Plan\PlanPriceServiceInterface;
use App\Repository\Plan\PlanPriceRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class PlanPriceService extends BaseService implements PlanPriceServiceInterface
{
    public function __construct(PlanPriceRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all plan prices for a specific plan.
     *
     * @param  int  $planId
     * @return Collection<int, \App\Models\PlanPrice>
     */
    public function getByPlanId(int $planId): Collection
    {
        return Cache::remember("plan-prices.plan.{$planId}", 3600, function () use ($planId) {
            /** @var PlanPriceRepository $repository */
            $repository = $this->repository;
            return $repository->getByPlanId($planId);
        });
    }
}

