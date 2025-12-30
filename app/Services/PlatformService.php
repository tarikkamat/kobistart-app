<?php

namespace App\Services;

use App\Repository\PlatformRepository;
use App\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

class PlatformService extends BaseService
{
    public function __construct(PlatformRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all active platforms ordered by order field.
     *
     * @return Collection<int, \App\Models\Platform>
     */
    public function getActivePlatforms(): Collection
    {
        /** @var PlatformRepository $repository */
        $repository = $this->repository;
        return $repository->getActivePlatforms();
    }

    /**
     * Get platform by slug.
     *
     * @param string $slug
     * @return \App\Models\Platform|null
     */
    public function getPlatformBySlug(string $slug): ?\App\Models\Platform
    {
        /** @var PlatformRepository $repository */
        $repository = $this->repository;
        return $repository->getPlatformBySlug($slug);
    }
}
