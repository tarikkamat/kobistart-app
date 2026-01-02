<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Repository\FilterItemRepository;
use Illuminate\Database\Eloquent\Collection;

class FilterItemService extends BaseService
{
    public function __construct(FilterItemRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all active filter items ordered by order field.
     *
     * @return Collection<int, \App\Models\FilterItem>
     */
    public function getActiveFilterItems(): Collection
    {
        /** @var FilterItemRepository $repository */
        $repository = $this->repository;
        return $repository->getActiveFilterItems();
    }

    /**
     * Get filter items by group ID.
     *
     * @param  int  $groupId
     * @return Collection<int, \App\Models\FilterItem>
     */
    public function getItemsByGroup(int $groupId): Collection
    {
        /** @var FilterItemRepository $repository */
        $repository = $this->repository;
        return $repository->getItemsByGroup($groupId);
    }
}

