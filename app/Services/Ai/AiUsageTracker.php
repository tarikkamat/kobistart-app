<?php

namespace App\Services\Ai;

use App\Contracts\Infrastructure\AiServiceInterface;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class AiUsageTracker
{
    /**
     * Track AI service usage.
     *
     * @param  AiServiceInterface  $service
     * @param  string  $message
     * @param  array<string, mixed>  $response
     * @return void
     */
    public function track(AiServiceInterface $service, string $message, array $response): void
    {
        if (!Config::get('ai.track_usage', true)) {
            return;
        }

        $providerName = $service->getName();
        $success = $response['success'] ?? false;

        Log::info('AI Service Usage', [
            'provider' => $providerName,
            'message_length' => strlen($message),
            'success' => $success,
            'timestamp' => now()->toIso8601String(),
            'response_keys' => array_keys($response),
        ]);

        // You can extend this to store in database if needed
        // Example:
        // AiUsageLog::create([
        //     'provider' => $providerName,
        //     'message' => $message,
        //     'success' => $success,
        //     'response' => $response,
        // ]);
    }

    /**
     * Get usage statistics for a provider.
     *
     * @param  string  $provider
     * @param  int  $days
     * @return array<string, mixed>
     */
    public function getStatistics(string $provider, int $days = 30): array
    {
        // This is a placeholder for statistics
        // You can implement database queries here if you store usage in DB
        return [
            'provider' => $provider,
            'days' => $days,
            'total_requests' => 0,
            'successful_requests' => 0,
            'failed_requests' => 0,
        ];
    }
}

