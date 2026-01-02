<?php

namespace App\Services\Feature;

use App\Contracts\Base\BaseService;
use App\Contracts\Feature\FeatureServiceInterface;
use App\Repository\Feature\FeatureRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class FeatureService extends BaseService implements FeatureServiceInterface
{
    public function __construct(FeatureRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all features ordered by order field.
     *
     * @return Collection<int, \App\Models\Feature>
     */
    public function getAllOrdered(): Collection
    {
        return Cache::remember('features.all-ordered', 3600, function () {
            /** @var FeatureRepository $repository */
            $repository = $this->repository;
            return $repository->getAllOrdered();
        });
    }

    /**
     * Get features by category ordered by order field.
     *
     * @param  string  $category
     * @return Collection<int, \App\Models\Feature>
     */
    public function getByCategory(string $category): Collection
    {
        return Cache::remember("features.category.{$category}", 3600, function () use ($category) {
            /** @var FeatureRepository $repository */
            $repository = $this->repository;
            return $repository->getByCategory($category);
        });
    }
}

