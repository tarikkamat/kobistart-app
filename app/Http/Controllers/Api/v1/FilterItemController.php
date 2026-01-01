<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateFilterItemRequest;
use App\Http\Requests\UpdateFilterItemRequest;
use App\Services\FilterItemService;
use Illuminate\Http\JsonResponse;

class FilterItemController extends Controller
{
    public function __construct(private FilterItemService $filterItemService)
    {
    }

    /**
     * Display a listing of the filter items.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $filterItems = $this->filterItemService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Filter items fetched successfully',
            'data' => [
                'filter_items' => $filterItems,
            ],
        ], 200);
    }

    /**
     * Display the specified filter item.
     *
     * @param string $filterItemId
     * @return JsonResponse
     */
    public function show(string $filterItemId): JsonResponse
    {
        $filterItem = $this->filterItemService->findOrFail($filterItemId);

        return response()->json([
            'status' => 'success',
            'message' => 'Filter item fetched successfully',
            'data' => [
                'filter_item' => $filterItem,
            ],
        ], 200);
    }

    /**
     * Store a newly created filter item.
     *
     * @param CreateFilterItemRequest $request
     * @return JsonResponse
     */
    public function store(CreateFilterItemRequest $request): JsonResponse
    {
        $filterItem = $this->filterItemService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Filter item created successfully',
            'data' => [
                'filter_item' => $filterItem,
            ],
        ], 201);
    }

    /**
     * Update the specified filter item.
     *
     * @param UpdateFilterItemRequest $request
     * @param string $filterItemId
     * @return JsonResponse
     */
    public function update(UpdateFilterItemRequest $request, string $filterItemId): JsonResponse
    {
        $this->filterItemService->update($filterItemId, $request->validated());
        $filterItem = $this->filterItemService->findOrFail($filterItemId);

        return response()->json([
            'status' => 'success',
            'message' => 'Filter item updated successfully',
            'data' => [
                'filter_item' => $filterItem,
            ],
        ], 200);
    }

    /**
     * Delete a filter item.
     *
     * @param string $filterItemId
     * @return JsonResponse
     */
    public function destroy(string $filterItemId): JsonResponse
    {
        $this->filterItemService->delete($filterItemId);
        return response()->json(null, 204);
    }
}

