<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;

class StoreStudentRequest extends FormRequest
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
     * @return array<string, array<int, string|Unique>>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'birthday' => ['required', 'date', 'before:today'],
            'email' => ['required', 'email', new Unique('students', 'email')],
            'program' => ['required', 'string', 'max:60'],
            'gender' => ['required', 'string', 'max:60'],
            'year_level' => ['required', 'integer', 'min:1', 'max:4'],
        ];
    }
}
