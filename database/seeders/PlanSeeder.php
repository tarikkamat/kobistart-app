<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            // Shopify Plans
            [
                'platform_id' => 1,
                'name' => 'Basic',
                'slug' => 'basic',
            ],
            [
                'platform_id' => 1,
                'name' => 'Grow',
                'slug' => 'grow',
            ],
            [
                'platform_id' => 1,
                'name' => 'Advanced',
                'slug' => 'advanced',
            ],
            [
                'platform_id' => 1,
                'name' => 'Plus',
                'slug' => 'plus',
            ],

            // Ticimax Plans
            [
                'platform_id' => 2,
                'name' => 'Advantage',
                'slug' => 'advantage',
            ],
            [
                'platform_id' => 2,
                'name' => 'Premier',
                'slug' => 'premier',
            ],
            [
                'platform_id' => 2,
                'name' => 'Advanced',
                'slug' => 'advanced',
            ],
            [
                'platform_id' => 2,
                'name' => 'Advance Plus',
                'slug' => 'advance-plus',
            ],
            [
                'platform_id' => 2,
                'name' => 'Prestige',
                'slug' => 'prestige',
            ],
            [
                'platform_id' => 2,
                'name' => 'Royal',
                'slug' => 'royal'
            ]
        ];

        foreach ($plans as $plan) {
            Plan::firstOrCreate($plan);
        }
    }
}
