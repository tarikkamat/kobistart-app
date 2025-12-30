<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'platform_id',
        'comment',
        'rating',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'decimal:1',
        'status' => 'boolean',
    ];

    /**
     * Summary of user
     * @return BelongsTo<User, Comment>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Summary of platform
     * @return BelongsTo<Platform, Comment>
     */
    public function platform()
    {
        return $this->belongsTo(Platform::class);
    }
}
