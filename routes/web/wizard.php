<?php

use App\Http\Controllers\Wizard\WizardController;
use Illuminate\Support\Facades\Route;

Route::get('/wizard', [WizardController::class, 'index'])->name('wizard.index');
Route::post('/wizard/analyze', [WizardController::class, 'analyze'])->name('wizard.analyze');
Route::get('/wizard/check-analysis', [WizardController::class, 'checkAnalysis'])->name('wizard.checkAnalysis');
Route::get('/wizard/result', [WizardController::class, 'result'])->name('wizard.result');
Route::get('/wizard/analyses/{analysis}/pdf', [WizardController::class, 'downloadPdf'])->name('wizard.analyses.pdf');

