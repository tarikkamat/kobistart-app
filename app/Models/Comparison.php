<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comparison extends Model
{
    /** @use HasFactory<\Database\Factories\ComparisonFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'plan1_id',
        'plan2_id',
        'plan1_data',
        'plan2_data',
        'comparison_data',
        'notes',
    ];

    /**
     * Get the user that owns the comparison.
     *
     * @return BelongsTo<User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the first plan.
     *
     * @return BelongsTo<Plan>
     */
    public function plan1(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'plan1_id');
    }

    /**
     * Get the second plan.
     *
     * @return BelongsTo<Plan>
     */
    public function plan2(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'plan2_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'plan1_data' => 'array',
            'plan2_data' => 'array',
            'comparison_data' => 'array',
        ];
    }
}
