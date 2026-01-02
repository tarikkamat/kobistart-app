<?php

namespace App\Repository;

use App\Contracts\BaseRepository;
use App\Models\Image;

class ImageRepository extends BaseRepository
{
    public function __construct(Image $image)
    {
        parent::__construct($image);
    }
}

