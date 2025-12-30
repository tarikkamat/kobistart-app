<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Platform;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $platforms = [
            [
                'name' => 'Shopify',
                'slug' => 'shopify',
                'url' => 'https://www.shopify.com/?ref=kobistart',
                'logo' => 'images/shopify-logo-black.png',
                'dark_logo' => 'images/shopify-logo-black.png',
                'favicon' => 'images/shopify-favicon.png',
                'status' => true,
                'order' => 1,
            ],
            [
                'name' => 'Ticimax',
                'slug' => 'ticimax',
                'url' => 'https://ticimax.com/?utm=kobistart',
                'logo' => 'https://static.ticimax.com/uploads/images/ticimax-logo.svg',
                'favicon' => 'https://static.ticimax.com/images/favicon.ico',
                'status' => true,
                'order' => 2,
            ]
        ];

        foreach ($platforms as $platform) {
            Platform::firstOrCreate($platform);
        }
    }
}
