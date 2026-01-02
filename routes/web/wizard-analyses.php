<?php

use App\Http\Controllers\Wizard\WizardAnalysisController;
use Illuminate\Support\Facades\Route;

Route::get('/wizard/analyses', [WizardAnalysisController::class, 'index'])->name('wizard.analyses.index');
Route::get('/wizard/analyses/{analysis}', [WizardAnalysisController::class, 'show'])->name('wizard.analyses.show');
Route::delete('/wizard/analyses/{analysis}',
    [WizardAnalysisController::class, 'destroy'])->name('wizard.analyses.destroy');

