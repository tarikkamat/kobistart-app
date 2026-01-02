<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
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
            'image' => 'required|image|mimes:jpeg,jpg,png,svg,webp|max:10240',
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
            'image.required' => 'Resim dosyası gereklidir.',
            'image.image' => 'Yüklenen dosya bir resim olmalıdır.',
            'image.mimes' => 'Resim formatı jpeg, jpg, png, svg veya webp olmalıdır.',
            'image.max' => 'Resim dosyası en fazla 10MB olabilir.',
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
            'image' => 'Resim',
        ];
    }
}

