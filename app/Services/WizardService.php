<?php

namespace App\Services;

use App\Models\PlanPrice;
use App\Models\Platform;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class WizardService
{
    /**
     * Prepare the agent prompt with wizard data and platform information.
     *
     * @param array<string, mixed> $wizardData
     * @param Collection<int, Platform> $platforms
     * @return string
     */
    public function prepareAgentPrompt(array $wizardData, Collection $platforms): string
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
        $prompt .= json_encode($wizardData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n\n";
        $prompt .= "PLATFORM VERİLERİ:\n";
        $prompt .= json_encode($platformsData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n\n";
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
     * Format agent response for frontend.
     *
     * @param string $agentResponse
     * @param Collection<int, Platform> $platforms
     * @return array<string, mixed>
     */
    public function formatAgentResponse(string $agentResponse, Collection $platforms): array
    {
        try {
            // Try to extract JSON from response (might contain markdown code blocks)
            $json = $this->extractJsonFromResponse($agentResponse);
            
            if (!$json) {
                throw new \Exception('No valid JSON found in agent response');
            }

            $data = json_decode($json, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid JSON: ' . json_last_error_msg());
            }

            // Map platform IDs to actual platform data
            $platformsMap = $platforms->keyBy('id');

            // Format primary recommendation
            if (isset($data['primary'])) {
                $data['primary'] = $this->formatRecommendation($data['primary'], $platformsMap);
            }

            // Format secondary recommendation
            if (isset($data['secondary'])) {
                $data['secondary'] = $this->formatRecommendation($data['secondary'], $platformsMap);
            }

            // Format alternative scenarios
            if (isset($data['alternativeScenarios']) && is_array($data['alternativeScenarios'])) {
                foreach ($data['alternativeScenarios'] as &$scenario) {
                    if (isset($scenario['newRecommendation']['platform'])) {
                        $platformId = $scenario['newRecommendation']['platform']['id'] ?? null;
                        if ($platformId && $platformsMap->has($platformId)) {
                            $scenario['newRecommendation']['platform'] = $this->formatPlatformData(
                                $platformsMap->get($platformId)
                            );
                        }
                    }
                }
            }

            return $data;
        } catch (\Exception $e) {
            Log::error('Failed to format agent response', [
                'error' => $e->getMessage(),
                'response' => $agentResponse,
            ]);

            throw $e;
        }
    }

    /**
     * Calculate monthly price from plan price.
     *
     * @param PlanPrice $planPrice
     * @return float
     */
    public function calculateMonthlyPrice(PlanPrice $planPrice): float
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

    /**
     * Extract JSON from agent response (might be wrapped in markdown code blocks).
     *
     * @param string $response
     * @return string|null
     */
    private function extractJsonFromResponse(string $response): ?string
    {
        // Remove any leading/trailing whitespace
        $response = trim($response);

        // Try to find JSON in markdown code blocks (```json or ```)
        // Use non-greedy matching and look for balanced braces
        if (preg_match('/```(?:json)?\s*(\{(?:[^{}]|(?1))*+\})\s*```/s', $response, $matches)) {
            $json = trim($matches[1]);
            // Validate it's valid JSON
            if (json_decode($json) !== null) {
                return $json;
            }
        }

        // Try simpler pattern for code blocks (fallback)
        if (preg_match('/```(?:json)?\s*(\{[\s\S]*?\})\s*```/s', $response, $matches)) {
            $json = trim($matches[1]);
            // Try to find the complete JSON by counting braces
            $json = $this->extractCompleteJson($json);
            if ($json && json_decode($json) !== null) {
                return $json;
            }
        }

        // Try to find JSON object directly (look for first { and last })
        $firstBrace = strpos($response, '{');
        if ($firstBrace !== false) {
            // Find the matching closing brace
            $json = $this->extractCompleteJson(substr($response, $firstBrace));
            if ($json && json_decode($json) !== null) {
                return $json;
            }
        }

        return null;
    }

    /**
     * Extract complete JSON by finding matching braces.
     *
     * @param string $text
     * @return string|null
     */
    private function extractCompleteJson(string $text): ?string
    {
        $text = trim($text);
        if (empty($text) || $text[0] !== '{') {
            return null;
        }

        $braceCount = 0;
        $inString = false;
        $escapeNext = false;
        $length = strlen($text);

        for ($i = 0; $i < $length; $i++) {
            $char = $text[$i];

            if ($escapeNext) {
                $escapeNext = false;
                continue;
            }

            if ($char === '\\') {
                $escapeNext = true;
                continue;
            }

            if ($char === '"' && !$escapeNext) {
                $inString = !$inString;
                continue;
            }

            if (!$inString) {
                if ($char === '{') {
                    $braceCount++;
                } elseif ($char === '}') {
                    $braceCount--;
                    if ($braceCount === 0) {
                        return substr($text, 0, $i + 1);
                    }
                }
            }
        }

        return null;
    }

    /**
     * Format a recommendation (primary or secondary).
     *
     * @param array<string, mixed> $recommendation
     * @param \Illuminate\Support\Collection<int, Platform> $platformsMap
     * @return array<string, mixed>
     */
    private function formatRecommendation(array $recommendation, $platformsMap): array
    {
        // Format platform data
        if (isset($recommendation['platform']['id'])) {
            $platformId = $recommendation['platform']['id'];
            if ($platformsMap->has($platformId)) {
                $recommendation['platform'] = $this->formatPlatformData(
                    $platformsMap->get($platformId)
                );
            }
        }

        // Ensure recommendedPlan has all required fields
        if (isset($recommendation['recommendedPlan'])) {
            $plan = $recommendation['recommendedPlan'];
            if (!isset($plan['monthlyPrice']) && isset($plan['id'])) {
                // Try to find plan and calculate price
                $platformId = is_array($recommendation['platform']) 
                    ? ($recommendation['platform']['id'] ?? null)
                    : ($recommendation['platform']->id ?? null);
                    
                if ($platformId && $platformsMap->has($platformId)) {
                    $platform = $platformsMap->get($platformId);
                    if ($platform) {
                        $foundPlan = $platform->plans->firstWhere('id', $plan['id']);
                        if ($foundPlan && $foundPlan->planPrices->isNotEmpty()) {
                            $monthlyPrice = $this->calculateMonthlyPrice($foundPlan->planPrices->first());
                            $recommendation['recommendedPlan']['monthlyPrice'] = $monthlyPrice;
                            $recommendation['recommendedPlan']['currency'] = $foundPlan->planPrices->first()->currency ?? 'USD';
                        }
                    }
                }
            }
        }

        return $recommendation;
    }

    /**
     * Format platform data for frontend.
     *
     * @param Platform $platform
     * @return array<string, mixed>
     */
    private function formatPlatformData(Platform $platform): array
    {
        return [
            'id' => $platform->id,
            'name' => $platform->name,
            'description' => $platform->description,
            'slug' => $platform->slug,
            'url' => $platform->url,
            'logo' => $platform->logo,
            'dark_logo' => $platform->dark_logo,
            'favicon' => $platform->favicon,
            'status' => $platform->status,
            'order' => $platform->order,
            'color' => $platform->color,
            'is_local' => $platform->is_local,
            'created_at' => $platform->created_at?->toISOString(),
            'updated_at' => $platform->updated_at?->toISOString(),
            'deleted_at' => $platform->deleted_at?->toISOString(),
        ];
    }
}

