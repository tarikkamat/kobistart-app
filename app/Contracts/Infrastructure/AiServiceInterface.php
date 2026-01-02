<?php

namespace App\Contracts\Infrastructure;

interface AiServiceInterface
{
    /**
     * Send a message to the AI service and get a response.
     *
     * @param  string  $message
     * @return array<string, mixed>
     */
    public function sendMessage(string $message): array;

    /**
     * Get the name of the AI service provider.
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Check if the service is available and properly configured.
     *
     * @return bool
     */
    public function isAvailable(): bool;
}

