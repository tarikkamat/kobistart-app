<?php

namespace App\Services\Ai;

use App\Contracts\AiServiceInterface;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ToqanService implements AiServiceInterface
{
    /**
     * Create a new Toqan service instance.
     *
     * @param array<string, mixed> $config
     */
    public function __construct(
        private array $config = []
    ) {
    }

    /**
     * Send a message to Toqan API.
     * Toqan API uses a two-step process: create conversation, then get answer.
     *
     * @param string $message
     * @return array<string, mixed>
     */
    public function sendMessage(string $message): array
    {
        $apiKey = $this->config['api_key'] ?? null;
        $baseUrl = $this->config['base_url'] ?? 'https://api.coco.prod.toqan.ai';

        if (! $apiKey) {
            return [
                'success' => false,
                'provider' => 'toqan',
                'error' => 'API key is not configured',
                'message' => $message,
            ];
        }

        try {
            // Step 1: Create conversation
            /** @var Response $createResponse */
            $createResponse = Http::withHeaders([
                'X-Api-Key' => $apiKey,
                'Content-Type' => 'application/json',
                'Accept' => '*/*',
            ])->timeout(30)->post("{$baseUrl}/api/create_conversation", [
                'user_message' => $message,
            ]);

            if (! $createResponse->successful()) {
                return [
                    'success' => false,
                    'provider' => 'toqan',
                    'message' => $message,
                    'error' => $createResponse->json('error') ?? 'Failed to create conversation',
                    'status_code' => $createResponse->status(),
                    'response' => $createResponse->body(),
                ];
            }

            $createData = $createResponse->json();
            $conversationId = $createData['conversation_id'] ?? null;
            $requestId = $createData['request_id'] ?? null;

            if (! $conversationId || ! $requestId) {
                return [
                    'success' => false,
                    'provider' => 'toqan',
                    'message' => $message,
                    'error' => 'Missing conversation_id or request_id in response',
                    'response' => $createData,
                ];
            }

            // Step 2: Get answer (with retry mechanism for async processing)
            $maxRetries = 10;
            $retryDelay = 2; // seconds
            $answer = null;
            $answerData = null;

            for ($attempt = 0; $attempt < $maxRetries; $attempt++) {
                // Wait before retry (except for first attempt)
                if ($attempt > 0) {
                    sleep($retryDelay);
                }

                /** @var Response $answerResponse */
                $answerResponse = Http::withHeaders([
                    'X-Api-Key' => $apiKey,
                    'Accept' => '*/*',
                ])->timeout(30)->get("{$baseUrl}/api/get_answer", [
                    'conversation_id' => $conversationId,
                    'request_id' => $requestId,
                ]);

                if ($answerResponse->successful()) {
                    $answerData = $answerResponse->json();
                    // Try different possible response field names
                    $answer = $answerData['answer']
                        ?? $answerData['response']
                        ?? $answerData['message']
                        ?? $answerData['content']
                        ?? $answerData['text']
                        ?? null;

                    // If we got an answer, break the loop
                    if ($answer !== null && $answer !== '') {
                        break;
                    }
                }

                // If answer is still processing (202 Accepted), continue retrying
                if ($answerResponse->status() === 202) {
                    continue;
                }

                // Check if response indicates processing status
                $responseData = $answerResponse->json();
                if (isset($responseData['status']) && in_array($responseData['status'], ['processing', 'pending', 'in_progress'])) {
                    continue;
                }

                // If there's an error and it's not a processing status, break
                if (! $answerResponse->successful() && $answerResponse->status() !== 202) {
                    break;
                }
            }

            if ($answer === null || $answer === '') {
                return [
                    'success' => false,
                    'provider' => 'toqan',
                    'message' => $message,
                    'error' => 'Failed to get answer after multiple attempts',
                    'conversation_id' => $conversationId,
                    'request_id' => $requestId,
                    'answer_data' => $answerData,
                ];
            }

            return [
                'success' => true,
                'provider' => 'toqan',
                'message' => $message,
                'response' => $answer,
                'conversation_id' => $conversationId,
                'request_id' => $requestId,
                'data' => $answerData ?? $createData,
                'timestamp' => now()->toIso8601String(),
            ];
        } catch (ConnectionException $e) {
            Log::error('Toqan API connection error', [
                'message' => $e->getMessage(),
                'provider' => 'toqan',
            ]);

            return [
                'success' => false,
                'provider' => 'toqan',
                'message' => $message,
                'error' => 'Connection error: ' . $e->getMessage(),
            ];
        } catch (RequestException $e) {
            Log::error('Toqan API request error', [
                'message' => $e->getMessage(),
                'provider' => 'toqan',
                'response' => $e->response?->body(),
            ]);

            return [
                'success' => false,
                'provider' => 'toqan',
                'message' => $message,
                'error' => 'Request error: ' . $e->getMessage(),
                'status_code' => $e->response?->status(),
            ];
        } catch (\Exception $e) {
            Log::error('Toqan API unexpected error', [
                'message' => $e->getMessage(),
                'provider' => 'toqan',
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'provider' => 'toqan',
                'message' => $message,
                'error' => 'Unexpected error: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get the name of the service.
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Toqan';
    }

    /**
     * Check if the service is available.
     *
     * @return bool
     */
    public function isAvailable(): bool
    {
        $apiKey = $this->config['api_key'] ?? null;
        $baseUrl = $this->config['base_url'] ?? 'https://api.coco.prod.toqan.ai';

        if (! $apiKey) {
            return false;
        }

        // Check if API is reachable by trying to find a conversation
        // This is a lightweight check without creating a new conversation
        try {
            /** @var Response $response */
            $response = Http::withHeaders([
                'X-Api-Key' => $apiKey,
                'Content-Type' => 'application/json',
                'Accept' => '*/*',
            ])->timeout(5)->post("{$baseUrl}/api/find_conversation", [
                'conversation_id' => 'health-check-' . time(),
            ]);

            // Even if conversation not found, if we get a response, API is available
            return $response->status() !== 0;
        } catch (\Exception $e) {
            // If health check fails, still return true if API key exists
            // The actual availability will be checked during sendMessage
            return ! empty($apiKey);
        }
    }
}

