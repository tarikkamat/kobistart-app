<?php

namespace App\Http\Controllers;

use App\Http\Requests\WizardAnalyzeRequest;
use App\Jobs\ProcessWizardAnalysis;
use App\Models\WizardAnalysis;
use App\Services\Ai\AiServiceFactory;
use App\Services\PdfService;
use App\Services\PlatformService;
use App\Services\WizardAnalysisService;
use App\Services\WizardService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class WizardController extends Controller
{
    public function __construct(
        private PlatformService $platformService,
        private WizardService $wizardService,
        private WizardAnalysisService $wizardAnalysisService,
        private AiServiceFactory $aiServiceFactory,
        private PdfService $pdfService
    ) {
    }

    /**
     * Display the wizard page.
     *
     * @return Response
     */
    public function index()
    {
        // Migrate session analyses to user if authenticated
        if (Auth::check()) {
            $this->wizardAnalysisService->migrateSessionAnalyses(Auth::id());
        }

        return Inertia::render('wizard/index');
    }

    /**
     * Analyze wizard data and return platform recommendations.
     * Now uses queue for async processing.
     *
     * @param WizardAnalyzeRequest $request
     * @return Response|RedirectResponse
     */
    public function analyze(WizardAnalyzeRequest $request)
    {
        try {
            $wizardData = $request->validated();

            // Dispatch job to queue
            $userId = Auth::id();
            $sessionId = session()->getId();

            ProcessWizardAnalysis::dispatch($wizardData, $userId, $sessionId);

            Log::info('Wizard analysis job dispatched', [
                'user_id' => $userId,
                'session_id' => $sessionId,
            ]);

            // Redirect to processing page
            return Inertia::render('wizard/processing', [
                'sessionId' => $sessionId,
            ]);
        } catch (\Exception $e) {
            Log::error('Wizard analysis dispatch error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('wizard.index')
                ->withErrors(['error' => 'Analiz başlatılırken bir hata oluştu.']);
        }
    }

    /**
     * Check if analysis is ready (polling endpoint).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkAnalysis(Request $request)
    {
        $sessionId = $request->input('session_id') ?? session()->getId();
        $userId = Auth::id();

        /** @var \App\Repository\WizardAnalysisRepository $repository */
        $repository = app(\App\Repository\WizardAnalysisRepository::class);

        $analysis = $userId
            ? $repository->getLatestByUserId($userId)
            : $repository->getLatestBySessionId($sessionId);

        if (!$analysis) {
            return response()->json([
                'ready' => false,
                'message' => 'Analiz henüz hazır değil.',
            ]);
        }

        // Check if analysis has result (job completed)
        if (empty($analysis->analysis_result)) {
            return response()->json([
                'ready' => false,
                'message' => 'Analiz işleniyor...',
            ]);
        }

        // Check if analysis was created in the last 10 minutes (to avoid old analyses)
        $tenMinutesAgo = now()->subMinutes(10);
        if ($analysis->created_at->lt($tenMinutesAgo)) {
            return response()->json([
                'ready' => false,
                'message' => 'Analiz bulunamadı.',
            ]);
        }

        return response()->json([
            'ready' => true,
            'analysisId' => $analysis->id,
            'result' => $analysis->analysis_result,
        ]);
    }

    /**
     * Display the wizard result page.
     *
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function result(Request $request)
    {
        $analysisId = $request->input('analysisId');

        if ($analysisId) {
            $analysis = $this->wizardAnalysisService->getAnalysis((int) $analysisId);

            if (!$analysis || empty($analysis->analysis_result)) {
                return redirect()->route('wizard.index')
                    ->withErrors(['error' => 'Analiz bulunamadı veya henüz tamamlanmadı.']);
            }

            return Inertia::render('wizard/result', [
                'result' => $analysis->analysis_result,
                'analysisId' => $analysis->id,
            ]);
        }

        // If no analysisId, check if result is passed directly (for backward compatibility)
        $result = $request->input('result');
        if ($result) {
            return Inertia::render('wizard/result', [
                'result' => is_string($result) ? json_decode($result, true) : $result,
                'analysisId' => $request->input('analysisId'),
            ]);
        }

        return redirect()->route('wizard.index')
            ->withErrors(['error' => 'Analiz sonucu bulunamadı.']);
    }

    /**
     * Download PDF for wizard analysis.
     *
     * @param WizardAnalysis $analysis
     * @return BinaryFileResponse|RedirectResponse
     */
    public function downloadPdf(WizardAnalysis $analysis)
    {
        // Check if user has access to this analysis
        $accessibleAnalysis = $this->wizardAnalysisService->getAnalysis($analysis->id);

        if (!$accessibleAnalysis || $accessibleAnalysis->id !== $analysis->id) {
            return redirect()->route('wizard.index')
                ->withErrors(['error' => 'Analiz bulunamadı veya erişim yetkiniz yok.']);
        }

        try {
            $pdf = $this->pdfService->generateWizardAnalysisPdf($analysis);
            $filename = 'platform-onerisi-' . $analysis->id . '-' . now()->format('Y-m-d') . '.pdf';

            return $pdf->download($filename);
        } catch (\Exception $e) {
            Log::error('PDF generation error', [
                'error' => $e->getMessage(),
                'analysis_id' => $analysis->id,
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'PDF oluşturulurken bir hata oluştu.']);
        }
    }
}

