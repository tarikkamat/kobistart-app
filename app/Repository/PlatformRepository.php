<?php

namespace App\Repository;

use App\Models\Platform;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlatformRepository extends BaseRepository
{
    public function __construct(Platform $platform)
    {
        parent::__construct($platform);
    }

    /**
     * Get all active platforms ordered by order field with their active plans.
     *
     * @return Collection<int, Platform>
     */
    public function getActivePlatforms(): Collection
    {
        return $this->model
            ->where('status', true)
            ->with([
                'plans' => function ($query) {
                    $query->where('status', true)
                        ->orderBy('order');
                }
            ])
            ->orderBy('order')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get platform by slug with relations.
     *
     * @param string $slug
     * @return Platform|null
     */
    public function getPlatformBySlug(string $slug): ?Platform
    {
        return $this->model
            ->where('slug', $slug)
            ->with([
                'plans' => function ($query) {
                    $query->where('status', true)
                        ->orderBy('order')
                        ->with([
                            'planPrices',
                            'planFeatures.feature' => function ($q) {
                                $q->orderBy('order');
                            }
                        ]);
                }
            ])
            ->first();
    }

    /**
     * Get paginated comments for a platform.
     *
     * @param int $platformId
     * @param int $perPage
     * @param int $page
     * @return LengthAwarePaginator
     */
    public function getPlatformCommentsPaginated(int $platformId, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        $platform = $this->model->findOrFail($platformId);

        return $platform->comments()
            ->where('status', true)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'comments_page', $page);
    }
}
