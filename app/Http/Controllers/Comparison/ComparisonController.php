<?php

namespace App\Http\Controllers\Comparison;

use App\Http\Controllers\Controller;
use App\Services\Comparison\ComparisonService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ComparisonController extends Controller
{
    public function __construct(
        private ComparisonService $comparisonService
    ) {
    }

    /**
     * Store a newly created comparison.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'plan1_id' => 'required|exists:plans,id',
            'plan2_id' => 'required|exists:plans,id',
            'plan1_data' => 'required|array',
            'plan2_data' => 'required|array',
            'comparison_data' => 'required|array',
            'notes' => 'nullable|string',
        ]);

        $comparison = $this->comparisonService->saveComparison([
            'user_id' => Auth::id(),
            'plan1_id' => $request->plan1_id,
            'plan2_id' => $request->plan2_id,
            'plan1_data' => $request->plan1_data,
            'plan2_data' => $request->plan2_data,
            'comparison_data' => $request->comparison_data,
            'notes' => $request->notes,
        ]);

        return back()->with('success', 'Karşılaştırma başarıyla kaydedildi.');
    }

    /**
     * Display a listing of user's comparisons.
     *
     * @return Response
     */
    public function index(): Response
    {
        $comparisons = $this->comparisonService->getUserComparisons(Auth::id());

        return Inertia::render('comparisons/index', [
            'comparisons' => $comparisons->map(function ($comparison) {
                return [
                    'id' => $comparison->id,
                    'plan1' => [
                        'plan' => $comparison->plan1->toArray(),
                        'platform' => $comparison->plan1->platform->toArray(),
                    ],
                    'plan2' => [
                        'plan' => $comparison->plan2->toArray(),
                        'platform' => $comparison->plan2->platform->toArray(),
                    ],
                    'notes' => $comparison->notes,
                    'created_at' => $comparison->created_at,
                    'updated_at' => $comparison->updated_at,
                ];
            })->toArray(),
        ]);
    }

    /**
     * Display the specified comparison.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id): Response
    {
        $comparison = $this->comparisonService->getComparisonById($id);

        if (!$comparison || $comparison->user_id !== Auth::id()) {
            abort(404);
        }

        return Inertia::render('platforms/compare', [
            'plan1' => [
                'plan' => $comparison->plan1_data['plan'] ?? $comparison->plan1->toArray(),
                'platform' => $comparison->plan1_data['platform'] ?? $comparison->plan1->platform->toArray(),
            ],
            'plan2' => [
                'plan' => $comparison->plan2_data['plan'] ?? $comparison->plan2->toArray(),
                'platform' => $comparison->plan2_data['platform'] ?? $comparison->plan2->platform->toArray(),
            ],
            'savedComparison' => [
                'id' => $comparison->id,
                'notes' => $comparison->notes,
                'comparison_data' => $comparison->comparison_data,
            ],
        ]);
    }

    /**
     * Check if comparison exists for given plans.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request)
    {
        $request->validate([
            'plan1_id' => 'required|exists:plans,id',
            'plan2_id' => 'required|exists:plans,id',
        ]);

        $comparison = $this->comparisonService->getComparisonByPlans(
            Auth::id(),
            $request->plan1_id,
            $request->plan2_id
        );

        return response()->json([
            'exists' => $comparison !== null,
            'id' => $comparison?->id,
        ]);
    }

    /**
     * Remove the specified comparison.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $comparison = $this->comparisonService->getComparisonById($id);

        if (!$comparison || $comparison->user_id !== Auth::id()) {
            abort(404);
        }

        $comparison->delete();

        return back()->with('success', 'Karşılaştırma başarıyla silindi.');
    }
}

