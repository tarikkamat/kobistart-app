<?php

namespace App\Repository;

use App\Models\Plan;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanRepository extends BaseRepository
{
    public function __construct(Plan $plan)
    {
        parent::__construct($plan);
    }

    /**
     * Get all active plans ordered by order field.
     *
     * @return Collection<int, Plan>
     */
    public function getActivePlans(): Collection
    {
        return $this->model
            ->where('status', true)
            ->orderBy('order')
            ->get();
    }
}
