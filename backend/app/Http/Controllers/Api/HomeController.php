<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\SettingResource;
use App\Models\Program;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Setting::query()->first();

        $programs = Program::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'settings' => $settings ? new SettingResource($settings) : null,
            'programs' => ProgramResource::collection($programs),
        ]);
    }
}
