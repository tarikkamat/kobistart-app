<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFilterItemRequest extends FormRequest
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
            'filter_group_id' => 'sometimes|exists:filter_groups,id',
            'feature_id' => 'nullable|exists:features,id',
            'feature_key' => 'nullable|string',
            'name' => 'sometimes|string|max:255',
            'order' => 'sometimes|integer',
            'status' => 'sometimes|boolean',
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
            'filter_group_id.exists' => 'The selected filter group id is invalid.',
            'feature_id.exists' => 'The selected feature id is invalid.',
            'feature_key.string' => 'The feature key field must be a string.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'order.integer' => 'The order field must be an integer.',
            'status.boolean' => 'The status field must be a boolean.',
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
            'filter_group_id' => 'Filter Group ID',
            'feature_id' => 'Feature ID',
            'feature_key' => 'Feature Key',
            'name' => 'Name',
            'order' => 'Order',
            'status' => 'Status',
        ];
    }
}

