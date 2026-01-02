<?php

namespace App\Http\Requests\Feature;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFeatureRequest extends FormRequest
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
        $featureId = $this->route('feature');

        return [
            'key' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('features')->ignore($featureId),
            ],
            'category' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'order' => 'sometimes|integer',
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
            'key.string' => 'The key field must be a string.',
            'key.max' => 'The key field must be less than or equal to 255 characters.',
            'key.unique' => 'The key field must be unique.',
            'category.string' => 'The category field must be a string.',
            'category.max' => 'The category field must be less than or equal to 255 characters.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'description.string' => 'The description field must be a string.',
            'order.integer' => 'The order field must be an integer.',
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
            'key' => 'Key',
            'category' => 'Category',
            'name' => 'Name',
            'description' => 'Description',
            'order' => 'Order',
        ];
    }
}

