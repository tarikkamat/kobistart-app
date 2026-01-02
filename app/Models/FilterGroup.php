<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FilterGroup extends Model
{
    /** @use HasFactory<\Database\Factories\FilterGroupFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'order',
        'status',
    ];

    /**
     * Get the filter items for the group.
     *
     * @return HasMany<FilterItem>
     */
    public function filterItems(): HasMany
    {
        return $this->hasMany(FilterItem::class);
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
        ];
    }
}
