<?php

namespace App\Services;

use App\Contracts\BaseService;
use App\Models\WizardAnalysis;
use App\Repository\WizardAnalysisRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class WizardAnalysisService extends BaseService
{
    public function __construct(WizardAnalysisRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Save analysis for user or session.
     *
     * @param  array<string, mixed>  $wizardData
     * @param  array<string, mixed>  $analysisResult
     * @return WizardAnalysis
     */
    public function saveAnalysis(array $wizardData, array $analysisResult): WizardAnalysis
    {
        /** @var WizardAnalysisRepository $repository */
        $repository = $this->repository;

        $primary = $analysisResult['primary'] ?? null;
        $platformId = $primary['platform']['id'] ?? null;
        $planId = $primary['recommendedPlan']['id'] ?? null;
        $score = $primary['score'] ?? 0;
        $confidence = $primary['confidence'] ?? 'medium';

        $data = [
            'wizard_data' => $wizardData,
            'analysis_result' => $analysisResult,
            'platform_id' => $platformId,
            'plan_id' => $planId,
            'score' => $score,
            'confidence' => $confidence,
        ];

        if (Auth::check()) {
            $data['user_id'] = Auth::id();
            return $repository->createForUser($data);
        } else {
            $data['session_id'] = Session::getId();
            return $repository->createForSession($data);
        }
    }

    /**
     * Get analyses for current user.
     *
     * @return Collection<int, WizardAnalysis>
     */
    public function getUserAnalyses(): Collection
    {
        /** @var WizardAnalysisRepository $repository */
        $repository = $this->repository;

        if (!Auth::check()) {
            return collect();
        }

        return $repository->getUserAnalyses(Auth::id());
    }

    /**
     * Migrate session analyses to user.
     *
     * @param  int  $userId
     * @return int Number of migrated analyses
     */
    public function migrateSessionAnalyses(int $userId): int
    {
        /** @var WizardAnalysisRepository $repository */
        $repository = $this->repository;

        $sessionId = Session::getId();
        return $repository->migrateSessionToUser($sessionId, $userId);
    }

    /**
     * Get analysis by ID.
     *
     * @param  int  $id
     * @return WizardAnalysis|null
     */
    public function getAnalysis(int $id): ?WizardAnalysis
    {
        /** @var WizardAnalysisRepository $repository */
        $repository = $this->repository;

        $analysis = $repository->getAnalysisById($id);

        // Check if user has access to this analysis
        if ($analysis && Auth::check()) {
            if ($analysis->user_id === Auth::id()) {
                return $analysis;
            }
        } elseif ($analysis && !Auth::check()) {
            // For non-authenticated users, check session
            if ($analysis->session_id === Session::getId() && !$analysis->user_id) {
                return $analysis;
            }
        }

        return null;
    }
}

