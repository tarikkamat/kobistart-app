<?php

namespace App\Http\Controllers;

use App\Http\Requests\WizardAnalyzeRequest;
use App\Models\WizardAnalysis;
use App\Services\Ai\AiServiceFactory;
use App\Services\PdfService;
use App\Services\PlatformService;
use App\Services\WizardAnalysisService;
use App\Services\WizardService;
use Illuminate\Http\RedirectResponse;
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
     *
     * @param WizardAnalyzeRequest $request
     * @return Response|RedirectResponse
     */
    public function analyze(WizardAnalyzeRequest $request)
    {
        try {
            $wizardData = $request->validated();

            // Get all platforms with full details
            $platforms = $this->platformService->getAllPlatformsWithDetails();

            if ($platforms->isEmpty()) {
                return redirect()->route('wizard.index')
                    ->withErrors(['error' => 'Hiçbir aktif platform bulunamadı.']);
            }

            // Prepare agent prompt
            $prompt = $this->wizardService->prepareAgentPrompt($wizardData, $platforms);

            // Get AI service and send message
            $aiService = $this->aiServiceFactory->create();
            $response = $aiService->sendMessage($prompt);

            if (!$response['success'] || !isset($response['response'])) {
                Log::error('AI service failed', [
                    'error' => $response['error'] ?? 'Unknown error',
                    'response' => $response,
                ]);

                return redirect()->route('wizard.index')
                    ->withErrors(['error' => 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.']);
            }

            // Format agent response
            $result = $this->wizardService->formatAgentResponse($response['response'], $platforms);

            // Save analysis
            $analysis = $this->wizardAnalysisService->saveAnalysis($wizardData, $result);

            // Render result page
            return Inertia::render('wizard/result', [
                'result' => $result,
                'analysisId' => $analysis->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Wizard analysis error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('wizard.index')
                ->withErrors(['error' => 'Analiz sırasında beklenmeyen bir hata oluştu.']);
        }
    }

    /**
     * Display the wizard result page.
     *
     * @return Response
     */
    public function result()
    {
        return Inertia::render('wizard/result');
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

