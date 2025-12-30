<?php

namespace App\Http\Controllers;

use App\Services\PlatformService;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param PlatformService $platformService
     */
    public function __construct(private PlatformService $platformService)
    {
    }

    /**
     * Display the home page.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('home/index', [
            'canRegister' => Features::enabled(Features::registration()),
            'platforms' => $this->platformService->getActivePlatforms(),
        ]);
    }
}
