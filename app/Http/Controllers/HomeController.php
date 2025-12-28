<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('home/index', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}
