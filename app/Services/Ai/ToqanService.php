<?php

namespace App\Services\Ai;

use App\Contracts\Infrastructure\AiServiceInterface;
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
     * @param  array<string, mixed>  $config
     */
    public function __construct(
        private array $config = []
    ) {
    }

    /**
     * Send a message to Toqan API.
     * Toqan API uses a two-step process: create conversation, then get answer.
     *
     * @param  string  $message
     * @return array<string, mixed>
     */
    public function sendMessage(string $message): array
    {
        $apiKey = $this->config['api_key'] ?? null;
        $baseUrl = $this->config['base_url'] ?? 'https://api.coco.prod.toqan.ai';

        // Log the message being sent
        Log::info('Toqan API request', [
            'provider' => 'toqan',
            'message_length' => strlen($message),
            'base_url' => $baseUrl,
        ]);

        if (!$apiKey) {
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

            if (!$createResponse->successful()) {
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

            if (!$conversationId || !$requestId) {
                return [
                    'success' => false,
                    'provider' => 'toqan',
                    'message' => $message,
                    'error' => 'Missing conversation_id or request_id in response',
                    'response' => $createData,
                ];
            }

            // Step 2: Get answer (wait until finished)
            $retryDelay = 3; // seconds between retries
            $maxWaitTime = 300; // Maximum 5 minutes total wait time
            $startTime = time();
            $answer = null;
            $answerData = null;
            $attempt = 0;

            Log::info('Toqan API - Starting answer retrieval', [
                'provider' => 'toqan',
                'conversation_id' => $conversationId,
                'request_id' => $requestId,
                'max_wait_time' => $maxWaitTime,
            ]);

            while (true) {
                $attempt++;
                $elapsedTime = time() - $startTime;

                // Check if we've exceeded maximum wait time
                if ($elapsedTime >= $maxWaitTime) {
                    Log::warning('Toqan API - Maximum wait time exceeded', [
                        'provider' => 'toqan',
                        'attempts' => $attempt,
                        'elapsed_time' => $elapsedTime,
                        'max_wait_time' => $maxWaitTime,
                    ]);
                    break;
                }

                // Wait before retry (except for first attempt)
                if ($attempt > 1) {
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
                    $status = $answerData['status'] ?? null;

                    // conversation_id and request_id Log
                    Log::info('Toqan API - Conversation ID and Request ID', [
                        'provider' => 'toqan',
                        'conversation_id' => $conversationId,
                        'request_id' => $requestId,
                    ]);

                    // Log every 5 attempts to avoid log spam
                    if ($attempt % 5 === 0 || $status === 'finished') {
                        Log::info('Toqan API - Answer response received', [
                            'provider' => 'toqan',
                            'attempt' => $attempt,
                            'status' => $status,
                            'has_answer' => isset($answerData['answer']),
                            'elapsed_time' => $elapsedTime,
                        ]);
                    }

                    // Check if status is finished
                    if ($status === 'finished') {
                        // Try different possible response field names
                        $answer = $answerData['answer']
                            ?? $answerData['response']
                            ?? $answerData['message']
                            ?? $answerData['content']
                            ?? $answerData['text']
                            ?? null;

                        // If we got an answer, break the loop
                        if ($answer !== null && $answer !== '') {
                            Log::info('Toqan API - Answer received successfully', [
                                'provider' => 'toqan',
                                'attempt' => $attempt,
                                'answer_length' => strlen($answer),
                                'elapsed_time' => $elapsedTime,
                            ]);
                            break;
                        } else {
                            // Status is finished but no answer - this is an error
                            Log::warning('Toqan API - Status finished but no answer field', [
                                'provider' => 'toqan',
                                'attempt' => $attempt,
                                'answer_data' => $answerData,
                            ]);
                            break;
                        }
                    }

                    // If status is still processing, continue retrying
                    if (in_array($status, ['processing', 'pending', 'in_progress'])) {
                        continue;
                    }

                    // If status is something else (error, failed, etc.), break
                    if (!in_array($status, ['processing', 'pending', 'in_progress', 'finished'])) {
                        Log::warning('Toqan API - Unexpected status', [
                            'provider' => 'toqan',
                            'attempt' => $attempt,
                            'status' => $status,
                            'answer_data' => $answerData,
                        ]);
                        break;
                    }
                } else {
                    // If answer is still processing (202 Accepted), continue retrying
                    if ($answerResponse->status() === 202) {
                        continue;
                    }

                    // If there's an error and it's not a processing status, break
                    Log::warning('Toqan API - Request failed', [
                        'provider' => 'toqan',
                        'attempt' => $attempt,
                        'status_code' => $answerResponse->status(),
                        'response' => $answerResponse->body(),
                    ]);
                    break;
                }
            }

            if ($answer === null || $answer === '') {
                Log::error('Toqan API - Failed to get answer', [
                    'provider' => 'toqan',
                    'conversation_id' => $conversationId,
                    'request_id' => $requestId,
                    'attempts' => $attempt,
                    'elapsed_time' => time() - $startTime,
                    'last_status' => $answerData['status'] ?? 'unknown',
                    'answer_data' => $answerData,
                ]);

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

            Log::info('Toqan API - Successfully received answer', [
                'provider' => 'toqan',
                'conversation_id' => $conversationId,
                'request_id' => $requestId,
                'answer_length' => strlen($answer),
            ]);

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
                'error' => 'Connection error: '.$e->getMessage(),
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
                'error' => 'Request error: '.$e->getMessage(),
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
                'error' => 'Unexpected error: '.$e->getMessage(),
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

        if (!$apiKey) {
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
                'conversation_id' => 'health-check-'.time(),
            ]);

            // Even if conversation not found, if we get a response, API is available
            return $response->status() !== 0;
        } catch (\Exception $e) {
            // If health check fails, still return true if API key exists
            // The actual availability will be checked during sendMessage
            return !empty($apiKey);
        }
    }
}

