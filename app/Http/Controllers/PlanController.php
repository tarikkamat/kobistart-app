<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\PlanService;
use App\Services\FilterService;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function __construct(
        private PlanService $planService,
        private FilterService $filterService
    ) {
    }

    /**
     * Display a listing of all plans with filtering support.
     *
     * @return Response
     */
    public function index(): Response
    {
        // Get filter item IDs from query parameters
        $filterItemIds = request()->get('filters', []);
        if (is_string($filterItemIds)) {
            $filterItemIds = explode(',', $filterItemIds);
        }
        $filterItemIds = array_filter(array_map('intval', (array) $filterItemIds));

        // Get filter groups with items
        $filterGroups = $this->filterService->getFilterGroupsWithItems();

        // Get plans with filters if any
        $plans = collect();
        if (!empty($filterItemIds)) {
            // Get filter items
            $filterItems = $this->filterService->getFilterItemsByIds($filterItemIds);

            // Extract feature IDs and keys
            $filters = $this->filterService->extractFeatureFilters($filterItems);

            // Get filtered plans
            $plans = $this->planService->getPlansWithFilters(
                $filters['feature_ids'],
                $filters['feature_keys']
            );
        } else {
            // Get all active plans
            $plans = $this->planService->getActivePlans();
        }

        // Transform plans to include platform and features
        $plansArray = $plans->map(function ($plan) {
            $planArray = $plan->toArray();

            // Include platform relation
            if ($plan->relationLoaded('platform') && $plan->platform) {
                $planArray['platform'] = $plan->platform->toArray();
            }

            // Include plan prices
            if ($plan->relationLoaded('planPrices')) {
                $planArray['plan_prices'] = $plan->planPrices->map(fn($p) => $p->toArray())->toArray();
            }

            // Transform planFeatures to features array
            if ($plan->relationLoaded('planFeatures')) {
                $planArray['features'] = $plan->planFeatures->map(function ($planFeature) {
                    $pfArray = $planFeature->toArray();
                    if ($planFeature->relationLoaded('feature') && $planFeature->feature) {
                        $pfArray['feature'] = $planFeature->feature->toArray();
                    }
                    return $pfArray;
                })->toArray();
            }

            return $planArray;
        })->toArray();

        return Inertia::render('plans/index', [
            'plans' => $plansArray,
            'filterGroups' => $filterGroups->map(function ($group) {
                $groupArray = $group->toArray();
                if ($group->relationLoaded('filterItems')) {
                    $groupArray['filter_items'] = $group->filterItems->map(fn($item) => $item->toArray())->toArray();
                }
                return $groupArray;
            })->toArray(),
        ]);
    }
}

