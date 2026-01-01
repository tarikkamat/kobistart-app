<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FilterGroup;
use Illuminate\Support\Str;

class FilterGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'core' => ['name' => 'Temel Özellikler', 'description' => 'Platformun temel özellikleri'],
            'payment' => ['name' => 'Ödeme Özellikleri', 'description' => 'Ödeme ve işlem ücretleri'],
            'onboarding' => ['name' => 'Kurulum ve Eğitim', 'description' => 'Kurulum ve eğitim desteği'],
            'support' => ['name' => 'Destek', 'description' => 'Müşteri desteği seçenekleri'],
            'communication' => ['name' => 'İletişim', 'description' => 'E-posta ve SMS özellikleri'],
            'integration' => ['name' => 'Entegrasyonlar', 'description' => 'Üçüncü parti entegrasyonlar'],
            'design' => ['name' => 'Tasarım', 'description' => 'Tema ve tasarım özellikleri'],
            'product' => ['name' => 'Ürün Yönetimi', 'description' => 'Ürün yönetimi özellikleri'],
            'marketing' => ['name' => 'Pazarlama', 'description' => 'Pazarlama ve SEO özellikleri'],
            'shopping' => ['name' => 'Alışveriş', 'description' => 'Alışveriş deneyimi özellikleri'],
            'sales_channels' => ['name' => 'Satış Kanalları', 'description' => 'Farklı satış kanalları'],
            'b2b' => ['name' => 'B2B Özellikleri', 'description' => 'B2B satış özellikleri'],
            'international' => ['name' => 'Uluslararası', 'description' => 'Uluslararası satış özellikleri'],
            'ai' => ['name' => 'Yapay Zeka', 'description' => 'AI destekli özellikler'],
            'customization' => ['name' => 'Özelleştirme', 'description' => 'API ve özelleştirme seçenekleri'],
            'advanced' => ['name' => 'Gelişmiş Özellikler', 'description' => 'Gelişmiş özellikler'],
            'compliance' => ['name' => 'Uyumluluk', 'description' => 'Yasal uyumluluk özellikleri'],
            'finance' => ['name' => 'Finans', 'description' => 'Finansal özellikler'],
            'plus_exclusive' => ['name' => 'Plus Özel', 'description' => 'Plus plana özel özellikler'],
            'mobile' => ['name' => 'Mobil', 'description' => 'Mobil uygulama özellikleri'],
        ];

        $order = 0;
        foreach ($categories as $category => $data) {
            FilterGroup::firstOrCreate(
                ['slug' => $category],
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'order' => $order++,
                    'status' => true,
                ]
            );
        }
    }
}
