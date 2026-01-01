<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PlatformSeeder::class,
            PlanSeeder::class,
            PlanPriceSeeder::class,
            FeatureSeeder::class,
            ShopifyPlanFeatureSeeder::class,
            TicimaxPlanFeatureSeeder::class,
            CommentSeeder::class,
            FilterGroupSeeder::class,
            FilterItemSeeder::class
        ]);
    }
}
