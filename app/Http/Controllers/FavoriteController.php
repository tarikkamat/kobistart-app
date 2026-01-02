<?php

namespace App\Http\Controllers;

use App\Services\FavoriteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function __construct(private FavoriteService $favoriteService)
    {
    }

    /**
     * Display a listing of the user's favorites.
     */
    public function index(): Response
    {
        $favorites = $this->favoriteService->getUserFavorites();

        // Separate platforms and plans
        $platforms = [];
        $plans = [];

        foreach ($favorites as $favorite) {
            if ($favorite->favoritable_type === 'App\\Models\\Platform') {
                $platforms[] = $favorite->favoritable;
            } elseif ($favorite->favoritable_type === 'App\\Models\\Plan') {
                $plans[] = $favorite->favoritable;
            }
        }

        return Inertia::render('favorites/index', [
            'platforms' => $platforms,
            'plans' => $plans,
        ]);
    }

    /**
     * Store a newly created favorite.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'favoritable_type' => 'required|string|in:App\\Models\\Platform,App\\Models\\Plan',
            'favoritable_id' => 'required|integer',
        ]);

        $this->favoriteService->addFavorite(
            $validated['favoritable_type'],
            $validated['favoritable_id']
        );

        return back()->with('success', 'Favorilere eklendi.');
    }

    /**
     * Remove the specified favorite.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'favoritable_type' => 'required|string|in:App\\Models\\Platform,App\\Models\\Plan',
            'favoritable_id' => 'required|integer',
        ]);

        $this->favoriteService->removeFavorite(
            $validated['favoritable_type'],
            $validated['favoritable_id']
        );

        return back()->with('success', 'Favorilerden çıkarıldı.');
    }
}

