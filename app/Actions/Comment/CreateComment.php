<?php

namespace App\Actions\Comment;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CreateComment
{
    /**
     * Validate and create a new comment.
     *
     * @param  array<string, mixed>  $input
     * @param  int|null  $userId
     * @return Comment
     */
    public function execute(array $input, ?int $userId = null): Comment
    {
        Validator::make($input, [
            'platform_id' => 'required|exists:platforms,id',
            'comment' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ])->validate();

        $comment = new Comment();
        $comment->user_id = $userId ?? Auth::id();
        $comment->platform_id = $input['platform_id'];
        $comment->comment = $input['comment'];
        $comment->rating = $input['rating'];
        $comment->status = true;
        $comment->save();

        return $comment;
    }
}

