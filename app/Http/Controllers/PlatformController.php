<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\PlatformService;
use Inertia\Inertia;
use Inertia\Response;

class PlatformController extends Controller
{
    public function __construct(private PlatformService $platformService)
    {
    }

    public function index(): Response
    {
        return Inertia::render('platforms/index', [
            'platforms' => $this->platformService->getActivePlatforms(),
        ]);
    }

    public function show(string $slug): Response
    {
        $platform = $this->platformService->getPlatformBySlug($slug);

        if (!$platform) {
            abort(404);
        }

        return Inertia::render('platforms/show', [
            'platform' => $platform,
            'plans' => $platform->plans,
        ]);
    }
}
