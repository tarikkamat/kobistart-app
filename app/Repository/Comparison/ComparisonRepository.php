<?php

namespace App\Repository\Comparison;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Comparison\ComparisonRepositoryInterface;
use App\Models\Comparison;
use Illuminate\Database\Eloquent\Collection;

class ComparisonRepository extends BaseRepository implements ComparisonRepositoryInterface
{
    public function __construct(Comparison $comparison)
    {
        parent::__construct($comparison);
    }

    /**
     * Create a new comparison.
     *
     * @param  array<string, mixed>  $data
     * @return Comparison
     */
    public function createComparison(array $data): Comparison
    {
        return $this->model->create($data);
    }

    /**
     * Get comparisons for a user.
     *
     * @param  int  $userId
     * @return Collection<int, Comparison>
     */
    public function getUserComparisons(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->with(['plan1.platform', 'plan2.platform'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get comparison by ID with relations.
     *
     * @param  int  $id
     * @return Comparison|null
     */
    public function getComparisonById(int $id): ?Comparison
    {
        return $this->model
            ->with(['plan1.platform', 'plan2.platform', 'user'])
            ->find($id);
    }

    /**
     * Check if comparison exists for user and plans.
     *
     * @param  int  $userId
     * @param  int  $plan1Id
     * @param  int  $plan2Id
     * @return bool
     */
    public function comparisonExists(int $userId, int $plan1Id, int $plan2Id): bool
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where(function ($query) use ($plan1Id, $plan2Id) {
                $query->where(function ($q) use ($plan1Id, $plan2Id) {
                    $q->where('plan1_id', $plan1Id)
                        ->where('plan2_id', $plan2Id);
                })->orWhere(function ($q) use ($plan1Id, $plan2Id) {
                    $q->where('plan1_id', $plan2Id)
                        ->where('plan2_id', $plan1Id);
                });
            })
            ->exists();
    }

    /**
     * Find existing comparison for user and plans.
     *
     * @param  int  $userId
     * @param  int  $plan1Id
     * @param  int  $plan2Id
     * @return Comparison|null
     */
    public function findExistingComparison(int $userId, int $plan1Id, int $plan2Id): ?Comparison
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where(function ($query) use ($plan1Id, $plan2Id) {
                $query->where(function ($q) use ($plan1Id, $plan2Id) {
                    $q->where('plan1_id', $plan1Id)
                        ->where('plan2_id', $plan2Id);
                })->orWhere(function ($q) use ($plan1Id, $plan2Id) {
                    $q->where('plan1_id', $plan2Id)
                        ->where('plan2_id', $plan1Id);
                });
            })
            ->first();
    }
}

