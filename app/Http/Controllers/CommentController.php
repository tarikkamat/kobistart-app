<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'platform_id' => 'required|exists:platforms,id',
            'comment' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $comment = new Comment();
        $comment->user_id = Auth::id();
        $comment->platform_id = $validated['platform_id'];
        $comment->comment = $validated['comment'];
        $comment->rating = $validated['rating'];
        $comment->status = true; // Auto-approve for now, or false if moderation needed
        $comment->save();

        return back()->with('success', 'Yorumunuz başarıyla eklendi.');
    }
}
