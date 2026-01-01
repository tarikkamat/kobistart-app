<?php

namespace App\Services;

use App\Repository\ComparisonRepository;
use App\Contracts\BaseService;
use Illuminate\Database\Eloquent\Collection;

class ComparisonService extends BaseService
{
    public function __construct(ComparisonRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Save a comparison.
     *
     * @param array<string, mixed> $data
     * @return \App\Models\Comparison
     */
    public function saveComparison(array $data): \App\Models\Comparison
    {
        /** @var ComparisonRepository $repository */
        $repository = $this->repository;

        // Check if comparison already exists
        if (isset($data['user_id']) && isset($data['plan1_id']) && isset($data['plan2_id'])) {
            $exists = $repository->comparisonExists(
                $data['user_id'],
                $data['plan1_id'],
                $data['plan2_id']
            );

            if ($exists) {
                // Update existing comparison
                $comparison = $repository->findExistingComparison(
                    $data['user_id'],
                    $data['plan1_id'],
                    $data['plan2_id']
                );

                if ($comparison) {
                    $comparison->update($data);
                    return $comparison;
                }
            }
        }

        return $repository->createComparison($data);
    }

    /**
     * Get user comparisons.
     *
     * @param int $userId
     * @return Collection<int, \App\Models\Comparison>
     */
    public function getUserComparisons(int $userId): Collection
    {
        /** @var ComparisonRepository $repository */
        $repository = $this->repository;
        return $repository->getUserComparisons($userId);
    }

    /**
     * Get comparison by ID.
     *
     * @param int $id
     * @return \App\Models\Comparison|null
     */
    public function getComparisonById(int $id): ?\App\Models\Comparison
    {
        /** @var ComparisonRepository $repository */
        $repository = $this->repository;
        return $repository->getComparisonById($id);
    }

    /**
     * Get comparison by user and plans.
     *
     * @param int $userId
     * @param int $plan1Id
     * @param int $plan2Id
     * @return \App\Models\Comparison|null
     */
    public function getComparisonByPlans(int $userId, int $plan1Id, int $plan2Id): ?\App\Models\Comparison
    {
        /** @var ComparisonRepository $repository */
        $repository = $this->repository;
        return $repository->findExistingComparison($userId, $plan1Id, $plan2Id);
    }
}

