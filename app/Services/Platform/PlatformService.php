<?php

namespace App\Services\Platform;

use App\Contracts\Base\BaseService;
use App\Contracts\Platform\PlatformServiceInterface;
use App\Repository\Platform\PlatformRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class PlatformService extends BaseService implements PlatformServiceInterface
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
        return Cache::remember('platforms.active', 3600, function () {
            /** @var PlatformRepository $repository */
            $repository = $this->repository;
            return $repository->getActivePlatforms();
        });
    }

    /**
     * Get platform by slug.
     *
     * @param  string  $slug
     * @return \App\Models\Platform|null
     */
    public function getPlatformBySlug(string $slug): ?\App\Models\Platform
    {
        return Cache::remember("platform.slug.{$slug}", 3600, function () use ($slug) {
            /** @var PlatformRepository $repository */
            $repository = $this->repository;
            return $repository->getPlatformBySlug($slug);
        });
    }

    /**
     * Get all active platforms with full details for wizard analysis.
     * Includes platforms, plans, plan prices, and plan features.
     *
     * @return Collection<int, \App\Models\Platform>
     */
    public function getAllPlatformsWithDetails(): Collection
    {
        return Cache::remember('platforms.with-details', 7200, function () {
            /** @var PlatformRepository $repository */
            $repository = $this->repository;
            return $repository->getAllPlatformsWithDetails();
        });
    }

    /**
     * Get paginated comments for a platform.
     *
     * @param  int  $platformId
     * @param  int  $perPage
     * @param  int  $page
     * @return LengthAwarePaginator
     */
    public function getPlatformCommentsPaginated(
        int $platformId,
        int $perPage = 10,
        int $page = 1
    ): LengthAwarePaginator {
        /** @var PlatformRepository $repository */
        $repository = $this->repository;
        return $repository->getPlatformCommentsPaginated($platformId, $perPage, $page);
    }
}

