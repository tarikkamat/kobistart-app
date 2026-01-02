<?php

namespace App\Models;

use App\Enums\FeatureKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FilterItem extends Model
{
    /** @use HasFactory<\Database\Factories\FilterItemFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'filter_group_id',
        'feature_id',
        'feature_key',
        'name',
        'order',
        'status',
    ];

    /**
     * Get the filter group that owns the item.
     *
     * @return BelongsTo<FilterGroup>
     */
    public function filterGroup(): BelongsTo
    {
        return $this->belongsTo(FilterGroup::class);
    }

    /**
     * Get the feature.
     *
     * @return BelongsTo<Feature>
     */
    public function feature(): BelongsTo
    {
        return $this->belongsTo(Feature::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'order' => 'integer',
            'feature_key' => FeatureKey::class,
        ];
    }
}
