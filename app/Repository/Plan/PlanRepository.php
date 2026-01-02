<?php

namespace App\Repository\Plan;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Plan\PlanRepositoryInterface;
use App\Models\Plan;
use Illuminate\Database\Eloquent\Collection;

class PlanRepository extends BaseRepository implements PlanRepositoryInterface
{
    public function __construct(Plan $plan)
    {
        parent::__construct($plan);
    }

    /**
     * Get all active plans ordered by order field.
     *
     * @return Collection<int, Plan>
     */
    public function getActivePlans(): Collection
    {
        return $this->model
            ->where('status', true)
            ->with([
                'platform',
                'planPrices',
                'planFeatures.feature' => function ($q) {
                    $q->orderBy('order');
                }
            ])
            ->orderBy('order')
            ->get();
    }

    /**
     * Get plan by slug with relations.
     *
     * @param  string  $slug
     * @param  int  $platformId
     * @return Plan|null
     */
    public function getPlanBySlug(string $slug, int $platformId): ?Plan
    {
        return $this->model
            ->where('slug', $slug)
            ->where('platform_id', $platformId)
            ->where('status', true)
            ->with([
                'platform',
                'planPrices',
                'planFeatures.feature' => function ($q) {
                    $q->orderBy('order');
                }
            ])
            ->first();
    }

    /**
     * Get plans with filters applied.
     *
     * @param  array<int>  $featureIds
     * @param  array<string>  $featureKeys
     * @return Collection<int, Plan>
     */
    public function getPlansWithFilters(array $featureIds = [], array $featureKeys = []): Collection
    {
        $query = $this->model
            ->where('status', true)
            ->with([
                'platform',
                'planPrices',
                'planFeatures.feature' => function ($q) {
                    $q->orderBy('order');
                }
            ]);

        // Apply feature filters
        if (!empty($featureIds) || !empty($featureKeys)) {
            $query->whereHas('planFeatures', function ($q) use ($featureIds, $featureKeys) {
                $q->where(function ($subQuery) use ($featureIds, $featureKeys) {
                    if (!empty($featureIds)) {
                        $subQuery->whereIn('feature_id', $featureIds);
                    }
                    if (!empty($featureKeys)) {
                        $subQuery->orWhereHas('feature', function ($featureQuery) use ($featureKeys) {
                            $featureQuery->whereIn('key', $featureKeys);
                        });
                    }
                });
            });
        }

        return $query->orderBy('order')->get();
    }
}

