<?php

namespace App\Repository;

use App\Models\Feature;
use App\Contracts\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class FeatureRepository extends BaseRepository
{
    public function __construct(Feature $feature)
    {
        parent::__construct($feature);
    }

    /**
     * Get all features ordered by order field.
     *
     * @return Collection<int, Feature>
     */
    public function getAllOrdered(): Collection
    {
        return $this->model
            ->orderBy('order')
            ->get();
    }

    /**
     * Get features by category ordered by order field.
     *
     * @param string $category
     * @return Collection<int, Feature>
     */
    public function getByCategory(string $category): Collection
    {
        return $this->model
            ->where('category', $category)
            ->orderBy('order')
            ->get();
    }
}

