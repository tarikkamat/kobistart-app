<?php

namespace App\Contracts\Wizard;

use App\Models\WizardAnalysis;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface WizardAnalysisServiceInterface
{
    /**
     * Save analysis for user or session.
     *
     * @param  array<string, mixed>  $wizardData
     * @param  array<string, mixed>  $analysisResult
     * @return WizardAnalysis
     */
    public function saveAnalysis(array $wizardData, array $analysisResult): WizardAnalysis;

    /**
     * Get analyses for current user.
     *
     * @return Collection<int, WizardAnalysis>
     */
    public function getUserAnalyses(): Collection;

    /**
     * Migrate session analyses to user.
     *
     * @param  int  $userId
     * @return int Number of migrated analyses
     */
    public function migrateSessionAnalyses(int $userId): int;

    /**
     * Get analysis by ID.
     *
     * @param  int  $id
     * @return WizardAnalysis|null
     */
    public function getAnalysis(int $id): ?WizardAnalysis;

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

