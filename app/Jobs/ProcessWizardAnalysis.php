<?php

namespace App\Jobs;

use App\Services\Ai\AiServiceFactory;
use App\Services\Platform\PlatformService;
use App\Services\Wizard\WizardAnalysisService;
use App\Services\Wizard\WizardService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class ProcessWizardAnalysis implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 300; // 5 minutes (minimum requirement)

    /**
     * Create a new job instance.
     */
    public function __construct(
        public array $wizardData,
        public ?int $userId = null,
        public ?string $sessionId = null
    ) {
        $this->sessionId = $sessionId ?? Session::getId();
    }

    /**
     * Execute the job.
     */
    public function handle(
        PlatformService $platformService,
        WizardService $wizardService,
        AiServiceFactory $aiServiceFactory,
        WizardAnalysisService $wizardAnalysisService
    ): void {
        try {
            Log::info('Processing wizard analysis job', [
                'user_id' => $this->userId,
                'session_id' => $this->sessionId,
            ]);

            // Get all platforms with full details
            $platforms = $platformService->getAllPlatformsWithDetails();

            if ($platforms->isEmpty()) {
                throw new \Exception('No active platforms found');
            }

            // Prepare agent prompt
            $prompt = $wizardService->prepareAgentPrompt($this->wizardData, $platforms);

            // Get AI service and send message
            $aiService = $aiServiceFactory->create();
            $response = $aiService->sendMessage($prompt);

            if (!$response['success'] || !isset($response['response'])) {
                throw new \Exception('AI service failed: '.($response['error'] ?? 'Unknown error'));
            }

            // Format agent response
            $result = $wizardService->formatAgentResponse($response['response'], $platforms);

            // Save analysis - manually set user_id and session_id
            /** @var \App\Repository\Wizard\WizardAnalysisRepository $repository */
            $repository = app(\App\Repository\Wizard\WizardAnalysisRepository::class);

            $primary = $result['primary'] ?? null;
            $platformId = $primary['platform']['id'] ?? null;
            $planId = $primary['recommendedPlan']['id'] ?? null;
            $score = $primary['score'] ?? 0;
            $confidence = $primary['confidence'] ?? 'medium';

            $data = [
                'user_id' => $this->userId,
                'session_id' => $this->userId ? null : $this->sessionId,
                'wizard_data' => $this->wizardData,
                'analysis_result' => $result,
                'platform_id' => $platformId,
                'plan_id' => $planId,
                'score' => $score,
                'confidence' => $confidence,
            ];

            $analysis = $this->userId
                ? $repository->createForUser($data)
                : $repository->createForSession($data);

            Log::info('Wizard analysis completed', [
                'analysis_id' => $analysis->id,
                'user_id' => $this->userId,
                'session_id' => $this->sessionId,
            ]);
        } catch (\Exception $e) {
            Log::error('Wizard analysis job failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $this->userId,
                'session_id' => $this->sessionId,
            ]);

            throw $e;
        }
    }
}
