<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseService
{
    public function __construct(protected BaseRepository $repository)
    {
    }

    /**
     * Get all records.
     *
     * @return Collection<int, Model>
     */
    public function all(): Collection
    {
        return $this->repository->all();
    }

    /**
     * Find a record by ID.
     *
     * @param int|string $id
     * @return Model|null
     */
    public function find(int|string $id): ?Model
    {
        return $this->repository->find($id);
    }

    /**
     * Find a record by ID or throw an exception.
     *
     * @param int|string $id
     * @return Model
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int|string $id): Model
    {
        return $this->repository->findOrFail($id);
    }

    /**
     * Create a new record.
     *
     * @param array<string, mixed> $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->repository->create($data);
    }

    /**
     * Update a record by ID.
     *
     * @param int|string $id
     * @param array<string, mixed> $data
     * @return bool
     */
    public function update(int|string $id, array $data): bool
    {
        return $this->repository->update($id, $data);
    }

    /**
     * Delete a record by ID.
     *
     * @param int|string $id
     * @return bool
     */
    public function delete(int|string $id): bool
    {
        return $this->repository->delete($id);
    }

    /**
     * Paginate records.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage);
    }

    /**
     * Get records with where condition.
     *
     * @param string $column
     * @param string $operator
     * @param mixed $value
     * @return Collection<int, Model>
     */
    public function where(string $column, string $operator, mixed $value): Collection
    {
        return $this->repository->where($column, $operator, $value);
    }

    /**
     * Get the first record matching the conditions.
     *
     * @param string $column
     * @param string $operator
     * @param mixed $value
     * @return Model|null
     */
    public function firstWhere(string $column, string $operator, mixed $value): ?Model
    {
        return $this->repository->firstWhere($column, $operator, $value);
    }
}
