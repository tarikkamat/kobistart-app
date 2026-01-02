<?php

namespace App\Repository\Feature;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Feature\FeatureRepositoryInterface;
use App\Models\Feature;
use Illuminate\Database\Eloquent\Collection;

class FeatureRepository extends BaseRepository implements FeatureRepositoryInterface
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
     * @param  string  $category
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

