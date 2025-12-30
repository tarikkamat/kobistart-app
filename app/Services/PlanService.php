<?php

namespace App\Services;

use App\Repository\PlanRepository;
use App\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

class PlanService extends BaseService
{
    public function __construct(PlanRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all active plans ordered by order field.
     *
     * @return Collection<int, \App\Models\Plan>
     */
    public function getActivePlans(): Collection
    {
        /** @var PlanRepository $repository */
        $repository = $this->repository;
        return $repository->getActivePlans();
    }
}
