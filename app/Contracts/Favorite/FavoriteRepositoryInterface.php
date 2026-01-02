<?php

namespace App\Contracts\Favorite;

use App\Models\Favorite;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface FavoriteRepositoryInterface
{
    /**
     * Get all favorites for a user.
     *
     * @param  int  $userId
     * @return Collection<int, Favorite>
     */
    public function getUserFavorites(int $userId): Collection;

    /**
     * Check if a user has favorited a specific item.
     *
     * @param  int  $userId
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return Favorite|null
     */
    public function findFavorite(int $userId, string $favoritableType, int $favoritableId): ?Favorite;

    /**
     * Check if a user has favorited a specific item.
     *
     * @param  int  $userId
     * @param  string  $favoritableType
     * @param  int  $favoritableId
     * @return bool
     */
    public function isFavorited(int $userId, string $favoritableType, int $favoritableId): bool;

    /**
     * Get all records.
     *
     * @return Collection<int, Model>
     */
    public function all(): Collection;

    /**
     * Find a record by ID.
     *
     * @param  int|string  $id
     * @return Model|null
     */
    public function find(int|string $id): ?Model;

    /**
     * Find a record by ID or throw an exception.
     *
     * @param  int|string  $id
     * @return Model
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int|string $id): Model;

    /**
     * Create a new record.
     *
     * @param  array<string, mixed>  $data
     * @return Model
     */
    public function create(array $data): Model;

    /**
     * Update a record by ID.
     *
     * @param  int|string  $id
     * @param  array<string, mixed>  $data
     * @return bool
     */
    public function update(int|string $id, array $data): bool;

    /**
     * Delete a record by ID.
     *
     * @param  int|string  $id
     * @return bool
     */
    public function delete(int|string $id): bool;

    /**
     * Paginate records.
     *
     * @param  int  $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Get records with where condition.
     *
     * @param  string  $column
     * @param  string  $operator
     * @param  mixed  $value
     * @return Collection<int, Model>
     */
    public function where(string $column, string $operator, mixed $value): Collection;

    /**
     * Get the first record matching the conditions.
     *
     * @param  string  $column
     * @param  string  $operator
     * @param  mixed  $value
     * @return Model|null
     */
    public function firstWhere(string $column, string $operator, mixed $value): ?Model;
}

