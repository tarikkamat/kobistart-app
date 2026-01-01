<?php

namespace App\Services;

use App\Repository\PlanPriceRepository;
use App\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

class PlanPriceService extends BaseService
{
    public function __construct(PlanPriceRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all plan prices for a specific plan.
     *
     * @param int $planId
     * @return Collection<int, \App\Models\PlanPrice>
     */
    public function getByPlanId(int $planId): Collection
    {
        /** @var PlanPriceRepository $repository */
        $repository = $this->repository;
        return $repository->getByPlanId($planId);
    }
}

