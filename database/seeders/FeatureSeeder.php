<?php

namespace Database\Seeders;

use App\Enums\FeatureKey;
use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $order = 0;

        foreach (FeatureKey::cases() as $featureKey) {
            Feature::firstOrCreate(
                ['key' => $featureKey->value],
                [
                    'category' => $featureKey->category(),
                    'name' => $featureKey->label(),
                    'description' => null,
                    'order' => $order++,
                ]
            );
        }
    }
}
