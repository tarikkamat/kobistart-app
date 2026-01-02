<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Image\StoreImageRequest;
use App\Services\Image\ImageService;
use Illuminate\Http\JsonResponse;

class ImageController extends Controller
{
    public function __construct(private ImageService $imageService)
    {
    }

    /**
     * Display a listing of the images.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $images = $this->imageService->all();

        return response()->json([
            'status' => 'success',
            'message' => 'Images fetched successfully',
            'data' => [
                'images' => $images,
            ],
        ], 200);
    }

    /**
     * Display the specified image.
     *
     * @param  string  $imageId
     * @return JsonResponse
     */
    public function show(string $imageId): JsonResponse
    {
        $image = $this->imageService->findOrFail($imageId);

        return response()->json([
            'status' => 'success',
            'message' => 'Image fetched successfully',
            'data' => [
                'image' => $image,
            ],
        ], 200);
    }

    /**
     * Store a newly created image.
     *
     * @param  StoreImageRequest  $request
     * @return JsonResponse
     */
    public function store(StoreImageRequest $request): JsonResponse
    {
        $image = $this->imageService->uploadImage($request->file('image'));

        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded successfully',
            'data' => [
                'image' => $image,
            ],
        ], 201);
    }

    /**
     * Delete an image.
     *
     * @param  string  $imageId
     * @return JsonResponse
     */
    public function destroy(string $imageId): JsonResponse
    {
        $this->imageService->deleteImage($imageId);
        return response()->json(null, 204);
    }
}
