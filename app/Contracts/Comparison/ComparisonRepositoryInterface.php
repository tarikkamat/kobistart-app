<?php

namespace App\Contracts\Comparison;

use App\Models\Comparison;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface ComparisonRepositoryInterface
{
    /**
     * Create a new comparison.
     *
     * @param  array<string, mixed>  $data
     * @return Comparison
     */
    public function createComparison(array $data): Comparison;

    /**
     * Get comparisons for a user.
     *
     * @param  int  $userId
     * @return Collection<int, Comparison>
     */
    public function getUserComparisons(int $userId): Collection;

    /**
     * Get comparison by ID with relations.
     *
     * @param  int  $id
     * @return Comparison|null
     */
    public function getComparisonById(int $id): ?Comparison;

    /**
     * Check if comparison exists for user and plans.
     *
     * @param  int  $userId
     * @param  int  $plan1Id
     * @param  int  $plan2Id
     * @return bool
     */
    public function comparisonExists(int $userId, int $plan1Id, int $plan2Id): bool;

    /**
     * Find existing comparison for user and plans.
     *
     * @param  int  $userId
     * @param  int  $plan1Id
     * @param  int  $plan2Id
     * @return Comparison|null
     */
    public function findExistingComparison(int $userId, int $plan1Id, int $plan2Id): ?Comparison;

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

