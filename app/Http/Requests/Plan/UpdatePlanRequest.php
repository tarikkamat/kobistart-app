<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlanRequest extends FormRequest
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
        $planId = $this->route('plan');

        return [
            'platform_id' => 'sometimes|exists:platforms,id',
            'name' => 'sometimes|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('plans')->ignore($planId),
            ],
            'status' => 'sometimes|boolean',
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
            'platform_id.exists' => 'The selected platform id is invalid.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'slug.string' => 'The slug field must be a string.',
            'slug.max' => 'The slug field must be less than or equal to 255 characters.',
            'slug.unique' => 'The slug field must be unique.',
            'status.boolean' => 'The status field must be a boolean.',
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
            'platform_id' => 'Platform ID',
            'name' => 'Name',
            'slug' => 'Slug',
            'status' => 'Status',
            'order' => 'Order',
        ];
    }
}

