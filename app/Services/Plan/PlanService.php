<?php

namespace App\Services\Plan;

use App\Contracts\Base\BaseService;
use App\Contracts\Plan\PlanServiceInterface;
use App\Repository\Plan\PlanRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanService extends BaseService implements PlanServiceInterface
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

