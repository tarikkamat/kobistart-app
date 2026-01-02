<?php

namespace App\Actions\Wizard;

use App\Models\PlanPrice;
use App\Models\Platform;
use Illuminate\Database\Eloquent\Collection;

class PrepareAgentPrompt
{
    /**
     * Prepare the agent prompt with wizard data and platform information.
     *
     * @param  array<string, mixed>  $wizardData
     * @param  Collection<int, Platform>  $platforms
     * @return string
     */
    public function execute(array $wizardData, Collection $platforms): string
    {
        // Format platforms data for agent
        $platformsData = $platforms->map(function (Platform $platform) {
            $plans = $platform->plans->map(function ($plan) {
                $prices = $plan->planPrices->map(function (PlanPrice $price) {
                    return [
                        'period' => $price->period,
                        'original_price' => $price->original_price,
                        'discounted_price' => $price->discounted_price,
                        'currency' => $price->currency,
                        'is_monthly_payment' => $price->is_monthly_payment,
                        'monthly_cost' => $this->calculateMonthlyPrice($price),
                    ];
                })->toArray();

                $features = $plan->planFeatures->map(function ($planFeature) {
                    return [
                        'feature_id' => $planFeature->feature_id,
                        'feature_key' => $planFeature->feature->key ?? null,
                        'feature_name' => $planFeature->feature->name ?? null,
                        'feature_category' => $planFeature->feature->category ?? null,
                        'value' => $planFeature->value,
                        'is_included' => $planFeature->is_included,
                        'platform_label' => $planFeature->platform_label,
                    ];
                })->toArray();

                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'slug' => $plan->slug,
                    'order' => $plan->order,
                    'prices' => $prices,
                    'features' => $features,
                ];
            })->toArray();

            return [
                'id' => $platform->id,
                'name' => $platform->name,
                'description' => $platform->description,
                'slug' => $platform->slug,
                'url' => $platform->url,
                'logo' => $platform->logo,
                'dark_logo' => $platform->dark_logo,
                'color' => $platform->color,
                'is_local' => $platform->is_local,
                'plans' => $plans,
            ];
        })->toArray();

        // Build the prompt
        $prompt = "Aşağıdaki kullanıcı bilgileri ve platform verilerine göre e-ticaret platform önerisi yap.\n\n";
        $prompt .= "KULLANICI BİLGİLERİ:\n";
        $prompt .= json_encode($wizardData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";
        $prompt .= "PLATFORM VERİLERİ:\n";
        $prompt .= json_encode($platformsData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";
        $prompt .= "Lütfen analiz yap ve JSON formatında yanıt ver. Yanıt formatı şu şekilde olmalı:\n";
        $prompt .= "{\n";
        $prompt .= "  \"primary\": {\n";
        $prompt .= "    \"platform\": {\"id\": number, \"name\": string, \"slug\": string, ...},\n";
        $prompt .= "    \"recommendedPlan\": {\"id\": number, \"name\": string, \"slug\": string, \"monthlyPrice\": number, \"currency\": string},\n";
        $prompt .= "    \"score\": number (0-100),\n";
        $prompt .= "    \"confidence\": \"high\" | \"medium\" | \"low\",\n";
        $prompt .= "    \"reasons\": string[],\n";
        $prompt .= "    \"warnings\": string[],\n";
        $prompt .= "    \"matchBreakdown\": {...}\n";
        $prompt .= "  },\n";
        $prompt .= "  \"secondary\": {...},\n";
        $prompt .= "  \"alternativeScenarios\": [...],\n";
        $prompt .= "  \"insights\": {...}\n";
        $prompt .= "}\n\n";
        $prompt .= "Tüm metinler Türkçe olmalı. Platform ID'leri veritabanındaki gerçek ID'ler olmalı.";

        return $prompt;
    }

    /**
     * Calculate monthly price from plan price.
     *
     * @param  PlanPrice  $planPrice
     * @return float
     */
    private function calculateMonthlyPrice(PlanPrice $planPrice): float
    {
        $price = $planPrice->discounted_price ?? $planPrice->original_price;

        if ($planPrice->is_monthly_payment) {
            return (float) $price;
        }

        // Convert yearly to monthly
        if ($planPrice->period === 'yearly') {
            return (float) ($price / 12);
        }

        if ($planPrice->period === 'two_yearly') {
            return (float) ($price / 24);
        }

        // Default to monthly if period is monthly or unknown
        return (float) $price;
    }
}

