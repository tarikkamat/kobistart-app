<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlanRequest;
use App\Http\Requests\CreatePlanFeatureRequest;
use App\Http\Requests\CreatePlanPriceRequest;
use App\Http\Requests\UpdatePlanRequest;
use App\Http\Requests\UpdatePlanFeatureRequest;
use App\Http\Requests\UpdatePlanPriceRequest;
use App\Services\PlanService;
use App\Services\PlanFeatureService;
use App\Services\PlanPriceService;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    public function __construct(
        private PlanService $planService,
        private PlanFeatureService $planFeatureService,
        private PlanPriceService $planPriceService
    ) {
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
     * Display the specified plan.
     *
     * @param string $planId
     * @return JsonResponse
     */
    public function show(string $planId): JsonResponse
    {
        $plan = $this->planService->findOrFail($planId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan fetched successfully',
            'data' => [
                'plan' => $plan,
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

    /**
     * Update the specified plan.
     *
     * @param UpdatePlanRequest $request
     * @param string $planId
     * @return JsonResponse
     */
    public function update(UpdatePlanRequest $request, string $planId): JsonResponse
    {
        $this->planService->update($planId, $request->validated());
        $plan = $this->planService->findOrFail($planId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan updated successfully',
            'data' => [
                'plan' => $plan,
            ],
        ], 200);
    }

    /**
     * Delete a plan.
     *
     * @param string $planId
     * @return JsonResponse
     */
    public function destroy(string $planId): JsonResponse
    {
        $this->planService->delete($planId);
        return response()->json(null, 204);
    }

    // ========== Plan Features (Nested Resource) ==========

    /**
     * Display a listing of the plan features for a specific plan.
     *
     * @param string $planId
     * @return JsonResponse
     */
    public function indexPlanFeatures(string $planId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planFeatures = $this->planFeatureService->getByPlanId($planId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan features fetched successfully',
            'data' => [
                'plan_features' => $planFeatures,
            ],
        ], 200);
    }

    /**
     * Display the specified plan feature.
     *
     * @param string $planId
     * @param string $planFeatureId
     * @return JsonResponse
     */
    public function showPlanFeature(string $planId, string $planFeatureId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planFeature = $this->planFeatureService->findOrFail($planFeatureId);

        // Verify plan feature belongs to plan
        if ($planFeature->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan feature does not belong to this plan',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Plan feature fetched successfully',
            'data' => [
                'plan_feature' => $planFeature,
            ],
        ], 200);
    }

    /**
     * Store a newly created plan feature for a specific plan.
     *
     * @param CreatePlanFeatureRequest $request
     * @param string $planId
     * @return JsonResponse
     */
    public function storePlanFeature(CreatePlanFeatureRequest $request, string $planId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $data = $request->validated();
        $data['plan_id'] = $planId;

        $planFeature = $this->planFeatureService->create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan feature created successfully',
            'data' => [
                'plan_feature' => $planFeature,
            ],
        ], 201);
    }

    /**
     * Update the specified plan feature.
     *
     * @param UpdatePlanFeatureRequest $request
     * @param string $planId
     * @param string $planFeatureId
     * @return JsonResponse
     */
    public function updatePlanFeature(UpdatePlanFeatureRequest $request, string $planId, string $planFeatureId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planFeature = $this->planFeatureService->findOrFail($planFeatureId);

        // Verify plan feature belongs to plan
        if ($planFeature->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan feature does not belong to this plan',
            ], 404);
        }

        $this->planFeatureService->update($planFeatureId, $request->validated());
        $planFeature = $this->planFeatureService->findOrFail($planFeatureId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan feature updated successfully',
            'data' => [
                'plan_feature' => $planFeature,
            ],
        ], 200);
    }

    /**
     * Delete a plan feature.
     *
     * @param string $planId
     * @param string $planFeatureId
     * @return JsonResponse
     */
    public function destroyPlanFeature(string $planId, string $planFeatureId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planFeature = $this->planFeatureService->findOrFail($planFeatureId);

        // Verify plan feature belongs to plan
        if ($planFeature->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan feature does not belong to this plan',
            ], 404);
        }

        $this->planFeatureService->delete($planFeatureId);
        return response()->json(null, 204);
    }

    // ========== Plan Prices (Nested Resource) ==========

    /**
     * Display a listing of the plan prices for a specific plan.
     *
     * @param string $planId
     * @return JsonResponse
     */
    public function indexPlanPrices(string $planId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planPrices = $this->planPriceService->getByPlanId($planId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan prices fetched successfully',
            'data' => [
                'plan_prices' => $planPrices,
            ],
        ], 200);
    }

    /**
     * Display the specified plan price.
     *
     * @param string $planId
     * @param string $planPriceId
     * @return JsonResponse
     */
    public function showPlanPrice(string $planId, string $planPriceId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planPrice = $this->planPriceService->findOrFail($planPriceId);

        // Verify plan price belongs to plan
        if ($planPrice->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan price does not belong to this plan',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Plan price fetched successfully',
            'data' => [
                'plan_price' => $planPrice,
            ],
        ], 200);
    }

    /**
     * Store a newly created plan price for a specific plan.
     *
     * @param CreatePlanPriceRequest $request
     * @param string $planId
     * @return JsonResponse
     */
    public function storePlanPrice(CreatePlanPriceRequest $request, string $planId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $data = $request->validated();
        $data['plan_id'] = $planId;

        $planPrice = $this->planPriceService->create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan price created successfully',
            'data' => [
                'plan_price' => $planPrice,
            ],
        ], 201);
    }

    /**
     * Update the specified plan price.
     *
     * @param UpdatePlanPriceRequest $request
     * @param string $planId
     * @param string $planPriceId
     * @return JsonResponse
     */
    public function updatePlanPrice(UpdatePlanPriceRequest $request, string $planId, string $planPriceId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planPrice = $this->planPriceService->findOrFail($planPriceId);

        // Verify plan price belongs to plan
        if ($planPrice->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan price does not belong to this plan',
            ], 404);
        }

        $this->planPriceService->update($planPriceId, $request->validated());
        $planPrice = $this->planPriceService->findOrFail($planPriceId);

        return response()->json([
            'status' => 'success',
            'message' => 'Plan price updated successfully',
            'data' => [
                'plan_price' => $planPrice,
            ],
        ], 200);
    }

    /**
     * Delete a plan price.
     *
     * @param string $planId
     * @param string $planPriceId
     * @return JsonResponse
     */
    public function destroyPlanPrice(string $planId, string $planPriceId): JsonResponse
    {
        // Verify plan exists
        $this->planService->findOrFail($planId);

        $planPrice = $this->planPriceService->findOrFail($planPriceId);

        // Verify plan price belongs to plan
        if ($planPrice->plan_id != $planId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plan price does not belong to this plan',
            ], 404);
        }

        $this->planPriceService->delete($planPriceId);
        return response()->json(null, 204);
    }
}
