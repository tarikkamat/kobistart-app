<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlatformRequest;
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
     * Store a newly created platform.
     *
     * @param CreatePlatformRequest $request
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
     * Delete a platform.
     *
     * @param string $platformId
     * @return JsonResponse
     */
    public function destroy(string $platformId): JsonResponse
    {
        $this->platformService->delete($platformId);
        return response()->json(null, 204);
    }
}
