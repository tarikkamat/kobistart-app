<?php

namespace App\Http\Controllers;

use App\Services\WizardAnalysisService;
use Inertia\Inertia;
use Inertia\Response;

class WizardAnalysisController extends Controller
{
    public function __construct(
        private WizardAnalysisService $wizardAnalysisService
    ) {
    }

    /**
     * Display a listing of user's wizard analyses.
     *
     * @return Response
     */
    public function index(): Response
    {
        $analyses = $this->wizardAnalysisService->getUserAnalyses();

        return Inertia::render('wizard/analyses/index', [
            'analyses' => $analyses->map(function ($analysis) {
                $primary = $analysis->analysis_result['primary'] ?? null;
                return [
                    'id' => $analysis->id,
                    'platform' => $primary['platform'] ?? null,
                    'plan' => $primary['recommendedPlan'] ?? null,
                    'score' => $analysis->score,
                    'confidence' => $analysis->confidence,
                    'created_at' => $analysis->created_at->toISOString(),
                    'updated_at' => $analysis->updated_at->toISOString(),
                ];
            })->toArray(),
        ]);
    }

    /**
     * Display the specified wizard analysis.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id): Response
    {
        $analysis = $this->wizardAnalysisService->getAnalysis($id);

        if (!$analysis) {
            abort(404);
        }

        return Inertia::render('wizard/analyses/show', [
            'analysis' => [
                'id' => $analysis->id,
                'result' => $analysis->analysis_result,
                'wizard_data' => $analysis->wizard_data,
                'score' => $analysis->score,
                'confidence' => $analysis->confidence,
                'created_at' => $analysis->created_at->toISOString(),
            ],
        ]);
    }

    /**
     * Remove the specified wizard analysis.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $analysis = $this->wizardAnalysisService->getAnalysis($id);

        if (!$analysis) {
            abort(404);
        }

        $analysis->delete();

        return redirect()->route('wizard.analyses.index')
            ->with('success', 'Analiz başarıyla silindi.');
    }
}

