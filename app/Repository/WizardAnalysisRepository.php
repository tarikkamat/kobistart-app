<?php

namespace App\Repository;

use App\Contracts\BaseRepository;
use App\Models\WizardAnalysis;
use Illuminate\Database\Eloquent\Collection;

class WizardAnalysisRepository extends BaseRepository
{
    public function __construct(WizardAnalysis $wizardAnalysis)
    {
        parent::__construct($wizardAnalysis);
    }

    /**
     * Create analysis for a user.
     *
     * @param  array<string, mixed>  $data
     * @return WizardAnalysis
     */
    public function createForUser(array $data): WizardAnalysis
    {
        return $this->model->create($data);
    }

    /**
     * Create analysis for a session.
     *
     * @param  array<string, mixed>  $data
     * @return WizardAnalysis
     */
    public function createForSession(array $data): WizardAnalysis
    {
        return $this->model->create($data);
    }

    /**
     * Get analyses for a user.
     *
     * @param  int  $userId
     * @return Collection<int, WizardAnalysis>
     */
    public function getUserAnalyses(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->with(['platform', 'plan'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get analyses for a session.
     *
     * @param  string  $sessionId
     * @return Collection<int, WizardAnalysis>
     */
    public function getSessionAnalyses(string $sessionId): Collection
    {
        return $this->model
            ->where('session_id', $sessionId)
            ->whereNull('user_id')
            ->whereNull('deleted_at')
            ->with(['platform', 'plan'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Migrate session analyses to user.
     *
     * @param  string  $sessionId
     * @param  int  $userId
     * @return int Number of migrated analyses
     */
    public function migrateSessionToUser(string $sessionId, int $userId): int
    {
        return $this->model
            ->where('session_id', $sessionId)
            ->whereNull('user_id')
            ->whereNull('deleted_at')
            ->update([
                'user_id' => $userId,
                'session_id' => null,
            ]);
    }

    /**
     * Get analysis by ID with relations.
     *
     * @param  int  $id
     * @return WizardAnalysis|null
     */
    public function getAnalysisById(int $id): ?WizardAnalysis
    {
        return $this->model
            ->with(['platform', 'plan', 'user'])
            ->find($id);
    }

    /**
     * Get latest analysis for session.
     *
     * @param  string  $sessionId
     * @return WizardAnalysis|null
     */
    public function getLatestBySessionId(string $sessionId): ?WizardAnalysis
    {
        return $this->model
            ->where('session_id', $sessionId)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->first();
    }

    /**
     * Get latest analysis for user.
     *
     * @param  int  $userId
     * @return WizardAnalysis|null
     */
    public function getLatestByUserId(int $userId): ?WizardAnalysis
    {
        return $this->model
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->first();
    }
}

