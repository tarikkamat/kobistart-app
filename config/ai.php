<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default AI Provider
    |--------------------------------------------------------------------------
    |
    | This option controls the default AI provider that will be used when
    | no specific provider is requested. Available options: chatgpt, gemini,
    | deepseek, toqan
    |
    */

    'default' => env('AI_DEFAULT_PROVIDER', 'toqan'),

    /*
    |--------------------------------------------------------------------------
    | AI Providers Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure the credentials for each AI provider.
    | Each provider has its own configuration options.
    |
    */

    'providers' => [
        'chatgpt' => [
            'api_key' => env('AI_CHATGPT_API_KEY'),
        ],

        'gemini' => [
            'api_key' => env('AI_GEMINI_API_KEY'),
        ],

        'deepseek' => [
            'api_key' => env('AI_DEEPSEEK_API_KEY'),
        ],

        'toqan' => [
            'api_key' => env('AI_TOQAN_API_KEY'),
            'base_url' => env('AI_TOQAN_BASE_URL', 'https://api.coco.prod.toqan.ai'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Track Usage
    |--------------------------------------------------------------------------
    |
    | When enabled, the system will track which provider is being used
    | and log usage information.
    |
    */

    'track_usage' => env('AI_TRACK_USAGE', true),
];

