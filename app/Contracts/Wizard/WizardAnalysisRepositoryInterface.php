<?php

namespace App\Contracts\Wizard;

use App\Models\WizardAnalysis;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface WizardAnalysisRepositoryInterface
{
    /**
     * Create analysis for a user.
     *
     * @param  array<string, mixed>  $data
     * @return WizardAnalysis
     */
    public function createForUser(array $data): WizardAnalysis;

    /**
     * Create analysis for a session.
     *
     * @param  array<string, mixed>  $data
     * @return WizardAnalysis
     */
    public function createForSession(array $data): WizardAnalysis;

    /**
     * Get analyses for a user.
     *
     * @param  int  $userId
     * @return Collection<int, WizardAnalysis>
     */
    public function getUserAnalyses(int $userId): Collection;

    /**
     * Get analyses for a session.
     *
     * @param  string  $sessionId
     * @return Collection<int, WizardAnalysis>
     */
    public function getSessionAnalyses(string $sessionId): Collection;

    /**
     * Migrate session analyses to user.
     *
     * @param  string  $sessionId
     * @param  int  $userId
     * @return int Number of migrated analyses
     */
    public function migrateSessionToUser(string $sessionId, int $userId): int;

    /**
     * Get analysis by ID with relations.
     *
     * @param  int  $id
     * @return WizardAnalysis|null
     */
    public function getAnalysisById(int $id): ?WizardAnalysis;

    /**
     * Get latest analysis for session.
     *
     * @param  string  $sessionId
     * @return WizardAnalysis|null
     */
    public function getLatestBySessionId(string $sessionId): ?WizardAnalysis;

    /**
     * Get latest analysis for user.
     *
     * @param  int  $userId
     * @return WizardAnalysis|null
     */
    public function getLatestByUserId(int $userId): ?WizardAnalysis;

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

