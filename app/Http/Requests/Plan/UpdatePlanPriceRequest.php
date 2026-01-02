<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanPriceRequest extends FormRequest
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
            'period' => 'sometimes|string|max:255',
            'original_price' => 'sometimes|numeric|min:0',
            'discounted_price' => 'nullable|numeric|min:0',
            'currency' => 'sometimes|string|max:10',
            'is_monthly_payment' => 'sometimes|boolean',
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
            'period.string' => 'The period field must be a string.',
            'period.max' => 'The period field must be less than or equal to 255 characters.',
            'original_price.numeric' => 'The original price field must be a number.',
            'original_price.min' => 'The original price field must be greater than or equal to 0.',
            'discounted_price.numeric' => 'The discounted price field must be a number.',
            'discounted_price.min' => 'The discounted price field must be greater than or equal to 0.',
            'currency.string' => 'The currency field must be a string.',
            'currency.max' => 'The currency field must be less than or equal to 10 characters.',
            'is_monthly_payment.boolean' => 'The is monthly payment field must be a boolean.',
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
            'period' => 'Period',
            'original_price' => 'Original Price',
            'discounted_price' => 'Discounted Price',
            'currency' => 'Currency',
            'is_monthly_payment' => 'Is Monthly Payment',
        ];
    }
}

