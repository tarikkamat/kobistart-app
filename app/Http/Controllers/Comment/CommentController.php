<?php

namespace App\Http\Controllers\Comment;

use App\Actions\Comment\CreateComment;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $action = new CreateComment();
        $action->execute($request->all());

        return back()->with('success', 'Yorumunuz başarıyla eklendi.');
    }
}

