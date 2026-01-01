<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FilterGroup;
use App\Models\FilterItem;
use App\Models\Feature;

class FilterItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all features
        $features = Feature::all();

        // Group features by category
        $featuresByCategory = $features->groupBy('category');

        foreach ($featuresByCategory as $category => $categoryFeatures) {
            // Find filter group by category slug
            $filterGroup = FilterGroup::where('slug', $category)->first();

            if (!$filterGroup) {
                continue;
            }

            $order = 0;
            foreach ($categoryFeatures as $feature) {
                FilterItem::firstOrCreate(
                    [
                        'filter_group_id' => $filterGroup->id,
                        'feature_id' => $feature->id,
                    ],
                    [
                        'name' => $feature->name,
                        'order' => $order++,
                        'status' => true,
                    ]
                );
            }
        }
    }
}
