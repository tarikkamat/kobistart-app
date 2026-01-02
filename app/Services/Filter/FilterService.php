<?php

namespace App\Services\Filter;

use App\Contracts\Base\BaseService;
use App\Contracts\Filter\FilterServiceInterface;
use App\Repository\Filter\FilterGroupRepository;
use App\Repository\Filter\FilterItemRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class FilterService extends BaseService implements FilterServiceInterface
{
    public function __construct(
        FilterGroupRepository $repository,
        private FilterItemRepository $filterItemRepository
    ) {
        parent::__construct($repository);
    }

    /**
     * Get all active filter groups with their items.
     *
     * @return Collection<int, \App\Models\FilterGroup>
     */
    public function getFilterGroupsWithItems(): Collection
    {
        return Cache::remember('filter-groups.with-items', 3600, function () {
            /** @var FilterGroupRepository $repository */
            $repository = $this->repository;
            return $repository->getFilterGroupsWithItems();
        });
    }

    /**
     * Get filter items by their IDs.
     *
     * @param  array<int>  $filterItemIds
     * @return Collection<int, \App\Models\FilterItem>
     */
    public function getFilterItemsByIds(array $filterItemIds): Collection
    {
        if (empty($filterItemIds)) {
            return collect();
        }

        $sortedIds = $filterItemIds;
        sort($sortedIds);
        $hash = hash('sha256', json_encode($sortedIds, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return Cache::remember("filter-items.ids.{$hash}", 3600, function () use ($filterItemIds) {
            /** @var \App\Repository\Filter\FilterItemRepository $repository */
            $repository = $this->filterItemRepository;
            return $repository->all()
                ->whereIn('id', $filterItemIds)
                ->filter(fn($item) => $item->status === true);
        });
    }

    /**
     * Extract feature IDs and feature keys from filter items.
     *
     * @param  Collection<int, \App\Models\FilterItem>  $filterItems
     * @return array{feature_ids: array<int>, feature_keys: array<string>}
     */
    public function extractFeatureFilters(Collection $filterItems): array
    {
        $featureIds = [];
        $featureKeys = [];

        foreach ($filterItems as $item) {
            if ($item->feature_id) {
                $featureIds[] = $item->feature_id;
            }
            if ($item->feature_key) {
                $featureKeys[] = $item->feature_key->value;
            }
        }

        return [
            'feature_ids' => array_unique($featureIds),
            'feature_keys' => array_unique($featureKeys),
        ];
    }
}

