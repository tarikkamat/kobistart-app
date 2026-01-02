<?php

namespace App\Services\Ai;

use App\Contracts\AiServiceInterface;

class ChatGptService implements AiServiceInterface
{
    /**
     * Create a new ChatGPT service instance.
     *
     * @param  array<string, mixed>  $config
     */
    public function __construct(
        private array $config = []
    ) {
    }

    /**
     * Send a message to ChatGPT (dummy implementation).
     *
     * @param  string  $message
     * @return array<string, mixed>
     */
    public function sendMessage(string $message): array
    {
        // Dummy response
        return [
            'success' => true,
            'provider' => 'chatgpt',
            'message' => $message,
            'response' => 'This is a dummy response from ChatGPT. The message you sent was: '.$message,
            'timestamp' => now()->toIso8601String(),
        ];
    }

    /**
     * Get the name of the service.
     *
     * @return string
     */
    public function getName(): string
    {
        return 'ChatGPT';
    }

    /**
     * Check if the service is available.
     *
     * @return bool
     */
    public function isAvailable(): bool
    {
        // Dummy service is always available
        return true;
    }
}

