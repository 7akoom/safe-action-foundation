<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = [
        'title_en',
        'title_ar',

        'slug',

        'location_en',
        'location_ar',

        'employment_type_en',
        'employment_type_ar',

        'department_en',
        'department_ar',

        'short_description_en',
        'short_description_ar',

        'description_en',
        'description_ar',

        'requirements_en',
        'requirements_ar',

        'apply_email',
        'apply_url',

        'deadline',

        'is_published',

        'seo_title_en',
        'seo_title_ar',

        'seo_description_en',
        'seo_description_ar',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'date',
            'is_published' => 'boolean',
        ];
    }
}
