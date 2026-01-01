<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlatformRequest extends FormRequest
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
        $platformId = $this->route('platform');

        return [
            'name' => 'sometimes|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('platforms')->ignore($platformId),
            ],
            'url' => 'nullable|url',
            'logo' => 'nullable|url',
            'dark_logo' => 'nullable|url',
            'favicon' => 'nullable|url',
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
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than or equal to 255 characters.',
            'slug.string' => 'The slug field must be a string.',
            'slug.max' => 'The slug field must be less than or equal to 255 characters.',
            'slug.unique' => 'The slug field must be unique.',
            'url.url' => 'The url field must be a valid URL.',
            'logo.url' => 'The logo field must be a valid URL.',
            'dark_logo.url' => 'The dark logo field must be a valid URL.',
            'favicon.url' => 'The favicon field must be a valid URL.',
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
            'name' => 'Name',
            'slug' => 'Slug',
            'url' => 'URL',
            'logo' => 'Logo',
            'dark_logo' => 'Dark Logo',
            'favicon' => 'Favicon',
            'status' => 'Status',
            'order' => 'Order',
        ];
    }
}

