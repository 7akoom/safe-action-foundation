<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Models\Program;

class ProgramController extends Controller
{
    public function show(string $slug): ProgramResource
    {
        $program = Program::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return new ProgramResource($program);
    }
}
