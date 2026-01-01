<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Feature;
use App\Enums\FeatureKey;

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
