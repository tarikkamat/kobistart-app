<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Filter\CreateFilterGroupRequest;
use App\Http\Requests\Filter\UpdateFilterGroupRequest;
use App\Services\FilterGroupService;
use Illuminate\Http\JsonResponse;

class FilterGroupController extends Controller
{
    public function __construct(private FilterGroupService $filterGroupService)
    {
    }

    /**
     * Display a listing of the filter groups.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $filterGroups = $this->filterGroupService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Filter groups fetched successfully',
            'data' => [
                'filter_groups' => $filterGroups,
            ],
        ], 200);
    }

    /**
     * Display the specified filter group.
     *
     * @param  string  $filterGroupId
     * @return JsonResponse
     */
    public function show(string $filterGroupId): JsonResponse
    {
        $filterGroup = $this->filterGroupService->findOrFail($filterGroupId);

        return response()->json([
            'status' => 'success',
            'message' => 'Filter group fetched successfully',
            'data' => [
                'filter_group' => $filterGroup,
            ],
        ], 200);
    }

    /**
     * Store a newly created filter group.
     *
     * @param  CreateFilterGroupRequest  $request
     * @return JsonResponse
     */
    public function store(CreateFilterGroupRequest $request): JsonResponse
    {
        $filterGroup = $this->filterGroupService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Filter group created successfully',
            'data' => [
                'filter_group' => $filterGroup,
            ],
        ], 201);
    }

    /**
     * Update the specified filter group.
     *
     * @param  UpdateFilterGroupRequest  $request
     * @param  string  $filterGroupId
     * @return JsonResponse
     */
    public function update(UpdateFilterGroupRequest $request, string $filterGroupId): JsonResponse
    {
        $this->filterGroupService->update($filterGroupId, $request->validated());
        $filterGroup = $this->filterGroupService->findOrFail($filterGroupId);

        return response()->json([
            'status' => 'success',
            'message' => 'Filter group updated successfully',
            'data' => [
                'filter_group' => $filterGroup,
            ],
        ], 200);
    }

    /**
     * Delete a filter group.
     *
     * @param  string  $filterGroupId
     * @return JsonResponse
     */
    public function destroy(string $filterGroupId): JsonResponse
    {
        $this->filterGroupService->delete($filterGroupId);
        return response()->json(null, 204);
    }
}

