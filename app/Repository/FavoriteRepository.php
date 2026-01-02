<?php

namespace App\Repository;

use App\Contracts\BaseRepository;
use App\Models\Favorite;
use Illuminate\Database\Eloquent\Collection;

class FavoriteRepository extends BaseRepository
{
    public function __construct(Favorite $favorite)
    {
        parent::__construct($favorite);
    }

    /**
     * Get all favorites for a user.
     *
     * @param  int  $userId
     * @return Collection<int, Favorite>
     */
    public function getUserFavorites(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->with('favoritable')
            ->get();
    }

    /**
     * Check if a user has favorited a specific item.
     *
     * @param  int  $userId
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return Favorite|null
     */
    public function findFavorite(int $userId, string $favoritableType, int $favoritableId): ?Favorite
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('favoritable_type', $favoritableType)
            ->where('favoritable_id', $favoritableId)
            ->first();
    }

    /**
     * Check if a user has favorited a specific item.
     *
     * @param  int  $userId
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return bool
     */
    public function isFavorited(int $userId, string $favoritableType, int $favoritableId): bool
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('favoritable_type', $favoritableType)
            ->where('favoritable_id', $favoritableId)
            ->exists();
    }
}

