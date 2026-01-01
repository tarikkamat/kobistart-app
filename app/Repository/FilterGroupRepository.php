<?php

namespace App\Repository;

use App\Models\FilterGroup;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class FilterGroupRepository extends BaseRepository
{
    public function __construct(FilterGroup $filterGroup)
    {
        parent::__construct($filterGroup);
    }

    /**
     * Get all active filter groups ordered by order field.
     *
     * @return Collection<int, FilterGroup>
     */
    public function getActiveFilterGroups(): Collection
    {
        return $this->model
            ->where('status', true)
            ->orderBy('order')
            ->get();
    }

    /**
     * Get filter groups with their items.
     *
     * @return Collection<int, FilterGroup>
     */
    public function getFilterGroupsWithItems(): Collection
    {
        return $this->model
            ->where('status', true)
            ->with(['filterItems' => function ($query) {
                $query->where('status', true)
                    ->orderBy('order');
            }])
            ->orderBy('order')
            ->get();
    }
}

