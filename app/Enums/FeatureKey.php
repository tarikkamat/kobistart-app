<?php

namespace App\Enums;

enum FeatureKey: string
{
    // ========== CORE FEATURES ==========
    case ONLINE_STORE = 'online_store';
    case CHECKOUT = 'checkout';
    case UNLIMITED_PRODUCTS = 'unlimited_products';
    case STAFF_ACCOUNTS = 'staff_accounts';
    case COLLABORATOR_ACCOUNTS = 'collaborator_accounts';
    case TEMPLATES_THEMES = 'templates_themes';
    case SALES_CHANNELS = 'sales_channels';
    case INVENTORY_LOCATIONS = 'inventory_locations';
    case ANALYTICS = 'analytics';
    case UNLIMITED_WEB_HOSTING = 'unlimited_web_hosting';
    case CUSTOM_DOMAIN = 'custom_domain';
    case FREE_SSL_CERTIFICATE = 'free_ssl_certificate';
    case ORGANIZATION_SETTINGS = 'organization_settings';

    // ========== PAYMENT & TRANSACTION ==========
    case ZERO_TRANSACTION_FEE = 'zero_transaction_fee';
    case NEXT_DAY_POS = 'next_day_pos';
    case TRANSACTION_FEES = 'transaction_fees';
    case TAX_PLATFORM = 'tax_platform';
    case PAYMENT_GATEWAYS = 'payment_gateways';

    // ========== SETUP & ONBOARDING ==========
    case FREE_SETUP = 'free_setup';
    case FREE_LOGO_CREATION = 'free_logo_creation';
    case FREE_ECOMMERCE_TRAINING = 'free_ecommerce_training';

    // ========== SUPPORT ==========
    case SUPPORT_24_7 = 'support_24_7';
    case SUPPORT_PHONE = 'support_phone';
    case SUPPORT_CHAT = 'support_chat';
    case SUPPORT_TICKET = 'support_ticket';
    case PRIORITY_SUPPORT = 'priority_support';
    case ENHANCED_SUPPORT = 'enhanced_support';

    // ========== EMAIL & COMMUNICATION ==========
    case CUSTOM_EMAIL_DOMAIN = 'custom_email_domain';
    case CORPORATE_EMAIL = 'corporate_email';
    case UNLIMITED_CONTACTS = 'unlimited_contacts';
    case EMAIL_CAMPAIGNS = 'email_campaigns';
    case BULK_EMAIL = 'bulk_email';
    case BULK_SMS = 'bulk_sms';
    case ABANDONED_CHECKOUT_RECOVERY = 'abandoned_checkout_recovery';

    // ========== INTEGRATIONS ==========
    case E_INVOICE_INTEGRATION = 'e_invoice_integration';
    case E_ARCHIVE_INTEGRATION = 'e_archive_integration';
    case MARKETPLACE_INTEGRATIONS = 'marketplace_integrations';
    case MARKETPLACE_INTEGRATIONS_UNLIMITED = 'marketplace_integrations_unlimited';
    case ERP_INTEGRATION = 'erp_integration';
    case THIRD_PARTY_APP_INTEGRATIONS = 'third_party_app_integrations';
    case IYS_INTEGRATION = 'iys_integration';

    // ========== DESIGN & THEMES ==========
    case RESPONSIVE_THEMES = 'responsive_themes';
    case MULTIPLE_THEMES = 'multiple_themes';
    case PAGE_BUILDER = 'page_builder';
    case DESIGN_WIZARD = 'design_wizard';
    case CUSTOM_DESIGN = 'custom_design';
    case PREMIUM_DESIGN = 'premium_design';
    case LOCAL_STOREFRONTS = 'local_storefronts';
    case HEADLESS_STOREFRONTS = 'headless_storefronts';

    // ========== PRODUCT MANAGEMENT ==========
    case EXCEL_PRODUCT_IMPORT = 'excel_product_import';
    case BULK_PRODUCT_UPLOAD = 'bulk_product_upload';
    case BULK_PRODUCT_UPDATE = 'bulk_product_update';
    case PRODUCT_COLLECTIONS = 'product_collections';
    case PRODUCT_VARIANTS = 'product_variants';
    case BUNDLE_PRODUCTS = 'bundle_products';
    case ASSORTED_PRODUCTS = 'assorted_products';
    case PRODUCT_CUSTOMIZATION = 'product_customization';
    case PRODUCT_GROUPING = 'product_grouping';
    case PRODUCT_SORTING = 'product_sorting';
    case PRODUCT_SORTING_ADVANCED = 'product_sorting_advanced';
    case STOCK_NOTIFICATIONS = 'stock_notifications';
    case PRICE_DROP_NOTIFICATIONS = 'price_drop_notifications';
    case DYNAMIC_PRICING = 'dynamic_pricing';
    case STOCKLESS_SALES = 'stockless_sales';
    case CONSCRIPTION_SALES = 'conscription_sales';
    case CROSS_SELLING = 'cross_selling';
    case CROSS_SELLING_ADVANCED = 'cross_selling_advanced';

    // ========== MARKETING & SEO ==========
    case ADVANCED_SEO = 'advanced_seo';
    case SEO_INFRASTRUCTURE = 'seo_infrastructure';
    case BLOG_CREATION = 'blog_creation';
    case MARKETING_AUTOMATION = 'marketing_automation';
    case MARKETING_AUTOMATION_AI = 'marketing_automation_ai';
    case CUSTOMER_SEGMENTATION = 'customer_segmentation';
    case DISCOUNT_CODES = 'discount_codes';
    case GIFT_CARDS = 'gift_cards';
    case PRODUCT_CAMPAIGNS = 'product_campaigns';
    case CART_CAMPAIGNS = 'cart_campaigns';
    case SHIPPING_CAMPAIGNS = 'shipping_campaigns';
    case CART_RECOVERY = 'cart_recovery';
    case CART_REMINDER_AUTOMATIC = 'cart_reminder_automatic';
    case CART_REMINDER_SMS = 'cart_reminder_sms';
    case REVIEW_REMINDER = 'review_reminder';
    case EXIT_INTENT_POPUP = 'exit_intent_popup';
    case CUSTOM_CAMPAIGNS = 'custom_campaigns';
    case CAMPAIGN_WIZARD = 'campaign_wizard';
    case CART_ABANDONMENT = 'cart_abandonment';
    case SMS_CAMPAIGNS = 'sms_campaigns';

    // ========== SHOPPING FEATURES ==========
    case WISHLIST = 'wishlist';
    case GUEST_CHECKOUT = 'guest_checkout';
    case SAVE_CART = 'save_cart';
    case SHOPIFY_COLLECTIVE = 'shopify_collective';
    case MARKETPLACE_CONNECT = 'marketplace_connect';

    // ========== SALES CHANNELS ==========
    case IN_PERSON_SELLING = 'in_person_selling';
    case POS_PRO = 'pos_pro';
    case STORE_SALES = 'store_sales';
    case PANEL_ORDER_CREATION = 'panel_order_creation';
    case STORE_PICKUP = 'store_pickup';
    case STORE_PAYMENT = 'store_payment';
    case STORE_DELIVERY = 'store_delivery';
    case STORE_ORDER_SHIPPING = 'store_order_shipping';
    case MULTI_STORE = 'multi_store';
    case WHICH_STORE = 'which_store';

    // ========== B2B FEATURES ==========
    case B2B_SALES = 'b2b_sales';
    case WHOLESALE_SALES = 'wholesale_sales';
    case B2B_FEATURES = 'b2b_features';

    // ========== INTERNATIONAL ==========
    case LANGUAGE_TRANSLATION = 'language_translation';
    case AUTO_TRANSLATION = 'auto_translation';
    case MULTI_MARKET = 'multi_market';
    case PRODUCT_PRICING_BY_MARKET = 'product_pricing_by_market';
    case LOCAL_DOMAINS = 'local_domains';
    case COUNTRY_SPECIFIC_PAGES = 'country_specific_pages';
    case DUTIES_IMPORT_TAXES = 'duties_import_taxes';
    case EXPORT_FEATURES = 'export_features';

    // ========== AI FEATURES ==========
    case AI_FEATURES = 'ai_features';
    case AI_IMAGE_GENERATOR = 'ai_image_generator';
    case AI_BANNER_DESIGN = 'ai_banner_design';

    // ========== CUSTOMIZATION ==========
    case CUSTOM_APPS = 'custom_apps';
    case API_ACCESS = 'api_access';
    case API_RATE_LIMITS = 'api_rate_limits';
    case API_PII_ACCESS = 'api_pii_access';
    case ECOMMERCE_AUTOMATIONS = 'ecommerce_automations';
    case CHECKOUT_CUSTOMIZATION = 'checkout_customization';
    case HIGH_VOLUME_CHECKOUT = 'high_volume_checkout';
    case SHOPIFY_FUNCTIONS = 'shopify_functions';
    case CUSTOM_USER_GROUPS = 'custom_user_groups';
    case EXPANSION_STORES = 'expansion_stores';
    case DYNAMIC_FORMS = 'dynamic_forms';

    // ========== ADVANCED FEATURES ==========
    case REPORTS = 'reports';
    case ADVANCED_REPORTING = 'advanced_reporting';
    case INVENTORY_MANAGEMENT = 'inventory_management';
    case WAREHOUSE_MANAGEMENT = 'warehouse_management';
    case SUPPLIER_MODULE = 'supplier_module';
    case LOOKBOOK = 'lookbook';
    case COMBINATION_MODULE = 'combination_module';
    case PHOTO_REVIEWS = 'photo_reviews';
    case ASK_SELLER = 'ask_seller';
    case VOICE_SEARCH = 'voice_search';
    case ADVANCED_SEARCH = 'advanced_search';
    case PRODUCT_COMPARISON = 'product_comparison';
    case SET_MODULE = 'set_module';
    case TEAM_PARTS = 'team_parts';
    case AFFILIATE_MARKETING = 'affiliate_marketing';
    case COLLECTIONS_FEATURE = 'collections_feature';
    case PAYMENT_VERIFICATION_SMS = 'payment_verification_sms';
    case PAYMENT_REFUND_PANEL = 'payment_refund_panel';
    case INSTALLMENT_PAYMENT = 'installment_payment';
    case WALLET_MODULE = 'wallet_module';
    case CONSIGNMENT_SALES = 'consignment_sales';
    case LIVE_STREAMING = 'live_streaming';
    case OMNI_CHANNEL = 'omni_channel';

    // ========== COMPLIANCE & LEGAL ==========
    case COOKIE_MANAGEMENT = 'cookie_management';
    case BOT_PROTECTION = 'bot_protection';
    case FEATURE_TEST_DRIVES = 'feature_test_drives';

    // ========== FINANCE ==========
    case SHOPIFY_BALANCE = 'shopify_balance';
    case SHOPIFY_CREDIT = 'shopify_credit';
    case SHOPIFY_CAPITAL = 'shopify_capital';
    case SHOPIFY_BILL_PAY = 'shopify_bill_pay';

    // ========== PLUS EXCLUSIVE (Shopify Plus) ==========
    case SHOPIFY_COMBINED_LISTINGS = 'shopify_combined_listings';
    case SHOPIFY_PLUS_CERTIFIED_APPS = 'shopify_plus_certified_apps';
    case LAUNCHPAD = 'launchpad';

    // ========== MOBILE ==========
    case NATIVE_MOBILE_APP = 'native_mobile_app';
    case PREMIUM_MOBILE_APP = 'premium_mobile_app';
    case SMS_LOGIN = 'sms_login';

    // ========== SHOPIFY EMAIL & INBOX ==========
    case SHOPIFY_EMAIL = 'shopify_email';
    case SHOPIFY_INBOX = 'shopify_inbox';
    case SHOPIFY_FORMS = 'shopify_forms';

    public function label(): string
    {
        return match ($this) {
            // Core
            self::ONLINE_STORE => 'Online Mağaza',
            self::CHECKOUT => 'Ödeme Sistemi',
            self::UNLIMITED_PRODUCTS => 'Sınırsız Ürün',
            self::STAFF_ACCOUNTS => 'Personel Hesapları',
            self::COLLABORATOR_ACCOUNTS => 'Ortak Çalışan Hesapları',
            self::TEMPLATES_THEMES => 'Şablonlar ve Temalar',
            self::SALES_CHANNELS => 'Satış Kanalları',
            self::INVENTORY_LOCATIONS => 'Envanter Lokasyonları',
            self::ANALYTICS => 'Analitik',
            self::UNLIMITED_WEB_HOSTING => 'Sınırsız Web Hosting',
            self::CUSTOM_DOMAIN => 'Özel Alan Adı',
            self::FREE_SSL_CERTIFICATE => 'Ücretsiz SSL Sertifikası',
            self::ORGANIZATION_SETTINGS => 'Organizasyon Ayarları',

            // Payment
            self::ZERO_TRANSACTION_FEE => '%0 İşlem Ücreti',
            self::NEXT_DAY_POS => 'Ertesi Gün Sanal Pos',
            self::TRANSACTION_FEES => 'İşlem Ücretleri',
            self::TAX_PLATFORM => 'Vergi Platformu',
            self::PAYMENT_GATEWAYS => 'Ödeme Geçitleri',

            // Setup
            self::FREE_SETUP => 'Ücretsiz Kurulum',
            self::FREE_LOGO_CREATION => 'Ücretsiz Logo Oluşturma',
            self::FREE_ECOMMERCE_TRAINING => 'Ücretsiz E-Ticaret Eğitimleri',

            // Support
            self::SUPPORT_24_7 => '7/24 Destek',
            self::SUPPORT_PHONE => 'Telefon Desteği',
            self::SUPPORT_CHAT => 'Canlı Destek',
            self::SUPPORT_TICKET => 'Destek Bileti',
            self::PRIORITY_SUPPORT => 'Öncelikli Destek',
            self::ENHANCED_SUPPORT => 'Gelişmiş Destek',

            // Email
            self::CUSTOM_EMAIL_DOMAIN => 'Kurumsal E-posta',
            self::CORPORATE_EMAIL => 'Kurumsal E-posta',
            self::UNLIMITED_CONTACTS => 'Sınırsız İletişim',
            self::EMAIL_CAMPAIGNS => 'E-posta Kampanyaları',
            self::BULK_EMAIL => 'Toplu E-posta',
            self::BULK_SMS => 'Toplu SMS',
            self::ABANDONED_CHECKOUT_RECOVERY => 'Terk Edilen Sepet Kurtarma',

            // Integration
            self::E_INVOICE_INTEGRATION => 'E-Fatura Entegrasyonu',
            self::E_ARCHIVE_INTEGRATION => 'E-Arşiv Entegrasyonu',
            self::MARKETPLACE_INTEGRATIONS => 'Pazaryeri Entegrasyonları',
            self::MARKETPLACE_INTEGRATIONS_UNLIMITED => 'Sınırsız Pazaryeri Entegrasyonları',
            self::ERP_INTEGRATION => 'ERP Entegrasyonu',
            self::THIRD_PARTY_APP_INTEGRATIONS => '3. Parti Uygulama Entegrasyonları',
            self::IYS_INTEGRATION => 'İYS Entegrasyonu',

            // Design
            self::RESPONSIVE_THEMES => 'Mobil Uyumlu Temalar',
            self::MULTIPLE_THEMES => 'Çoklu Tema',
            self::PAGE_BUILDER => 'Sayfa Oluşturucu',
            self::DESIGN_WIZARD => 'Tasarım Sihirbazı',
            self::CUSTOM_DESIGN => 'Özel Tasarım',
            self::PREMIUM_DESIGN => 'Premium Tasarım',
            self::LOCAL_STOREFRONTS => 'Yerel Mağaza Ön Yüzleri',
            self::HEADLESS_STOREFRONTS => 'Headless Mağaza Ön Yüzleri',

            // Product
            self::EXCEL_PRODUCT_IMPORT => 'Excel Ürün Yükleme',
            self::BULK_PRODUCT_UPLOAD => 'Toplu Ürün Yükleme',
            self::BULK_PRODUCT_UPDATE => 'Toplu Ürün Güncelleme',
            self::PRODUCT_COLLECTIONS => 'Ürün Koleksiyonları',
            self::PRODUCT_VARIANTS => 'Ürün Varyantları',
            self::BUNDLE_PRODUCTS => 'Paket Ürün',
            self::ASSORTED_PRODUCTS => 'Asortili Ürün',
            self::PRODUCT_CUSTOMIZATION => 'Ürün Kişiselleştirme',
            self::PRODUCT_GROUPING => 'Ürün Gruplama',
            self::PRODUCT_SORTING => 'Ürün Sıralama',
            self::PRODUCT_SORTING_ADVANCED => 'Gelişmiş Ürün Sıralama',
            self::STOCK_NOTIFICATIONS => 'Stok Yenilendi Bildirimleri',
            self::PRICE_DROP_NOTIFICATIONS => 'Fiyat Düştü Bildirimleri',
            self::DYNAMIC_PRICING => 'Dinamik Fiyatlandırma',
            self::STOCKLESS_SALES => 'Stoksuz Satış',
            self::CONSCRIPTION_SALES => 'Konsinye Ürün Satışı',
            self::CROSS_SELLING => 'Çapraz Satış',
            self::CROSS_SELLING_ADVANCED => 'İleri Seviye Çapraz Satış',

            // Marketing
            self::ADVANCED_SEO => 'Gelişmiş SEO',
            self::SEO_INFRASTRUCTURE => 'SEO Altyapısı',
            self::BLOG_CREATION => 'Blog Sayfası',
            self::MARKETING_AUTOMATION => 'Pazarlama Otomasyonu',
            self::MARKETING_AUTOMATION_AI => 'Yapay Zeka Destekli Pazarlama Otomasyonu',
            self::CUSTOMER_SEGMENTATION => 'Müşteri Segmentasyonu',
            self::DISCOUNT_CODES => 'İndirim Kodları',
            self::GIFT_CARDS => 'Hediye Çeki',
            self::PRODUCT_CAMPAIGNS => 'Ürün Kampanyaları',
            self::CART_CAMPAIGNS => 'Sepet Kampanyaları',
            self::SHIPPING_CAMPAIGNS => 'Kargo Kampanyaları',
            self::CART_RECOVERY => 'Sepet Kurtarma',
            self::CART_REMINDER_AUTOMATIC => 'Otomatik Sepet Hatırlatma',
            self::CART_REMINDER_SMS => 'SMS ile Sepet Hatırlatma',
            self::REVIEW_REMINDER => 'Yorum Hatırlatma',
            self::EXIT_INTENT_POPUP => 'Site Çıkış Uyarısı',
            self::CUSTOM_CAMPAIGNS => 'Özel Kampanyalar',
            self::CAMPAIGN_WIZARD => 'Kampanya Sihirbazı',
            self::CART_ABANDONMENT => 'Sepet Terk Etme',
            self::SMS_CAMPAIGNS => 'SMS Kampanyaları',

            // Shopping
            self::WISHLIST => 'İstek Listesi',
            self::GUEST_CHECKOUT => 'Misafir Ödeme',
            self::SAVE_CART => 'Sepeti Kaydet',
            self::SHOPIFY_COLLECTIVE => 'Shopify Collective',
            self::MARKETPLACE_CONNECT => 'Pazaryeri Bağlantısı',

            // Sales Channels
            self::IN_PERSON_SELLING => 'Yüz Yüze Satış',
            self::POS_PRO => 'POS Pro',
            self::STORE_SALES => 'Mağazadan Satış',
            self::PANEL_ORDER_CREATION => 'Panelden Sipariş Oluşturma',
            self::STORE_PICKUP => 'Mağazadan Teslim Al',
            self::STORE_PAYMENT => 'Mağazada Öde',
            self::STORE_DELIVERY => 'Mağazadan Teslimat',
            self::STORE_ORDER_SHIPPING => 'Mağazadan Sipariş Gönderme',
            self::MULTI_STORE => 'Çoklu Mağaza',
            self::WHICH_STORE => 'Hangi Mağazada',

            // B2B
            self::B2B_SALES => 'B2B Satış',
            self::WHOLESALE_SALES => 'Toptan Satış',
            self::B2B_FEATURES => 'B2B Özellikleri',

            // International
            self::LANGUAGE_TRANSLATION => 'Dil Çevirisi',
            self::AUTO_TRANSLATION => 'Otomatik Çeviri',
            self::MULTI_MARKET => 'Çoklu Pazar',
            self::PRODUCT_PRICING_BY_MARKET => 'Pazara Göre Fiyatlandırma',
            self::LOCAL_DOMAINS => 'Yerel Alan Adları',
            self::COUNTRY_SPECIFIC_PAGES => 'Ülkeye Özel Sayfa',
            self::DUTIES_IMPORT_TAXES => 'Gümrük ve İthalat Vergileri',
            self::EXPORT_FEATURES => 'E-İhracat Özellikleri',

            // AI
            self::AI_FEATURES => 'Yapay Zeka Özellikleri',
            self::AI_IMAGE_GENERATOR => 'AI Görsel Oluşturucu',
            self::AI_BANNER_DESIGN => 'AI Banner Tasarım Asistanı',

            // Customization
            self::CUSTOM_APPS => 'Özel Uygulamalar',
            self::API_ACCESS => 'API Erişimi',
            self::API_RATE_LIMITS => 'API Hız Limitleri',
            self::API_PII_ACCESS => 'API PII Erişimi',
            self::ECOMMERCE_AUTOMATIONS => 'E-Ticaret Otomasyonları',
            self::CHECKOUT_CUSTOMIZATION => 'Ödeme Özelleştirme',
            self::HIGH_VOLUME_CHECKOUT => 'Yüksek Hacimli Ödeme',
            self::SHOPIFY_FUNCTIONS => 'Shopify Fonksiyonları',
            self::CUSTOM_USER_GROUPS => 'Özel Kullanıcı Grupları',
            self::EXPANSION_STORES => 'Genişletme Mağazaları',
            self::DYNAMIC_FORMS => 'Dinamik Form',

            // Advanced
            self::REPORTS => 'Raporlar',
            self::ADVANCED_REPORTING => 'Gelişmiş Raporlama',
            self::INVENTORY_MANAGEMENT => 'Envanter Yönetimi',
            self::WAREHOUSE_MANAGEMENT => 'Depo Yönetim Sistemi',
            self::SUPPLIER_MODULE => 'Tedarikçi Modülü',
            self::LOOKBOOK => 'Lookbook',
            self::COMBINATION_MODULE => 'Kombin Modülü',
            self::PHOTO_REVIEWS => 'Fotoğraflı Ürün Yorum',
            self::ASK_SELLER => 'Satıcıya Sor',
            self::VOICE_SEARCH => 'Sesli Arama',
            self::ADVANCED_SEARCH => 'Gelişmiş Arama Sistemi',
            self::PRODUCT_COMPARISON => 'Ürün Karşılaştırma',
            self::SET_MODULE => 'Takım Modülü',
            self::TEAM_PARTS => 'Takım Parçaları',
            self::AFFILIATE_MARKETING => 'Affiliate Marketing',
            self::COLLECTIONS_FEATURE => 'Koleksiyon Özelliği',
            self::PAYMENT_VERIFICATION_SMS => 'Kapıda Ödeme SMS Doğrulama',
            self::PAYMENT_REFUND_PANEL => 'Panelden Ödeme İade',
            self::INSTALLMENT_PAYMENT => 'Parçalı Ödeme',
            self::WALLET_MODULE => 'Cüzdan Modülü',
            self::CONSIGNMENT_SALES => 'Konsinye Ürün Satışı',
            self::LIVE_STREAMING => 'Canlı Yayın',
            self::OMNI_CHANNEL => 'Omni Channel Modülü',

            // Compliance
            self::COOKIE_MANAGEMENT => 'Çerez Yönetimi',
            self::BOT_PROTECTION => 'Bot Koruması',
            self::FEATURE_TEST_DRIVES => 'Özellik Test Sürüşleri',

            // Finance
            self::SHOPIFY_BALANCE => 'Shopify Balance',
            self::SHOPIFY_CREDIT => 'Shopify Credit',
            self::SHOPIFY_CAPITAL => 'Shopify Capital',
            self::SHOPIFY_BILL_PAY => 'Shopify Bill Pay',

            // Plus Exclusive
            self::SHOPIFY_COMBINED_LISTINGS => 'Shopify Combined Listings',
            self::SHOPIFY_PLUS_CERTIFIED_APPS => 'Shopify Plus Certified Apps',
            self::LAUNCHPAD => 'Launchpad',

            // Mobile
            self::NATIVE_MOBILE_APP => 'Native Mobil Uygulama',
            self::PREMIUM_MOBILE_APP => 'Özel Native Premium Mobil Uygulama',
            self::SMS_LOGIN => 'Telefon (SMS) ile Giriş',

            // Shopify Specific
            self::SHOPIFY_EMAIL => 'Shopify Email',
            self::SHOPIFY_INBOX => 'Shopify Inbox',
            self::SHOPIFY_FORMS => 'Shopify Forms',
        };
    }

    public function category(): string
    {
        return match ($this) {
            // Core
            self::ONLINE_STORE, self::CHECKOUT, self::UNLIMITED_PRODUCTS, self::STAFF_ACCOUNTS,
            self::COLLABORATOR_ACCOUNTS, self::TEMPLATES_THEMES, self::SALES_CHANNELS,
            self::INVENTORY_LOCATIONS, self::ANALYTICS, self::UNLIMITED_WEB_HOSTING,
            self::CUSTOM_DOMAIN, self::FREE_SSL_CERTIFICATE, self::ORGANIZATION_SETTINGS => 'core',

            // Payment
            self::ZERO_TRANSACTION_FEE, self::NEXT_DAY_POS, self::TRANSACTION_FEES,
            self::TAX_PLATFORM, self::PAYMENT_GATEWAYS => 'payment',

            // Setup
            self::FREE_SETUP, self::FREE_LOGO_CREATION, self::FREE_ECOMMERCE_TRAINING => 'onboarding',

            // Support
            self::SUPPORT_24_7, self::SUPPORT_PHONE, self::SUPPORT_CHAT, self::SUPPORT_TICKET,
            self::PRIORITY_SUPPORT, self::ENHANCED_SUPPORT => 'support',

            // Email
            self::CUSTOM_EMAIL_DOMAIN, self::CORPORATE_EMAIL, self::UNLIMITED_CONTACTS,
            self::EMAIL_CAMPAIGNS, self::BULK_EMAIL, self::BULK_SMS, self::ABANDONED_CHECKOUT_RECOVERY,
            self::SHOPIFY_EMAIL, self::SHOPIFY_INBOX, self::SHOPIFY_FORMS => 'communication',

            // Integration
            self::E_INVOICE_INTEGRATION, self::E_ARCHIVE_INTEGRATION, self::MARKETPLACE_INTEGRATIONS,
            self::MARKETPLACE_INTEGRATIONS_UNLIMITED, self::ERP_INTEGRATION,
            self::THIRD_PARTY_APP_INTEGRATIONS, self::IYS_INTEGRATION, self::MARKETPLACE_CONNECT => 'integration',

            // Design
            self::RESPONSIVE_THEMES, self::MULTIPLE_THEMES, self::PAGE_BUILDER, self::DESIGN_WIZARD,
            self::CUSTOM_DESIGN, self::PREMIUM_DESIGN, self::LOCAL_STOREFRONTS, self::HEADLESS_STOREFRONTS => 'design',

            // Product
            self::EXCEL_PRODUCT_IMPORT, self::BULK_PRODUCT_UPLOAD, self::BULK_PRODUCT_UPDATE,
            self::PRODUCT_COLLECTIONS, self::PRODUCT_VARIANTS, self::BUNDLE_PRODUCTS,
            self::ASSORTED_PRODUCTS, self::PRODUCT_CUSTOMIZATION, self::PRODUCT_GROUPING,
            self::PRODUCT_SORTING, self::PRODUCT_SORTING_ADVANCED, self::STOCK_NOTIFICATIONS,
            self::PRICE_DROP_NOTIFICATIONS, self::DYNAMIC_PRICING, self::STOCKLESS_SALES,
            self::CONSCRIPTION_SALES, self::CROSS_SELLING, self::CROSS_SELLING_ADVANCED => 'product',

            // Marketing
            self::ADVANCED_SEO, self::SEO_INFRASTRUCTURE, self::BLOG_CREATION,
            self::MARKETING_AUTOMATION, self::MARKETING_AUTOMATION_AI, self::CUSTOMER_SEGMENTATION,
            self::DISCOUNT_CODES, self::GIFT_CARDS, self::PRODUCT_CAMPAIGNS, self::CART_CAMPAIGNS,
            self::SHIPPING_CAMPAIGNS, self::CART_RECOVERY, self::CART_REMINDER_AUTOMATIC,
            self::CART_REMINDER_SMS, self::REVIEW_REMINDER, self::EXIT_INTENT_POPUP,
            self::CUSTOM_CAMPAIGNS, self::CAMPAIGN_WIZARD, self::CART_ABANDONMENT,
            self::SMS_CAMPAIGNS, self::AFFILIATE_MARKETING, self::COLLECTIONS_FEATURE => 'marketing',

            // Shopping
            self::WISHLIST, self::GUEST_CHECKOUT, self::SAVE_CART, self::SHOPIFY_COLLECTIVE => 'shopping',

            // Sales Channels
            self::IN_PERSON_SELLING, self::POS_PRO, self::STORE_SALES, self::PANEL_ORDER_CREATION,
            self::STORE_PICKUP, self::STORE_PAYMENT, self::STORE_DELIVERY, self::STORE_ORDER_SHIPPING,
            self::MULTI_STORE, self::WHICH_STORE => 'sales_channels',

            // B2B
            self::B2B_SALES, self::WHOLESALE_SALES, self::B2B_FEATURES => 'b2b',

            // International
            self::LANGUAGE_TRANSLATION, self::AUTO_TRANSLATION, self::MULTI_MARKET,
            self::PRODUCT_PRICING_BY_MARKET, self::LOCAL_DOMAINS, self::COUNTRY_SPECIFIC_PAGES,
            self::DUTIES_IMPORT_TAXES, self::EXPORT_FEATURES => 'international',

            // AI
            self::AI_FEATURES, self::AI_IMAGE_GENERATOR, self::AI_BANNER_DESIGN => 'ai',

            // Customization
            self::CUSTOM_APPS, self::API_ACCESS, self::API_RATE_LIMITS, self::API_PII_ACCESS,
            self::ECOMMERCE_AUTOMATIONS, self::CHECKOUT_CUSTOMIZATION, self::HIGH_VOLUME_CHECKOUT,
            self::SHOPIFY_FUNCTIONS, self::CUSTOM_USER_GROUPS, self::EXPANSION_STORES,
            self::DYNAMIC_FORMS => 'customization',

            // Advanced
            self::REPORTS, self::ADVANCED_REPORTING, self::INVENTORY_MANAGEMENT,
            self::WAREHOUSE_MANAGEMENT, self::SUPPLIER_MODULE, self::LOOKBOOK,
            self::COMBINATION_MODULE, self::PHOTO_REVIEWS, self::ASK_SELLER,
            self::VOICE_SEARCH, self::ADVANCED_SEARCH, self::PRODUCT_COMPARISON,
            self::SET_MODULE, self::TEAM_PARTS, self::PAYMENT_VERIFICATION_SMS,
            self::PAYMENT_REFUND_PANEL, self::INSTALLMENT_PAYMENT, self::WALLET_MODULE,
            self::CONSIGNMENT_SALES, self::LIVE_STREAMING, self::OMNI_CHANNEL => 'advanced',

            // Compliance
            self::COOKIE_MANAGEMENT, self::BOT_PROTECTION, self::FEATURE_TEST_DRIVES => 'compliance',

            // Finance
            self::SHOPIFY_BALANCE, self::SHOPIFY_CREDIT, self::SHOPIFY_CAPITAL,
            self::SHOPIFY_BILL_PAY => 'finance',

            // Plus Exclusive
            self::SHOPIFY_COMBINED_LISTINGS, self::SHOPIFY_PLUS_CERTIFIED_APPS,
            self::LAUNCHPAD => 'plus_exclusive',

            // Mobile
            self::NATIVE_MOBILE_APP, self::PREMIUM_MOBILE_APP, self::SMS_LOGIN => 'mobile',
        };
    }
}
