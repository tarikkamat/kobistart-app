<?php

namespace App\Repository;

use App\Models\Platform;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

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
                        ->orderBy('order');
                },
                'comments.user'
            ])
            ->first();
    }
}
