<?php

namespace App\Http\Controllers;

use App\Services\FavoriteService;
use App\Services\PlanService;
use App\Services\PlatformService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PlatformController extends Controller
{
    public function __construct(
        private PlatformService $platformService,
        private PlanService $planService,
        private FavoriteService $favoriteService
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('platforms/index', [
            'platforms' => $this->platformService->getActivePlatforms(),
        ]);
    }

    public function show(string $slug): Response
    {
        $platform = $this->platformService->getPlatformBySlug($slug);

        if (!$platform) {
            abort(404);
        }

        $commentsPage = (int) request()->get('comments_page', 1);
        $comments = $this->platformService->getPlatformCommentsPaginated($platform->id, 5, $commentsPage);

        // Check if platform is favorited by authenticated user
        $isFavorited = false;
        if (Auth::check()) {
            $isFavorited = $this->favoriteService->isFavorited('App\\Models\\Platform', $platform->id);
        }

        // Add is_favorited to platform object
        $platform->is_favorited = $isFavorited;

        // Transform plans to include features from planFeatures
        $plans = $platform->plans->map(function ($plan) {
            $planArray = $plan->toArray();
            // Map planFeatures to features array with feature relation
            $planArray['features'] = $plan->planFeatures->map(function ($planFeature) {
                $pfArray = $planFeature->toArray();
                // Include feature relation if loaded
                if ($planFeature->relationLoaded('feature') && $planFeature->feature) {
                    $pfArray['feature'] = $planFeature->feature->toArray();
                }
                return $pfArray;
            })->toArray();
            return $planArray;
        });

        return Inertia::render('platforms/show', [
            'platform' => $platform,
            'plans' => $plans,
            'comments' => $comments,
        ]);
    }

    public function planShow(string $platformSlug, string $planSlug): Response
    {
        $platform = $this->platformService->getPlatformBySlug($platformSlug);

        if (!$platform) {
            abort(404);
        }

        $plan = $this->planService->getPlanBySlug($planSlug, $platform->id);

        if (!$plan) {
            abort(404);
        }

        // Transform plan to include features from planFeatures
        $planArray = $plan->toArray();
        $planArray['features'] = $plan->planFeatures->map(function ($planFeature) {
            $pfArray = $planFeature->toArray();
            if ($planFeature->relationLoaded('feature') && $planFeature->feature) {
                $pfArray['feature'] = $planFeature->feature->toArray();
            }
            return $pfArray;
        })->toArray();

        // Check if plan is favorited by authenticated user
        $isFavorited = false;
        if (Auth::check()) {
            $isFavorited = $this->favoriteService->isFavorited('App\\Models\\Plan', $plan->id);
        }

        $planArray['is_favorited'] = $isFavorited;

        return Inertia::render('platforms/plans/show', [
            'platform' => $platform,
            'plan' => $planArray,
        ]);
    }

    public function compare(string $comparison): Response
    {
        // Parse comparison string: "shopify-grow-vs-ticimax-advanced"
        $parts = explode('-vs-', $comparison);

        if (count($parts) !== 2) {
            abort(404);
        }

        // Parse first plan identifier: "shopify-grow"
        $plan1Parts = $this->parsePlanIdentifier($parts[0]);
        if (!$plan1Parts) {
            abort(404);
        }

        // Parse second plan identifier: "ticimax-advanced"
        $plan2Parts = $this->parsePlanIdentifier($parts[1]);
        if (!$plan2Parts) {
            abort(404);
        }

        // Find first platform and plan
        $platform1 = $this->platformService->getPlatformBySlug($plan1Parts['platform_slug']);
        if (!$platform1) {
            abort(404);
        }

        $plan1 = $this->planService->getPlanBySlug($plan1Parts['plan_slug'], $platform1->id);
        if (!$plan1) {
            abort(404);
        }

        // Find second platform and plan
        $platform2 = $this->platformService->getPlatformBySlug($plan2Parts['platform_slug']);
        if (!$platform2) {
            abort(404);
        }

        $plan2 = $this->planService->getPlanBySlug($plan2Parts['plan_slug'], $platform2->id);
        if (!$plan2) {
            abort(404);
        }

        // Transform plans to include features
        $plan1Array = $plan1->toArray();
        $plan1Array['features'] = $plan1->planFeatures->map(function ($planFeature) {
            $pfArray = $planFeature->toArray();
            if ($planFeature->relationLoaded('feature') && $planFeature->feature) {
                $pfArray['feature'] = $planFeature->feature->toArray();
            }
            return $pfArray;
        })->toArray();

        $plan2Array = $plan2->toArray();
        $plan2Array['features'] = $plan2->planFeatures->map(function ($planFeature) {
            $pfArray = $planFeature->toArray();
            if ($planFeature->relationLoaded('feature') && $planFeature->feature) {
                $pfArray['feature'] = $planFeature->feature->toArray();
            }
            return $pfArray;
        })->toArray();

        return Inertia::render('platforms/compare', [
            'plan1' => [
                'plan' => $plan1Array,
                'platform' => $platform1,
            ],
            'plan2' => [
                'plan' => $plan2Array,
                'platform' => $platform2,
            ],
        ]);
    }

    /**
     * Parse plan identifier from URL string.
     * Handles formats like "shopify-grow" or "advance-plus"
     * Returns ['platform_slug' => 'shopify', 'plan_slug' => 'grow'] or null
     */
    private function parsePlanIdentifier(string $identifier): ?array
    {
        // Get all active platform slugs from database
        $platformSlugs = $this->platformService->getActivePlatforms()
            ->pluck('slug')
            ->toArray();

        // Sort by length (longest first) to handle cases where one platform slug might be a prefix of another
        usort($platformSlugs, fn($a, $b) => strlen($b) <=> strlen($a));

        foreach ($platformSlugs as $platformSlug) {
            if (str_starts_with($identifier, $platformSlug.'-')) {
                $planSlug = substr($identifier, strlen($platformSlug) + 1);
                if (!empty($planSlug)) {
                    return [
                        'platform_slug' => $platformSlug,
                        'plan_slug' => $planSlug,
                    ];
                }
            }
        }

        return null;
    }
}
