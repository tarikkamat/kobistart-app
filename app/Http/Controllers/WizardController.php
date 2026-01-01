<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class WizardController extends Controller
{
    /**
     * Display the wizard page.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('wizard/index');
    }

    /**
     * Display the wizard result page.
     *
     * @return Response
     */
    public function result()
    {
        return Inertia::render('wizard/result');
    }
}

