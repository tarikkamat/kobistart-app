<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$campaigns = [
    [
        'id' => 1,
        'slug' => 'yillik-pro-plan-indirimi',
        'title' => 'Yıllık Pro Plan İndirimi',
        'description' => 'Yıllık ödemelerde %20 indirim fırsatını kaçırmayın. Kobilerinizi dijitalleştirirken tasarruf edin.',
        'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'category' => 'Abonelik',
        'validUntil' => '31 Aralık 2026',
        'discount' => '%20 İndirim',
        'longDescription' => 'Yıllık Pro Plan ile işletmenizin tüm ihtiyaçlarını tek bir pakette karşılayın. Muhasebe, stok takibi, e-fatura ve pazaryeri entegrasyonları dahil tüm özelliklere %20 indirimle sahip olun. Ayrıca 7/24 öncelikli destek ve ücretsiz eğitim seansları da bu pakete dahildir.',
        'terms' => [
            'Sadece yeni aboneliklerde geçerlidir.',
            'Diğer indirimlerle birleştirilemez.',
            'Kredi kartı ile peşin ödemelerde geçerlidir.'
        ]
    ],
    [
        'id' => 2,
        'slug' => 'yeni-girisimci-destegi',
        'title' => 'Yeni Girişimci Desteği',
        'description' => 'İşletmenizi yeni kurduysanız, ilk 3 ay başlangıç paketi bizden hediye.',
        'image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'category' => 'Startup',
        'validUntil' => 'Süresiz',
        'discount' => '3 Ay Ücretsiz',
        'longDescription' => 'Yeni kurulan işletmelere destek olmak amacıyla başlattığımız bu program kapsamında, şirket kuruluşunuzu takip eden ilk 6 ay içinde başvuru yapmanız durumunda Başlangıç Paketini 3 ay boyunca tamamen ücretsiz kullanabilirsiniz.',
        'terms' => [
            'Son 6 ay içinde kurulmuş şahıs veya limited şirketleri için geçerlidir.',
            'Vergi levhası ibrazı zorunludur.',
            '3 ay sonunda standart tarife üzerinden devam eder.'
        ]
    ],
    [
        'id' => 3,
        'slug' => 'e-fatura-entegrasyon-firsati',
        'title' => 'E-Fatura Entegrasyon Fırsatı',
        'description' => 'Muhasebe yazılımı alan herkese e-fatura entegrasyonu ücretsiz kurulum.',
        'image' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'category' => 'Entegrasyon',
        'validUntil' => '15 Şubat 2026',
        'discount' => 'Ücretsiz Kurulum',
        'longDescription' => 'Dijital dönüşümünüzü hızlandırın! Muhasebe modülümüzü satın alan tüm kullanıcılarımıza, normalde ücretli olan E-Fatura ve E-Arşiv entegrasyon kurulum hizmetini hediye ediyoruz. Mali mühür başvurunuzdan entegrasyon süreçlerine kadar uzman ekibimiz yanınızda.',
        'terms' => [
            '12 aylık muhasebe paketi alımlarında geçerlidir.',
            'Kontör paketleri hariçtir.',
            'Mali mühür ücreti müşteriye aittir.'
        ]
    ],
    [
        'id' => 4,
        'slug' => 'referans-bonus-kampanyasi',
        'title' => 'Referans Bonus Kampanyası',
        'description' => 'KobiStart\'ı önerdiğiniz her işletme için 1 ay ücretsiz kullanım hakkı kazanın.',
        'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'category' => 'Referans',
        'validUntil' => 'Sürekli',
        'discount' => '1 Ay Hediye',
        'longDescription' => 'Memnuniyetinizi paylaşın, kazanın! KobiStart\'ı önerdiğiniz her arkadaşınız veya iş ortağınız sisteme üye olup ilk ödemesini yaptığında, mevcut paket sürenize 1 ay ücretsiz kullanım eklenir. Sınır yok, ne kadar çok referans o kadar çok bedava kullanım!',
        'terms' => [
            'Referans kodu ile üyelik zorunludur.',
            'Önerilen işletmenin en az 1 aylık ödeme yapması gerekir.',
            'Hediye süre aktivasyonu ödeme onayından sonra gerçekleşir.'
        ]
    ],
    [
        'id' => 6,
        'slug' => 'sezon-sonu-web-sitesi-kampanyasi',
        'title' => 'Sezon Sonu Web Sitesi Kampanyası',
        'description' => 'E-ticaret sitenizi şimdi açın, ödemeye 3 ay sonra başlayın.',
        'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'category' => 'E-Ticaret',
        'validUntil' => '1 Eylül 2026',
        'discount' => '3 Ay Erteleme',
        'longDescription' => 'E-ticarete başlamak için en doğru zaman! Hazır şablonlarımızla web sitenizi hemen kurun, satış yapmaya başlayın, ödemenizi 3 ay erteleyin. Alan adı, hosting ve SSL sertifikası pakete dahildir.',
        'terms' => [
            '12 aylık taahhüt gereklidir.',
            'Kredi kartı ile ödemelerde geçerlidir.',
            'İlk 3 ay herhangi bir ücret tahsil edilmez.'
        ]
    ],
];

Route::get('/kampanyalar', function () use ($campaigns) {
    return Inertia::render('campaigns/index', [
        'campaigns' => $campaigns
    ]);
})->name('campaigns.index');

Route::get('/kampanyalar/{slug}', function ($slug) use ($campaigns) {
    $campaign = collect($campaigns)->firstWhere('slug', $slug);

    if (!$campaign) {
        abort(404);
    }

    return Inertia::render('campaigns/show', [
        'campaign' => $campaign
    ]);
})->name('campaigns.show');
