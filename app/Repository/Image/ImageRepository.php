<?php

namespace App\Repository\Image;

use App\Contracts\Base\BaseRepository;
use App\Contracts\Image\ImageRepositoryInterface;
use App\Models\Image;

class ImageRepository extends BaseRepository implements ImageRepositoryInterface
{
    public function __construct(Image $image)
    {
        parent::__construct($image);
    }
}

