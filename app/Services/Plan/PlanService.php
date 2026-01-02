<?php

namespace App\Services\Plan;

use App\Contracts\Base\BaseService;
use App\Contracts\Plan\PlanServiceInterface;
use App\Repository\Plan\PlanRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

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
        return Cache::remember('plans.active', 3600, function () {
            /** @var PlanRepository $repository */
            $repository = $this->repository;
            return $repository->getActivePlans();
        });
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
        return Cache::remember("plan.slug.{$platformId}.{$slug}", 3600, function () use ($slug, $platformId) {
            /** @var PlanRepository $repository */
            $repository = $this->repository;
            return $repository->getPlanBySlug($slug, $platformId);
        });
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
        $hash = hash('sha256', json_encode([
            'feature_ids' => $featureIds,
            'feature_keys' => $featureKeys,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return Cache::remember("plans.filtered.{$hash}", 3600, function () use ($featureIds, $featureKeys) {
            /** @var PlanRepository $repository */
            $repository = $this->repository;
            return $repository->getPlansWithFilters($featureIds, $featureKeys);
        });
    }
}

