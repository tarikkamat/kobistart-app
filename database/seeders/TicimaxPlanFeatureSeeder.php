<?php

namespace Database\Seeders;

use App\Enums\FeatureKey;
use App\Models\Feature;
use App\Models\Plan;
use App\Models\PlanFeature;
use Illuminate\Database\Seeder;

class TicimaxPlanFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tüm paketlerde ortak özellikler (Advantage'da başlayan)
        $commonFeatures = [
            [
                'key' => FeatureKey::ZERO_TRANSACTION_FEE->value, 'value' => 'true',
                'platform_label' => '%0 Ertesi Gün Sanal Pos Oranı'
            ],
            ['key' => FeatureKey::FREE_SETUP->value, 'value' => 'true', 'platform_label' => 'Ücretsiz Kurulum!'],
            [
                'key' => FeatureKey::FREE_LOGO_CREATION->value, 'value' => 'true',
                'platform_label' => 'Ücretsiz Logo Oluşturma'
            ],
            [
                'key' => FeatureKey::FREE_ECOMMERCE_TRAINING->value, 'value' => 'true',
                'platform_label' => 'Ücretsiz E-Ticaret Eğitimleri'
            ],
            [
                'key' => FeatureKey::CUSTOM_EMAIL_DOMAIN->value, 'value' => 'true',
                'platform_label' => 'Kurumsal E-mail Hesabı (@alanadiniz.com)'
            ],
            [
                'key' => FeatureKey::SUPPORT_24_7->value, 'value' => 'true',
                'platform_label' => '7/24 Canlı Telefon Desteği'
            ],
            [
                'key' => FeatureKey::SUPPORT_PHONE->value, 'value' => 'true',
                'platform_label' => '7/24 Canlı Telefon Desteği'
            ],
            [
                'key' => FeatureKey::E_INVOICE_INTEGRATION->value, 'value' => 'true',
                'platform_label' => 'E Fatura Entegrasyonu'
            ],
            [
                'key' => FeatureKey::E_ARCHIVE_INTEGRATION->value, 'value' => 'true',
                'platform_label' => 'E Arşiv Entegrasyonu'
            ],
            [
                'key' => FeatureKey::RESPONSIVE_THEMES->value, 'value' => '100+',
                'platform_label' => '100+ Hazır Mobil Uyumlu (Responsive) Tema'
            ],
            [
                'key' => FeatureKey::DESIGN_WIZARD->value, 'value' => 'true',
                'platform_label' => 'Sayfa Tasarım Sihirbazı'
            ],
            [
                'key' => FeatureKey::EXCEL_PRODUCT_IMPORT->value, 'value' => 'true',
                'platform_label' => 'Excel ile Ürün Yükleme'
            ],
            ['key' => FeatureKey::COOKIE_MANAGEMENT->value, 'value' => 'true', 'platform_label' => 'Çerez Yönetimi'],
            [
                'key' => FeatureKey::SEO_INFRASTRUCTURE->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş SEO Altyapısı'
            ],
            ['key' => FeatureKey::GIFT_CARDS->value, 'value' => 'true', 'platform_label' => 'Hediye Çeki'],
            ['key' => FeatureKey::PRODUCT_CAMPAIGNS->value, 'value' => 'true', 'platform_label' => 'Ürün Kampanyaları'],
            [
                'key' => FeatureKey::BLOG_CREATION->value, 'value' => 'true',
                'platform_label' => 'Blog Sayfası Oluşturma'
            ],
        ];

        // Advantage (plan_id: 5) - Temel özellikler
        $this->attachFeatures(5, $commonFeatures);

        // Premier (plan_id: 6) - Advantage + ek özellikler
        $premierFeatures = [
            [
                'key' => FeatureKey::CART_CAMPAIGNS->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş Sepet Kampanyaları'
            ],
            [
                'key' => FeatureKey::SHIPPING_CAMPAIGNS->value, 'value' => 'true',
                'platform_label' => 'Kargo Kampanyaları'
            ],
            [
                'key' => FeatureKey::CART_REMINDER_AUTOMATIC->value, 'value' => 'true',
                'platform_label' => 'Otomatik Sepet Hatırlatma'
            ],
            [
                'key' => FeatureKey::REVIEW_REMINDER->value, 'value' => 'true',
                'platform_label' => 'Otomatik Yorum Hatırlatma'
            ],
            [
                'key' => FeatureKey::CART_REMINDER_SMS->value, 'value' => 'true',
                'platform_label' => 'SMS ile Sepet Hatırlatma'
            ],
            [
                'key' => FeatureKey::STOCK_NOTIFICATIONS->value, 'value' => 'true',
                'platform_label' => 'Stok Yenilendi Bildirimleri'
            ],
            [
                'key' => FeatureKey::PRICE_DROP_NOTIFICATIONS->value, 'value' => 'true',
                'platform_label' => 'Fiyat Düştü Bildirimleri'
            ],
            [
                'key' => FeatureKey::DYNAMIC_PRICING->value, 'value' => 'true',
                'platform_label' => 'Dinamik Fiyatlandırma'
            ],
            [
                'key' => FeatureKey::BULK_PRODUCT_UPDATE->value, 'value' => 'true',
                'platform_label' => 'Toplu Ürün Güncelleme'
            ],
            ['key' => FeatureKey::WISHLIST->value, 'value' => 'true', 'platform_label' => 'İstek Listesi Oluşturma'],
            ['key' => FeatureKey::GUEST_CHECKOUT->value, 'value' => 'true', 'platform_label' => 'Alışverişsiz Ödeme'],
            [
                'key' => FeatureKey::ADVANCED_REPORTING->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş Raporlama'
            ],
            ['key' => FeatureKey::BULK_EMAIL->value, 'value' => 'true', 'platform_label' => 'Toplu E-Mail Gönderme'],
            ['key' => FeatureKey::BULK_SMS->value, 'value' => 'true', 'platform_label' => 'Toplu Sms Gönderme'],
        ];
        $this->attachFeatures(6, array_merge($commonFeatures, $premierFeatures));

        // Advanced (plan_id: 7) - Premier + ek özellikler
        $advancedFeatures = [
            [
                'key' => FeatureKey::MARKETPLACE_INTEGRATIONS->value, 'value' => '3',
                'platform_label' => '3 Yurt İçi Pazaryeri Entegrasyonu'
            ],
            [
                'key' => FeatureKey::AI_FEATURES->value, 'value' => 'true',
                'platform_label' => 'Ticimax Ai (Yapay Zeka Özellikleri)'
            ],
            [
                'key' => FeatureKey::EXIT_INTENT_POPUP->value, 'value' => 'true',
                'platform_label' => 'Site Çıkış Uyarısı'
            ],
            ['key' => FeatureKey::CUSTOM_CAMPAIGNS->value, 'value' => 'true', 'platform_label' => 'Özel Kampanyalar'],
            ['key' => FeatureKey::B2B_SALES->value, 'value' => 'true', 'platform_label' => 'B2B / Kurumsal Satış'],
            [
                'key' => FeatureKey::ASSORTED_PRODUCTS->value, 'value' => 'true',
                'platform_label' => 'Asortili Ürün Satış Modülü'
            ],
            [
                'key' => FeatureKey::BUNDLE_PRODUCTS->value, 'value' => 'true',
                'platform_label' => 'Paket Ürün (Bundle) ve Kampanyaları'
            ],
            [
                'key' => FeatureKey::PANEL_ORDER_CREATION->value, 'value' => 'true',
                'platform_label' => 'Panelden Sipariş Oluşturma'
            ],
            ['key' => FeatureKey::STORE_SALES->value, 'value' => 'true', 'platform_label' => 'Mağazadan Satış'],
            ['key' => FeatureKey::VOICE_SEARCH->value, 'value' => 'true', 'platform_label' => 'Sesli Arama'],
            [
                'key' => FeatureKey::CROSS_SELLING_ADVANCED->value, 'value' => 'true',
                'platform_label' => 'İleri Seviye Çapraz Satış'
            ],
            ['key' => FeatureKey::PREMIUM_DESIGN->value, 'value' => 'true', 'platform_label' => 'Özel Elit Tasarım'],
        ];
        $this->attachFeatures(7, array_merge($commonFeatures, $premierFeatures, $advancedFeatures));

        // Advance Plus (plan_id: 8) - Advanced + ek özellikler
        $advancePlusFeatures = [
            [
                'key' => FeatureKey::MARKETPLACE_INTEGRATIONS_UNLIMITED->value, 'value' => 'true',
                'platform_label' => 'Sınırsız Pazaryeri Entegrasyonu Hediye!'
            ],
            [
                'key' => FeatureKey::AI_IMAGE_GENERATOR->value, 'value' => 'true',
                'platform_label' => 'Ai (Yapay Zeka) Görsel Oluşturucu'
            ],
            [
                'key' => FeatureKey::AI_BANNER_DESIGN->value, 'value' => 'true',
                'platform_label' => 'Ai Banner Tasarım Asistanı'
            ],
            [
                'key' => FeatureKey::CAMPAIGN_WIZARD->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş Kampanya Sihirbazı'
            ],
            [
                'key' => FeatureKey::CART_ABANDONMENT->value, 'value' => 'true',
                'platform_label' => 'Sepette Satış Arttırma Sistemleri'
            ],
            ['key' => FeatureKey::DYNAMIC_FORMS->value, 'value' => 'true', 'platform_label' => 'Dinamik Form'],
            ['key' => FeatureKey::STOCKLESS_SALES->value, 'value' => 'true', 'platform_label' => 'Stoksuz Satış'],
            ['key' => FeatureKey::LOOKBOOK->value, 'value' => 'true', 'platform_label' => 'Lookbook'],
            [
                'key' => FeatureKey::PAYMENT_VERIFICATION_SMS->value, 'value' => 'true',
                'platform_label' => 'Kapıda Ödeme Sms Doğrulama'
            ],
            [
                'key' => FeatureKey::PAYMENT_REFUND_PANEL->value, 'value' => 'true',
                'platform_label' => 'Panelden Ödeme İade Edebilme'
            ],
            ['key' => FeatureKey::COMBINATION_MODULE->value, 'value' => 'true', 'platform_label' => 'Kombin Modülü'],
            ['key' => FeatureKey::PHOTO_REVIEWS->value, 'value' => 'true', 'platform_label' => 'Fotoğraflı Ürün Yorum'],
            ['key' => FeatureKey::ASK_SELLER->value, 'value' => 'true', 'platform_label' => 'Satıcıya Sor'],
            [
                'key' => FeatureKey::PRODUCT_CUSTOMIZATION->value, 'value' => 'true',
                'platform_label' => 'Ürün Kişiselleştirme'
            ],
            [
                'key' => FeatureKey::PRODUCT_SORTING_ADVANCED->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş Ürün Sıralama'
            ],
            [
                'key' => FeatureKey::STAFF_ACCOUNTS->value, 'value' => 'Unlimited',
                'platform_label' => 'Sınırsız Kullanıcı'
            ],
        ];
        $this->attachFeatures(8,
            array_merge($commonFeatures, $premierFeatures, $advancedFeatures, $advancePlusFeatures));

        // Prestige (plan_id: 9) - Advance Plus + ek özellikler
        $prestigeFeatures = [
            [
                'key' => FeatureKey::CUSTOM_DESIGN->value, 'value' => 'true',
                'platform_label' => 'Responsive Özel Tasarım Hediye!'
            ],
            [
                'key' => FeatureKey::EXPORT_FEATURES->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş E-ihracat Özellikleri'
            ],
            [
                'key' => FeatureKey::COUNTRY_SPECIFIC_PAGES->value, 'value' => 'true',
                'platform_label' => 'Ülkeye Özel Sayfa Tasarlama'
            ],
            ['key' => FeatureKey::AUTO_TRANSLATION->value, 'value' => 'true', 'platform_label' => 'Otomatik Çeviri'],
            [
                'key' => FeatureKey::IYS_INTEGRATION->value, 'value' => 'true',
                'platform_label' => 'İYS Entegrasyonu (Yasal Zorunluluk)'
            ],
            [
                'key' => FeatureKey::MARKETPLACE_INTEGRATIONS_UNLIMITED->value, 'value' => 'true',
                'platform_label' => 'Sınırsız Yurt İçi ve Yurt Dışı Pazaryeri Entegrasyonu'
            ],
            ['key' => FeatureKey::SMS_LOGIN->value, 'value' => 'true', 'platform_label' => 'Telefon(Sms) ile Giriş'],
            ['key' => FeatureKey::SET_MODULE->value, 'value' => 'true', 'platform_label' => 'Takım Modülü'],
            ['key' => FeatureKey::TEAM_PARTS->value, 'value' => 'true', 'platform_label' => 'Takım Parçaları Özelliği'],
            [
                'key' => FeatureKey::AFFILIATE_MARKETING->value, 'value' => 'true',
                'platform_label' => 'Affiliate Marketing'
            ],
            [
                'key' => FeatureKey::COLLECTIONS_FEATURE->value, 'value' => 'true',
                'platform_label' => 'Koleksiyon Özelliği'
            ],
            [
                'key' => FeatureKey::MARKETING_AUTOMATION_AI->value, 'value' => 'true',
                'platform_label' => 'Yapay Zeka Destekli Pazarlama Otomasyonu'
            ],
        ];
        $this->attachFeatures(9,
            array_merge($commonFeatures, $premierFeatures, $advancedFeatures, $advancePlusFeatures, $prestigeFeatures));

        // Royal (plan_id: 10) - Prestige + ek özellikler
        $royalFeatures = [
            [
                'key' => FeatureKey::PRIORITY_SUPPORT->value, 'value' => '3 months',
                'platform_label' => '3 Ay V.I.P Hizmet'
            ],
            [
                'key' => FeatureKey::CUSTOM_DESIGN->value, 'value' => 'true',
                'platform_label' => 'Markanıza Özel Tasarım Çözümleri'
            ],
            [
                'key' => FeatureKey::ERP_INTEGRATION->value, 'value' => 'true',
                'platform_label' => 'Ücretsiz ERP Entegrasyonu'
            ],
            [
                'key' => FeatureKey::NATIVE_MOBILE_APP->value, 'value' => 'true',
                'platform_label' => 'Native Mobil Uygulama'
            ],
            ['key' => FeatureKey::MULTI_STORE->value, 'value' => 'true', 'platform_label' => 'Mağazalarımız'],
            ['key' => FeatureKey::WHICH_STORE->value, 'value' => 'true', 'platform_label' => 'Hangi Mağazada'],
            [
                'key' => FeatureKey::ADVANCED_SEARCH->value, 'value' => 'true',
                'platform_label' => 'Gelişmiş Arama Sistemi'
            ],
            ['key' => FeatureKey::INSTALLMENT_PAYMENT->value, 'value' => 'true', 'platform_label' => 'Parçalı Ödeme'],
            ['key' => FeatureKey::WALLET_MODULE->value, 'value' => 'true', 'platform_label' => 'Cüzdan Modülü'],
            [
                'key' => FeatureKey::PRODUCT_SORTING_ADVANCED->value, 'value' => 'true',
                'platform_label' => 'Otomatik Ürün Sıralama'
            ],
            [
                'key' => FeatureKey::PREMIUM_MOBILE_APP->value, 'value' => 'true',
                'platform_label' => 'Özel Native Premium Mobil Uygulama'
            ],
            [
                'key' => FeatureKey::WAREHOUSE_MANAGEMENT->value, 'value' => 'true',
                'platform_label' => 'Depo Yönetim Sistemi'
            ],
            [
                'key' => FeatureKey::CONSIGNMENT_SALES->value, 'value' => 'true',
                'platform_label' => 'Konsinye Ürün Satışı'
            ],
            ['key' => FeatureKey::LIVE_STREAMING->value, 'value' => 'true', 'platform_label' => 'Canlı Yayın Özelliği'],
            ['key' => FeatureKey::SUPPLIER_MODULE->value, 'value' => 'true', 'platform_label' => 'Tedarikçi Modülü'],
            ['key' => FeatureKey::PRODUCT_GROUPING->value, 'value' => 'true', 'platform_label' => 'Ürün Grubu'],
            ['key' => FeatureKey::PRODUCT_CUSTOMIZATION->value, 'value' => 'true', 'platform_label' => 'Özelleştirme'],
            ['key' => FeatureKey::OMNI_CHANNEL->value, 'value' => 'true', 'platform_label' => 'Omni Channel Modülü'],
            ['key' => FeatureKey::STORE_DELIVERY->value, 'value' => 'true', 'platform_label' => 'Mağazadan Teslimat'],
            ['key' => FeatureKey::STORE_PAYMENT->value, 'value' => 'true', 'platform_label' => 'Mağazada Öde'],
            [
                'key' => FeatureKey::STORE_ORDER_SHIPPING->value, 'value' => 'true',
                'platform_label' => 'Mağazadan Sipariş Gönderme'
            ],
        ];
        $this->attachFeatures(10,
            array_merge($commonFeatures, $premierFeatures, $advancedFeatures, $advancePlusFeatures, $prestigeFeatures,
                $royalFeatures));
    }

    /**
     * Attach features to a plan
     */
    private function attachFeatures(int $planId, array $features): void
    {
        $plan = Plan::find($planId);
        if (!$plan) {
            return;
        }

        foreach ($features as $featureData) {
            $feature = Feature::where('key', $featureData['key'])->first();
            if (!$feature) {
                continue;
            }

            PlanFeature::updateOrCreate(
                [
                    'plan_id' => $planId,
                    'feature_id' => $feature->id,
                ],
                [
                    'value' => $featureData['value'] ?? null,
                    'is_included' => true,
                    'platform_label' => $featureData['platform_label'] ?? null,
                ]
            );
        }
    }
}
