<?php

namespace App\Contracts\Filter;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface FilterServiceInterface
{
    /**
     * Get all active filter groups with their items.
     *
     * @return Collection<int, \App\Models\FilterGroup>
     */
    public function getFilterGroupsWithItems(): Collection;

    /**
     * Get filter items by their IDs.
     *
     * @param  array<int>  $filterItemIds
     * @return Collection<int, \App\Models\FilterItem>
     */
    public function getFilterItemsByIds(array $filterItemIds): Collection;

    /**
     * Extract feature IDs and feature keys from filter items.
     *
     * @param  Collection<int, \App\Models\FilterItem>  $filterItems
     * @return array{feature_ids: array<int>, feature_keys: array<string>}
     */
    public function extractFeatureFilters(Collection $filterItems): array;

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

