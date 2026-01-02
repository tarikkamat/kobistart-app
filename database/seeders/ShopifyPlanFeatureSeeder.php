<?php

namespace Database\Seeders;

use App\Enums\FeatureKey;
use App\Models\Feature;
use App\Models\Plan;
use App\Models\PlanFeature;
use Illuminate\Database\Seeder;

class ShopifyPlanFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tüm planlarda ortak özellikler (Basic'de başlayan)
        $commonFeatures = [
            ['key' => FeatureKey::ONLINE_STORE->value, 'value' => 'Full-featured', 'platform_label' => 'Online store'],
            [
                'key' => FeatureKey::CHECKOUT->value, 'value' => 'true',
                'platform_label' => "World's best-converting checkout"
            ],
            [
                'key' => FeatureKey::UNLIMITED_PRODUCTS->value, 'value' => 'true',
                'platform_label' => 'Unlimited products'
            ],
            [
                'key' => FeatureKey::COLLABORATOR_ACCOUNTS->value, 'value' => 'true',
                'platform_label' => 'Collaborator accounts'
            ],
            [
                'key' => FeatureKey::TEMPLATES_THEMES->value, 'value' => 'true',
                'platform_label' => 'Templates and themes'
            ],
            ['key' => FeatureKey::SALES_CHANNELS->value, 'value' => 'true', 'platform_label' => 'Sales channels'],
            [
                'key' => FeatureKey::SHOPIFY_COLLECTIVE->value, 'value' => 'true',
                'platform_label' => 'Shopify Collective'
            ],
            ['key' => FeatureKey::ANALYTICS->value, 'value' => 'true', 'platform_label' => 'Analytics'],
            ['key' => FeatureKey::SUPPORT_24_7->value, 'value' => 'true', 'platform_label' => '24/7 support'],
            ['key' => FeatureKey::SUPPORT_CHAT->value, 'value' => 'Live chat', 'platform_label' => '24/7 support'],
            [
                'key' => FeatureKey::UNLIMITED_WEB_HOSTING->value, 'value' => 'true',
                'platform_label' => 'Unlimited web hosting'
            ],
            ['key' => FeatureKey::CUSTOM_DOMAIN->value, 'value' => 'true', 'platform_label' => 'Custom domain'],
            [
                'key' => FeatureKey::FREE_SSL_CERTIFICATE->value, 'value' => 'true',
                'platform_label' => 'Free SSL certificate'
            ],
            [
                'key' => FeatureKey::ORGANIZATION_SETTINGS->value, 'value' => 'true',
                'platform_label' => 'Organization settings'
            ],
            ['key' => FeatureKey::IN_PERSON_SELLING->value, 'value' => 'true', 'platform_label' => 'In-person selling'],
            [
                'key' => FeatureKey::UNLIMITED_CONTACTS->value, 'value' => 'true',
                'platform_label' => 'Unlimited contacts'
            ],
            [
                'key' => FeatureKey::CUSTOMER_SEGMENTATION->value, 'value' => 'true',
                'platform_label' => 'Customer segmentation'
            ],
            ['key' => FeatureKey::SHOPIFY_EMAIL->value, 'value' => 'true', 'platform_label' => 'Shopify Email'],
            ['key' => FeatureKey::SHOPIFY_FORMS->value, 'value' => 'true', 'platform_label' => 'Shopify Forms'],
            ['key' => FeatureKey::SHOPIFY_INBOX->value, 'value' => 'true', 'platform_label' => 'Shopify Inbox'],
            [
                'key' => FeatureKey::MARKETING_AUTOMATION->value, 'value' => 'true',
                'platform_label' => 'Marketing automation'
            ],
            [
                'key' => FeatureKey::ABANDONED_CHECKOUT_RECOVERY->value, 'value' => 'true',
                'platform_label' => 'Abandoned checkout recovery'
            ],
            ['key' => FeatureKey::DISCOUNT_CODES->value, 'value' => 'true', 'platform_label' => 'Discount codes'],
            ['key' => FeatureKey::GIFT_CARDS->value, 'value' => 'true', 'platform_label' => 'Gift cards'],
            [
                'key' => FeatureKey::MARKETPLACE_CONNECT->value, 'value' => 'true',
                'platform_label' => 'Shopify Marketplace Connect'
            ],
            [
                'key' => FeatureKey::THIRD_PARTY_APP_INTEGRATIONS->value, 'value' => 'true',
                'platform_label' => '3rd party app integrations'
            ],
            [
                'key' => FeatureKey::ECOMMERCE_AUTOMATIONS->value, 'value' => 'true',
                'platform_label' => 'Ecommerce automations'
            ],
            [
                'key' => FeatureKey::LANGUAGE_TRANSLATION->value, 'value' => 'true',
                'platform_label' => 'Language translation'
            ],
            [
                'key' => FeatureKey::MULTI_MARKET->value, 'value' => 'true',
                'platform_label' => 'Localized selling with custom markets'
            ],
            [
                'key' => FeatureKey::PRODUCT_PRICING_BY_MARKET->value, 'value' => 'true',
                'platform_label' => 'Product pricing by market'
            ],
            ['key' => FeatureKey::LOCAL_DOMAINS->value, 'value' => 'true', 'platform_label' => 'Local domains'],
            [
                'key' => FeatureKey::DUTIES_IMPORT_TAXES->value, 'value' => 'true',
                'platform_label' => 'Duties and import taxes'
            ],
            [
                'key' => FeatureKey::SHOPIFY_BALANCE->value, 'value' => '2.29% APY',
                'platform_label' => 'Shopify Balance'
            ],
            ['key' => FeatureKey::SHOPIFY_CREDIT->value, 'value' => 'true', 'platform_label' => 'Shopify Credit'],
            ['key' => FeatureKey::SHOPIFY_CAPITAL->value, 'value' => 'true', 'platform_label' => 'Shopify Capital'],
            ['key' => FeatureKey::SHOPIFY_BILL_PAY->value, 'value' => 'true', 'platform_label' => 'Shopify Bill Pay'],
            [
                'key' => FeatureKey::TAX_PLATFORM->value, 'value' => 'Additional paid service',
                'platform_label' => 'Tax Platform'
            ],
            [
                'key' => FeatureKey::POS_PRO->value, 'value' => '$89/mo',
                'platform_label' => 'Shopify POS Pro (per location)'
            ],
            [
                'key' => FeatureKey::INVENTORY_LOCATIONS->value, 'value' => '10',
                'platform_label' => 'Inventory locations'
            ],
            [
                'key' => FeatureKey::API_ACCESS->value, 'value' => 'Limited data access (no PII)',
                'platform_label' => 'Custom apps'
            ],
            ['key' => FeatureKey::API_RATE_LIMITS->value, 'value' => 'Standard', 'platform_label' => 'API rate limits'],
            [
                'key' => FeatureKey::HEADLESS_STOREFRONTS->value, 'value' => '1',
                'platform_label' => 'Headless storefronts'
            ],
        ];

        // Basic (plan_id: 1)
        $basicFeatures = [
            [
                'key' => FeatureKey::STAFF_ACCOUNTS->value, 'value' => 'false',
                'platform_label' => 'Additional staff accounts'
            ],
            ['key' => FeatureKey::TRANSACTION_FEES->value, 'value' => '2%', 'platform_label' => 'Transaction fees'],
        ];
        $this->attachFeatures(1, array_merge($commonFeatures, $basicFeatures));

        // Grow (plan_id: 2)
        $growFeatures = [
            [
                'key' => FeatureKey::STAFF_ACCOUNTS->value, 'value' => '5',
                'platform_label' => 'Additional staff accounts'
            ],
            ['key' => FeatureKey::TRANSACTION_FEES->value, 'value' => '1%', 'platform_label' => 'Transaction fees'],
            ['key' => FeatureKey::API_ACCESS->value, 'value' => 'Full data access', 'platform_label' => 'Custom apps'],
        ];
        $this->attachFeatures(2, array_merge($commonFeatures, $growFeatures));

        // Advanced (plan_id: 3)
        $advancedFeatures = [
            [
                'key' => FeatureKey::STAFF_ACCOUNTS->value, 'value' => '15',
                'platform_label' => 'Additional staff accounts'
            ],
            ['key' => FeatureKey::TRANSACTION_FEES->value, 'value' => '0.6%', 'platform_label' => 'Transaction fees'],
            [
                'key' => FeatureKey::ENHANCED_SUPPORT->value, 'value' => 'Enhanced live chat',
                'platform_label' => '24/7 support'
            ],
            ['key' => FeatureKey::API_ACCESS->value, 'value' => 'Full data access', 'platform_label' => 'Custom apps'],
            [
                'key' => FeatureKey::API_RATE_LIMITS->value, 'value' => 'Up to 2x on select APIs',
                'platform_label' => 'API rate limits'
            ],
            ['key' => FeatureKey::LOCAL_STOREFRONTS->value, 'value' => 'true', 'platform_label' => 'Local storefronts'],
            [
                'key' => FeatureKey::SHOPIFY_BALANCE->value, 'value' => '2.29% APY',
                'platform_label' => 'Shopify Balance'
            ],
        ];
        $this->attachFeatures(3, array_merge($commonFeatures, $advancedFeatures));

        // Plus (plan_id: 4)
        $plusFeatures = [
            [
                'key' => FeatureKey::STAFF_ACCOUNTS->value, 'value' => 'Unlimited',
                'platform_label' => 'Additional staff accounts'
            ],
            ['key' => FeatureKey::TRANSACTION_FEES->value, 'value' => '0.2%', 'platform_label' => 'Transaction fees'],
            [
                'key' => FeatureKey::PRIORITY_SUPPORT->value, 'value' => 'Priority support by phone or live chat',
                'platform_label' => '24/7 support'
            ],
            [
                'key' => FeatureKey::INVENTORY_LOCATIONS->value, 'value' => '200',
                'platform_label' => 'Inventory locations'
            ],
            ['key' => FeatureKey::API_ACCESS->value, 'value' => 'Full data access', 'platform_label' => 'Custom apps'],
            [
                'key' => FeatureKey::API_RATE_LIMITS->value, 'value' => 'Up to 500% higher API call limits',
                'platform_label' => 'Exclusive API access and endpoints'
            ],
            [
                'key' => FeatureKey::HEADLESS_STOREFRONTS->value, 'value' => '25',
                'platform_label' => 'Headless storefronts'
            ],
            ['key' => FeatureKey::LOCAL_STOREFRONTS->value, 'value' => 'true', 'platform_label' => 'Local storefronts'],
            [
                'key' => FeatureKey::SHOPIFY_BALANCE->value, 'value' => '3.32% APY',
                'platform_label' => 'Shopify Balance'
            ],
            [
                'key' => FeatureKey::POS_PRO->value, 'value' => '20 locations included',
                'platform_label' => 'Shopify POS Pro (per location)'
            ],
            // Plus Exclusive Features
            [
                'key' => FeatureKey::CHECKOUT_CUSTOMIZATION->value, 'value' => 'true',
                'platform_label' => 'Checkout customizations'
            ],
            [
                'key' => FeatureKey::HIGH_VOLUME_CHECKOUT->value, 'value' => 'true',
                'platform_label' => 'High-volume checkout'
            ],
            ['key' => FeatureKey::B2B_FEATURES->value, 'value' => 'true', 'platform_label' => 'B2B on Shopify'],
            [
                'key' => FeatureKey::SHOPIFY_COMBINED_LISTINGS->value, 'value' => 'true',
                'platform_label' => 'Shopify Combined Listings'
            ],
            ['key' => FeatureKey::EXPANSION_STORES->value, 'value' => '9', 'platform_label' => 'Free expansion stores'],
            ['key' => FeatureKey::BOT_PROTECTION->value, 'value' => 'true', 'platform_label' => 'Bot protection'],
            [
                'key' => FeatureKey::FEATURE_TEST_DRIVES->value, 'value' => 'true',
                'platform_label' => 'Feature test drives'
            ],
            ['key' => FeatureKey::LAUNCHPAD->value, 'value' => 'true', 'platform_label' => 'Launchpad'],
            [
                'key' => FeatureKey::SHOPIFY_FUNCTIONS->value, 'value' => 'true',
                'platform_label' => 'Custom app built with Shopify Functions'
            ],
            [
                'key' => FeatureKey::CUSTOM_USER_GROUPS->value, 'value' => 'true',
                'platform_label' => 'Custom user groups'
            ],
            [
                'key' => FeatureKey::SHOPIFY_PLUS_CERTIFIED_APPS->value, 'value' => 'true',
                'platform_label' => 'Shopify Plus Certified App Partners'
            ],
        ];
        $this->attachFeatures(4, array_merge($commonFeatures, $plusFeatures));
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
                    'is_included' => $featureData['value'] !== 'false' && $featureData['value'] !== false,
                    'platform_label' => $featureData['platform_label'] ?? null,
                ]
            );
        }
    }
}
