<?php

namespace App\Http\Requests\Filter;

use Illuminate\Foundation\Http\FormRequest;

class CreateFilterGroupRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:filter_groups',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'status' => 'nullable|boolean',
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
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'slug.required' => 'The slug field is required.',
            'slug.string' => 'The slug field must be a string.',
            'slug.max' => 'The slug field must be less than or equal to 255 characters.',
            'slug.unique' => 'The slug field must be unique.',
            'description.string' => 'The description field must be a string.',
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
            'name' => 'Name',
            'slug' => 'Slug',
            'description' => 'Description',
            'order' => 'Order',
            'status' => 'Status',
        ];
    }
}

