<?php

namespace App\Services;

use App\Repository\FilterGroupRepository;
use App\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

class FilterGroupService extends BaseService
{
    public function __construct(FilterGroupRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all active filter groups ordered by order field.
     *
     * @return Collection<int, \App\Models\FilterGroup>
     */
    public function getActiveFilterGroups(): Collection
    {
        /** @var FilterGroupRepository $repository */
        $repository = $this->repository;
        return $repository->getActiveFilterGroups();
    }

    /**
     * Get filter groups with their items.
     *
     * @return Collection<int, \App\Models\FilterGroup>
     */
    public function getFilterGroupsWithItems(): Collection
    {
        /** @var FilterGroupRepository $repository */
        $repository = $this->repository;
        return $repository->getFilterGroupsWithItems();
    }
}

