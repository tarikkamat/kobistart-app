<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Feature\CreateFeatureRequest;
use App\Http\Requests\Feature\UpdateFeatureRequest;
use App\Services\Feature\FeatureService;
use Illuminate\Http\JsonResponse;

class FeatureController extends Controller
{
    public function __construct(private FeatureService $featureService)
    {
    }

    /**
     * Display a listing of the features.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $features = $this->featureService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Features fetched successfully',
            'data' => [
                'features' => $features,
            ],
        ], 200);
    }

    /**
     * Display the specified feature.
     *
     * @param  string  $featureId
     * @return JsonResponse
     */
    public function show(string $featureId): JsonResponse
    {
        $feature = $this->featureService->findOrFail($featureId);

        return response()->json([
            'status' => 'success',
            'message' => 'Feature fetched successfully',
            'data' => [
                'feature' => $feature,
            ],
        ], 200);
    }

    /**
     * Store a newly created feature.
     *
     * @param  CreateFeatureRequest  $request
     * @return JsonResponse
     */
    public function store(CreateFeatureRequest $request): JsonResponse
    {
        $feature = $this->featureService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Feature created successfully',
            'data' => [
                'feature' => $feature,
            ],
        ], 201);
    }

    /**
     * Update the specified feature.
     *
     * @param  UpdateFeatureRequest  $request
     * @param  string  $featureId
     * @return JsonResponse
     */
    public function update(UpdateFeatureRequest $request, string $featureId): JsonResponse
    {
        $this->featureService->update($featureId, $request->validated());
        $feature = $this->featureService->findOrFail($featureId);

        return response()->json([
            'status' => 'success',
            'message' => 'Feature updated successfully',
            'data' => [
                'feature' => $feature,
            ],
        ], 200);
    }

    /**
     * Delete a feature.
     *
     * @param  string  $featureId
     * @return JsonResponse
     */
    public function destroy(string $featureId): JsonResponse
    {
        $this->featureService->delete($featureId);
        return response()->json(null, 204);
    }
}

