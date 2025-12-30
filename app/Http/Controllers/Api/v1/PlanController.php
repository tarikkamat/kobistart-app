<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlanRequest;
use App\Services\PlanService;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    public function __construct(private PlanService $planService)
    {
    }

    /**
     * Display a listing of the plans.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $plans = $this->planService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Plans fetched successfully',
            'data' => [
                'plans' => $plans,
            ],
        ], 200);
    }

    /**
     * Store a newly created plan.
     *
     * @param CreatePlanRequest $request
     * @return JsonResponse
     */
    public function store(CreatePlanRequest $request): JsonResponse
    {
        $plan = $this->planService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Plan created successfully',
            'data' => [
                'plan' => $plan,
            ],
        ], 201);
    }
}
