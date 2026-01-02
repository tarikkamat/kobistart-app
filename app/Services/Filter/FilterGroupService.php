<?php

namespace App\Services\Filter;

use App\Contracts\Base\BaseService;
use App\Contracts\Filter\FilterGroupServiceInterface;
use App\Repository\Filter\FilterGroupRepository;
use Illuminate\Database\Eloquent\Collection;

class FilterGroupService extends BaseService implements FilterGroupServiceInterface
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

