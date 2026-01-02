<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;

class CreatePlanRequest extends FormRequest
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
            'platform_id' => 'required|exists:platforms,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:plans',
            'status' => 'boolean',
            'order' => 'integer',
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
            'platform_id.required' => 'The platform id field is required.',
            'platform_id.exists' => 'The selected platform id is invalid.',
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'slug.required' => 'The slug field is required.',
            'slug.string' => 'The slug field must be a string.',
            'slug.max' => 'The slug field must be less than or equal to 255 characters.',
            'slug.unique' => 'The slug field must be unique.',
            'status.boolean' => 'The status field must be a boolean.',
            'order.integer' => 'The order field must be an integer.',
            'order.min' => 'The order field must be greater than or equal to 0.',
            'order.max' => 'The order field must be less than or equal to 255.',
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
            'platform_id' => 'Platform ID',
            'name' => 'Name',
            'slug' => 'Slug',
            'status' => 'Status',
            'order' => 'Order',
        ];
    }
}

