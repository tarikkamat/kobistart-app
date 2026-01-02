<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Repository\FavoriteRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class FavoriteService extends BaseService
{
    public function __construct(FavoriteRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Add a favorite for the authenticated user.
     *
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return \App\Models\Favorite
     */
    public function addFavorite(string $favoritableType, int $favoritableId): \App\Models\Favorite
    {
        /** @var FavoriteRepository $repository */
        $repository = $this->repository;

        // Check if already favorited
        $existing = $repository->findFavorite(Auth::id(), $favoritableType, $favoritableId);
        if ($existing) {
            return $existing;
        }

        return $repository->create([
            'user_id' => Auth::id(),
            'favoritable_type' => $favoritableType,
            'favoritable_id' => $favoritableId,
        ]);
    }

    /**
     * Remove a favorite for the authenticated user.
     *
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return bool
     */
    public function removeFavorite(string $favoritableType, int $favoritableId): bool
    {
        /** @var FavoriteRepository $repository */
        $repository = $this->repository;

        $favorite = $repository->findFavorite(Auth::id(), $favoritableType, $favoritableId);
        if (!$favorite) {
            return false;
        }

        return $repository->delete($favorite->id);
    }

    /**
     * Get all favorites for the authenticated user.
     *
     * @return Collection<int, \App\Models\Favorite>
     */
    public function getUserFavorites(): Collection
    {
        /** @var FavoriteRepository $repository */
        $repository = $this->repository;
        return $repository->getUserFavorites(Auth::id());
    }

    /**
     * Check if the authenticated user has favorited a specific item.
     *
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return bool
     */
    public function isFavorited(string $favoritableType, int $favoritableId): bool
    {
        /** @var FavoriteRepository $repository */
        $repository = $this->repository;
        return $repository->isFavorited(Auth::id(), $favoritableType, $favoritableId);
    }
}

