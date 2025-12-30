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
                'description' => 'Shopify, global bir e-ticaret platformudur. Shopify, birçok ülke ve bölgede kullanılabilir ve birçok dilde desteklenir.',
                'slug' => 'shopify',
                'url' => 'https://www.shopify.com/?ref=kobistart',
                'logo' => 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
                'dark_logo' => 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-inverted-primary-logo-bdc6ddd67862d9bb1f8c559e1bb50dd233112ac57b29cac2edcf17ed2e1fe6fa.svg',
                'favicon' => 'images/shopify-favicon.png',
                'status' => true,
                'order' => 1,
                'is_local' => false,
                'color' => '#96bf48',
            ],
            [
                'name' => 'Ticimax',
                'description' => 'Ticimax, Türkiye\'deki en popüler e-ticaret platformudur. Ticimax, birçok ülke ve bölgede kullanılabilir ve birçok dilde desteklenir.',
                'slug' => 'ticimax',
                'url' => 'https://ticimax.com/?utm=kobistart',
                'logo' => 'https://static.ticimax.com/uploads/images/ticimax-logo.svg',
                'dark_logo' => 'https://webnex.com.tr/assets/partnerships/ticimax-logo.png',
                'favicon' => 'https://static.ticimax.com/images/favicon.ico',
                'status' => true,
                'order' => 2,
                'is_local' => true,
                'color' => '#ff0000',
            ]
        ];

        foreach ($platforms as $platform) {
            Platform::firstOrCreate($platform);
        }
    }
}
