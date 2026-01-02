<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Repository\PlanRepository;
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

    /**
     * Get plan by slug.
     *
     * @param  string  $slug
     * @param  int  $platformId
     * @return \App\Models\Plan|null
     */
    public function getPlanBySlug(string $slug, int $platformId): ?\App\Models\Plan
    {
        /** @var PlanRepository $repository */
        $repository = $this->repository;
        return $repository->getPlanBySlug($slug, $platformId);
    }

    /**
     * Get plans with filters applied.
     *
     * @param  array<int>  $featureIds
     * @param  array<string>  $featureKeys
     * @return Collection<int, \App\Models\Plan>
     */
    public function getPlansWithFilters(array $featureIds = [], array $featureKeys = []): Collection
    {
        /** @var PlanRepository $repository */
        $repository = $this->repository;
        return $repository->getPlansWithFilters($featureIds, $featureKeys);
    }
}
