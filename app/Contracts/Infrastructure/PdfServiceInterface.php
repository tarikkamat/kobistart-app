<?php

namespace App\Contracts\Infrastructure;

use App\Models\WizardAnalysis;

interface PdfServiceInterface
{
    /**
     * Generate PDF for wizard analysis.
     *
     * @param  WizardAnalysis  $analysis
     * @return \Barryvdh\DomPDF\PDF
     */
    public function generateWizardAnalysisPdf(WizardAnalysis $analysis): \Barryvdh\DomPDF\PDF;
}

