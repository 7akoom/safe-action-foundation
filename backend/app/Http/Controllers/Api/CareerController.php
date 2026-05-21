<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\JsonResponse;

class CareerController extends Controller
{
    public function index(): JsonResponse
    {
        $careers = Career::query()
            ->where('is_published', true)
            ->orderByRaw('deadline IS NULL')
            ->orderBy('deadline')
            ->latest()
            ->get()
            ->map(fn(Career $career): array => $this->formatCareer($career));

        return response()->json([
            'careers' => $careers,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $career = Career::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'data' => $this->formatCareer($career),
        ]);
    }

    private function formatCareer(Career $career): array
    {
        return [
            'id' => $career->id,

            'title_en' => $career->title_en,
            'title_ar' => $career->title_ar,

            'slug' => $career->slug,

            'location_en' => $career->location_en,
            'location_ar' => $career->location_ar,

            'employment_type_en' => $career->employment_type_en,
            'employment_type_ar' => $career->employment_type_ar,

            'department_en' => $career->department_en,
            'department_ar' => $career->department_ar,

            'short_description_en' => $career->short_description_en,
            'short_description_ar' => $career->short_description_ar,

            'description_en' => $career->description_en,
            'description_ar' => $career->description_ar,

            'requirements_en' => $career->requirements_en,
            'requirements_ar' => $career->requirements_ar,

            'apply_email' => $career->apply_email,
            'apply_url' => $career->apply_url,

            'deadline' => $career->deadline,

            'seo_title_en' => $career->seo_title_en,
            'seo_title_ar' => $career->seo_title_ar,

            'seo_description_en' => $career->seo_description_en,
            'seo_description_ar' => $career->seo_description_ar,
        ];
    }
}
