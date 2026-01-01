<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanFeatureRequest extends FormRequest
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
            'feature_id' => 'sometimes|exists:features,id',
            'value' => 'nullable|string',
            'is_included' => 'sometimes|boolean',
            'platform_label' => 'nullable|string|max:255',
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
            'feature_id.exists' => 'The selected feature id is invalid.',
            'value.string' => 'The value field must be a string.',
            'is_included.boolean' => 'The is included field must be a boolean.',
            'platform_label.string' => 'The platform label field must be a string.',
            'platform_label.max' => 'The platform label field must be less than or equal to 255 characters.',
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
            'feature_id' => 'Feature ID',
            'value' => 'Value',
            'is_included' => 'Is Included',
            'platform_label' => 'Platform Label',
        ];
    }
}

