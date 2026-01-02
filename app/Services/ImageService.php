<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Repository\ImageRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService extends BaseService
{
    public function __construct(ImageRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Upload an image file and save to database.
     *
     * @param  UploadedFile  $file
     * @return \App\Models\Image
     */
    public function uploadImage(UploadedFile $file): \App\Models\Image
    {
        // Generate unique filename
        $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();

        // Store file
        $storedPath = Storage::disk('public')->putFileAs('images', $file, $filename);

        // Get image dimensions (for JPG, PNG, WEBP)
        $width = null;
        $height = null;
        $mimeType = $file->getMimeType();

        if (in_array($mimeType, ['image/jpeg', 'image/png', 'image/webp'])) {
            $imageInfo = getimagesize($file->getRealPath());
            if ($imageInfo !== false) {
                $width = $imageInfo[0];
                $height = $imageInfo[1];
            }
        }

        // Create database record
        /** @var ImageRepository $repository */
        $repository = $this->repository;
        return $repository->create([
            'name' => $file->getClientOriginalName(),
            'path' => $storedPath,
            'mime_type' => $mimeType,
            'size' => $file->getSize(),
            'width' => $width,
            'height' => $height,
        ]);
    }

    /**
     * Delete an image and its file.
     *
     * @param  int|string  $id
     * @return bool
     */
    public function deleteImage(int|string $id): bool
    {
        $image = $this->findOrFail($id);

        // Delete file from storage
        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        // Delete database record
        return $this->delete($id);
    }
}

