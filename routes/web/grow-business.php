<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$tools = [
    [
        'id' => 1,
        'slug' => 'shopify-entegrasyonu',
        'title' => 'Kobistart Shopify Eklentisi',
        'description' => 'Shopify mağazanızı Kobistart ile tam entegre çalıştırın. Sipariş ve stok takibini otomatikleştirin.',
        'icon' => 'ShoppingBag',
        'category' => 'Entegrasyon',
        'type' => 'integration',
        'action' => 'Bağla',
    ],
    [
        'id' => 2,
        'slug' => 'woocommerce-entegrasyonu',
        'title' => 'Kobistart WooCommerce Eklentisi',
        'description' => 'WordPress WooCommerce tabanlı e-ticaret sitenizi tek tıkla Kobistart paneline bağlayın.',
        'icon' => 'Store',
        'category' => 'Entegrasyon',
        'type' => 'integration',
        'action' => 'Bağla',
    ],
    [
        'id' => 3,
        'slug' => 'trendyol-komisyon-hesaplama',
        'title' => 'Trendyol Komisyon Hesaplama',
        'description' => 'Trendyol pazar yerindeki net karınızı hesaplayın. Komisyon, kargo ve diğer giderleri analiz edin.',
        'icon' => 'Calculator',
        'category' => 'Hesaplama',
        'type' => 'calculator',
        'action' => 'Hesapla',
    ],
    [
        'id' => 4,
        'slug' => 'kargo-fiyat-hesaplama',
        'title' => 'Kargo Fiyat Hesaplama',
        'description' => 'X Kargo firması ve diğer anlaşmalı kargolar için gönderi maliyetlerinizi önceden hesaplayın.',
        'icon' => 'Box',
        'category' => 'Hesaplama',
        'type' => 'calculator',
        'action' => 'Hesapla',
    ],
    [
        'id' => 5,
        'slug' => 'buyume-senaryosu-simulatoru',
        'title' => 'Büyüme Senaryosu Simülatörü',
        'description' => 'Farklı büyüme stratejilerini simüle edin. Yatırım ve dönüşüm oranlarının etkisini görün.',
        'icon' => 'TrendingUp',
        'category' => 'Analiz',
        'type' => 'analysis',
        'action' => 'Simüle Et',
    ],
    [
        'id' => 6,
        'slug' => 'seo-analiz-araci',
        'title' => 'SEO Analiz Aracı',
        'description' => 'Web sitenizin SEO performansını analiz edin. İyileştirme önerileri ile sıralamanızı yükseltin.',
        'icon' => 'Search',
        'category' => 'SEO',
        'type' => 'seo',
        'action' => 'Analiz Et',
    ],
    [
        'id' => 7,
        'slug' => 'anahtar-kelime-sira-bulucu',
        'title' => 'Anahtar Kelime Sıra Bulucu',
        'description' => 'Hedeflediğiniz anahtar kelimelerde Google sıralamanızı takip edin. Rekabet analizi yapın.',
        'icon' => 'BarChart',
        'category' => 'SEO',
        'type' => 'seo',
        'action' => 'Sıra Bul',
    ],
    [
        'id' => 8,
        'slug' => 'satis-forecasting',
        'title' => 'Satış Forecasting',
        'description' => 'Geçmiş verilerinizi kullanarak gelecek satışlarınızı tahmin edin. Stok ve bütçe planlamanızı yapın.',
        'icon' => 'LineChart',
        'category' => 'Analiz',
        'type' => 'analysis',
        'action' => 'Tahmin Et',
    ],
];

Route::get('/isinizi-buyutun', function () use ($tools) {
    return Inertia::render('grow-business/index', [
        'tools' => $tools
    ]);
})->name('grow-business.index');

Route::get('/isinizi-buyutun/{slug}', function ($slug) use ($tools) {
    $tool = collect($tools)->firstWhere('slug', $slug);

    if (!$tool) {
        abort(404);
    }

    return Inertia::render('grow-business/show', [
        'tool' => $tool
    ]);
})->name('grow-business.show');
