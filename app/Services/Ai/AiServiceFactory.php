<?php

namespace App\Services\Ai;

use App\Contracts\AiServiceInterface;
use Illuminate\Support\Facades\Config;
use InvalidArgumentException;

class AiServiceFactory
{
    /**
     * Create an AI service instance based on the provider name.
     *
     * @param  string|null  $provider
     * @return AiServiceInterface
     * @throws InvalidArgumentException
     */
    public function create(?string $provider = null): AiServiceInterface
    {
        $provider = $provider ?? Config::get('ai.default', 'toqan');
        $provider = strtolower($provider);

        return match ($provider) {
            'chatgpt' => new ChatGptService(Config::get('ai.providers.chatgpt', [])),
            'gemini' => new GeminiService(Config::get('ai.providers.gemini', [])),
            'deepseek' => new DeepSeekService(Config::get('ai.providers.deepseek', [])),
            'toqan' => new ToqanService(Config::get('ai.providers.toqan', [])),
            default => throw new InvalidArgumentException("Unsupported AI provider: {$provider}"),
        };
    }

    /**
     * Get the default provider name.
     *
     * @return string
     */
    public function getDefaultProvider(): string
    {
        return Config::get('ai.default', 'toqan');
    }
}

