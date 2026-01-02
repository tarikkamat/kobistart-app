<?php

namespace App\Repository;

use App\Contracts\BaseRepository;
use App\Models\FilterItem;
use Illuminate\Database\Eloquent\Collection;

class FilterItemRepository extends BaseRepository
{
    public function __construct(FilterItem $filterItem)
    {
        parent::__construct($filterItem);
    }

    /**
     * Get all active filter items ordered by order field.
     *
     * @return Collection<int, FilterItem>
     */
    public function getActiveFilterItems(): Collection
    {
        return $this->model
            ->where('status', true)
            ->orderBy('order')
            ->get();
    }

    /**
     * Get filter items by group ID.
     *
     * @param  int  $groupId
     * @return Collection<int, FilterItem>
     */
    public function getItemsByGroup(int $groupId): Collection
    {
        return $this->model
            ->where('filter_group_id', $groupId)
            ->where('status', true)
            ->orderBy('order')
            ->get();
    }
}

