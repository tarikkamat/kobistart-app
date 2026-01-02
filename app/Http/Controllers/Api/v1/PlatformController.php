<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlatformRequest;
use App\Http\Requests\UpdatePlatformRequest;
use App\Services\PlatformService;
use Illuminate\Http\JsonResponse;

class PlatformController extends Controller
{
    public function __construct(private PlatformService $platformService)
    {
    }

    /**
     * Display a listing of the platforms.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $platforms = $this->platformService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Platforms fetched successfully',
            'data' => [
                'platforms' => $platforms,
            ],
        ], 200);
    }

    /**
     * Display the specified platform.
     *
     * @param  string  $platformId
     * @return JsonResponse
     */
    public function show(string $platformId): JsonResponse
    {
        $platform = $this->platformService->findOrFail($platformId);

        return response()->json([
            'status' => 'success',
            'message' => 'Platform fetched successfully',
            'data' => [
                'platform' => $platform,
            ],
        ], 200);
    }

    /**
     * Store a newly created platform.
     *
     * @param  CreatePlatformRequest  $request
     * @return JsonResponse
     */
    public function store(CreatePlatformRequest $request): JsonResponse
    {
        $platform = $this->platformService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Platform created successfully',
            'data' => [
                'platform' => $platform,
            ],
        ], 201);
    }

    /**
     * Update the specified platform.
     *
     * @param  UpdatePlatformRequest  $request
     * @param  string  $platformId
     * @return JsonResponse
     */
    public function update(UpdatePlatformRequest $request, string $platformId): JsonResponse
    {
        $this->platformService->update($platformId, $request->validated());
        $platform = $this->platformService->findOrFail($platformId);

        return response()->json([
            'status' => 'success',
            'message' => 'Platform updated successfully',
            'data' => [
                'platform' => $platform,
            ],
        ], 200);
    }

    /**
     * Delete a platform.
     *
     * @param  string  $platformId
     * @return JsonResponse
     */
    public function destroy(string $platformId): JsonResponse
    {
        $this->platformService->delete($platformId);
        return response()->json(null, 204);
    }
}
