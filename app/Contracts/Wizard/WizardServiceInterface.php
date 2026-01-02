<?php

namespace App\Contracts\Wizard;

use App\Models\PlanPrice;
use App\Models\Platform;
use Illuminate\Database\Eloquent\Collection;

interface WizardServiceInterface
{
    /**
     * Prepare the agent prompt with wizard data and platform information.
     *
     * @param  array<string, mixed>  $wizardData
     * @param  Collection<int, Platform>  $platforms
     * @return string
     */
    public function prepareAgentPrompt(array $wizardData, Collection $platforms): string;

    /**
     * Calculate monthly price from plan price.
     *
     * @param  PlanPrice  $planPrice
     * @return float
     */
    public function calculateMonthlyPrice(PlanPrice $planPrice): float;

    /**
     * Format agent response for frontend.
     *
     * @param  string  $agentResponse
     * @param  Collection<int, Platform>  $platforms
     * @return array<string, mixed>
     */
    public function formatAgentResponse(string $agentResponse, Collection $platforms): array;
}

