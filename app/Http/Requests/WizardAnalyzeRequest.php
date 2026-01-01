<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WizardAnalyzeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'businessProfile' => 'required|array',
            'businessProfile.businessType' => 'nullable|in:startup,growing,enterprise',
            'businessProfile.monthlyBudget' => 'required|numeric|min:20|max:500',
            'businessProfile.sector' => 'nullable|string|max:255',

            'salesModel' => 'required|array',
            'salesModel.model' => 'nullable|in:b2c,b2b,both',
            'salesModel.hasPhysicalStore' => 'boolean',
            'salesModel.marketplaceSelling' => 'boolean',

            'featurePriorities' => 'required|array',
            'featurePriorities.selectedFeatures' => 'array',
            'featurePriorities.selectedFeatures.*' => 'string',
            'featurePriorities.priorities' => 'array',
            'featurePriorities.priorities.*' => 'in:low,medium,high,critical',

            'technicalRequirements' => 'required|array',
            'technicalRequirements.apiAccess' => 'boolean',
            'technicalRequirements.mobileApp' => 'boolean',
            'technicalRequirements.multiLanguage' => 'boolean',
            'technicalRequirements.marketplaceIntegration' => 'boolean',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'businessProfile.required' => 'İşletme profili bilgileri gereklidir.',
            'businessProfile.monthlyBudget.required' => 'Aylık bütçe gereklidir.',
            'businessProfile.monthlyBudget.numeric' => 'Aylık bütçe sayısal bir değer olmalıdır.',
            'businessProfile.monthlyBudget.min' => 'Aylık bütçe en az 20 olmalıdır.',
            'businessProfile.monthlyBudget.max' => 'Aylık bütçe en fazla 500 olmalıdır.',
            'businessProfile.businessType.in' => 'Geçersiz işletme tipi.',
            'salesModel.required' => 'Satış modeli bilgileri gereklidir.',
            'salesModel.model.in' => 'Geçersiz satış modeli.',
            'featurePriorities.required' => 'Özellik öncelikleri gereklidir.',
            'technicalRequirements.required' => 'Teknik gereksinimler gereklidir.',
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'businessProfile' => 'İşletme Profili',
            'businessProfile.businessType' => 'İşletme Tipi',
            'businessProfile.monthlyBudget' => 'Aylık Bütçe',
            'businessProfile.sector' => 'Sektör',
            'salesModel' => 'Satış Modeli',
            'salesModel.model' => 'Satış Yöntemi',
            'salesModel.hasPhysicalStore' => 'Fiziksel Mağaza',
            'salesModel.marketplaceSelling' => 'Pazaryeri Satışı',
            'featurePriorities' => 'Özellik Öncelikleri',
            'featurePriorities.selectedFeatures' => 'Seçili Özellikler',
            'technicalRequirements' => 'Teknik Gereksinimler',
        ];
    }
}

