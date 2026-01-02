<?php

namespace App\Services\Wizard;

use App\Contracts\Infrastructure\PdfServiceInterface;
use App\Models\WizardAnalysis;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfService implements PdfServiceInterface
{
    /**
     * Generate PDF for wizard analysis.
     *
     * @param  WizardAnalysis  $analysis
     * @return \Barryvdh\DomPDF\PDF
     */
    public function generateWizardAnalysisPdf(WizardAnalysis $analysis): \Barryvdh\DomPDF\PDF
    {
        $data = [
            'analysis' => $analysis,
            'result' => $analysis->analysis_result,
            'primary' => $analysis->analysis_result['primary'] ?? null,
            'secondary' => $analysis->analysis_result['secondary'] ?? null,
            'insights' => $analysis->analysis_result['insights'] ?? null,
            'alternativeScenarios' => $analysis->analysis_result['alternativeScenarios'] ?? null,
            'date' => $analysis->created_at->format('d.m.Y H:i'),
        ];

        return Pdf::loadView('pdf.wizard-analysis', $data)
            ->setPaper('a4', 'portrait')
            ->setOption('enable-local-file-access', true);
    }
}

