<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkLocation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class WorkLocationController extends Controller
{
    public function index(): JsonResponse
    {
        $locations = WorkLocation::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn(WorkLocation $location): array => [
                'id' => $location->id,

                'name_en' => $location->name_en,
                'name_ar' => $location->name_ar,

                'description_en' => $location->description_en,
                'description_ar' => $location->description_ar,

                'country_en' => $location->country_en,
                'country_ar' => $location->country_ar,

                'city_en' => $location->city_en,
                'city_ar' => $location->city_ar,

                'featured_image_url' => $location->featured_image
                    ? Storage::url($location->featured_image)
                    : null,

                'sort_order' => $location->sort_order,
            ]);

        return response()->json([
            'locations' => $locations,
        ]);
    }
}
