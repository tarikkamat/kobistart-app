<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PlanPrice;

class PlanPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planPrices = [
            // Shopify Basic (plan_id: 1) - Shopify uses monthly payment pricing for yearly plans
            [
                'plan_id' => 1,
                'period' => 'monthly',
                'original_price' => 32.00,
                'discounted_price' => 27.00,
                'currency' => 'USD',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 1,
                'period' => 'yearly',
                'original_price' => 24.00,
                'discounted_price' => 19.00,
                'currency' => 'USD',
                'is_monthly_payment' => true, // Yearly plan shows monthly payment amount
            ],

            // Shopify Grow (plan_id: 2) - Shopify uses monthly payment pricing for yearly plans
            [
                'plan_id' => 2,
                'period' => 'monthly',
                'original_price' => 92.00,
                'discounted_price' => 72.00,
                'currency' => 'USD',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 2,
                'period' => 'yearly',
                'original_price' => 69.00,
                'discounted_price' => 54.00,
                'currency' => 'USD',
                'is_monthly_payment' => true, // Yearly plan shows monthly payment amount
            ],

            // Shopify Advanced (plan_id: 3) - Shopify uses monthly payment pricing for yearly plans
            [
                'plan_id' => 3,
                'period' => 'monthly',
                'original_price' => 399.00,
                'discounted_price' => null,
                'currency' => 'USD',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 3,
                'period' => 'yearly',
                'original_price' => 299.00,
                'discounted_price' => null,
                'currency' => 'USD',
                'is_monthly_payment' => true, // Yearly plan shows monthly payment amount
            ],

            // Shopify Plus (plan_id: 4) - Shopify uses monthly payment pricing for yearly plans
            [
                'plan_id' => 4,
                'period' => 'monthly',
                'original_price' => 2300.00,
                'discounted_price' => null,
                'currency' => 'USD',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 4,
                'period' => 'yearly',
                'original_price' => 2300.00,
                'discounted_price' => null,
                'currency' => 'USD',
                'is_monthly_payment' => true, // Yearly plan shows monthly payment amount
            ],

            // Ticimax Advantage (plan_id: 5) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 5,
                'period' => 'monthly',
                'original_price' => 2041.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 5,
                'period' => 'yearly',
                'original_price' => 63840.00,
                'discounted_price' => 24900.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
            [
                'plan_id' => 5,
                'period' => 'two_yearly',
                'original_price' => 115162.00,
                'discounted_price' => 49000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Two yearly plan shows total price
            ],

            // Ticimax Premier (plan_id: 6) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 6,
                'period' => 'monthly',
                'original_price' => 3708.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 6,
                'period' => 'yearly',
                'original_price' => 79840.00,
                'discounted_price' => 44900.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
            [
                'plan_id' => 6,
                'period' => 'two_yearly',
                'original_price' => 153562.00,
                'discounted_price' => 89000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Two yearly plan shows total price
            ],

            // Ticimax Advanced (plan_id: 7) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 7,
                'period' => 'monthly',
                'original_price' => 4958.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 7,
                'period' => 'yearly',
                'original_price' => 119840.00,
                'discounted_price' => 59900.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
            [
                'plan_id' => 7,
                'period' => 'two_yearly',
                'original_price' => 230362.00,
                'discounted_price' => 119000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Two yearly plan shows total price
            ],

            // Ticimax Advance Plus (plan_id: 8) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 8,
                'period' => 'monthly',
                'original_price' => 5791.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 8,
                'period' => 'yearly',
                'original_price' => 143840.00,
                'discounted_price' => 69900.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
            [
                'plan_id' => 8,
                'period' => 'two_yearly',
                'original_price' => 268762.00,
                'discounted_price' => 139000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Two yearly plan shows total price
            ],

            // Ticimax Prestige (plan_id: 9) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 9,
                'period' => 'monthly',
                'original_price' => 11208.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 9,
                'period' => 'yearly',
                'original_price' => 429000.00,
                'discounted_price' => 129000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
            [
                'plan_id' => 9,
                'period' => 'two_yearly',
                'original_price' => 896000.00,
                'discounted_price' => 269000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Two yearly plan shows total price
            ],

            // Ticimax Royal (plan_id: 10) - Ticimax uses total price for yearly plans
            [
                'plan_id' => 10,
                'period' => 'monthly',
                'original_price' => 49916.00,
                'discounted_price' => null,
                'currency' => 'TRY',
                'is_monthly_payment' => true,
            ],
            [
                'plan_id' => 10,
                'period' => 'yearly',
                'original_price' => 799000.00,
                'discounted_price' => 599000.00,
                'currency' => 'TRY',
                'is_monthly_payment' => false, // Yearly plan shows total price
            ],
        ];

        foreach ($planPrices as $planPrice) {
            PlanPrice::firstOrCreate(
                [
                    'plan_id' => $planPrice['plan_id'],
                    'period' => $planPrice['period'],
                ],
                $planPrice
            );
        }
    }
}
