<?php

use App\Models\News;
use App\Models\Program;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sitemap.xml', function () {
    $programs = Program::query()
        ->where('is_published', true)
        ->get();

    $news = News::query()
        ->where('is_published', true)
        ->get();

    return response()->view('sitemap', [
        'programs' => $programs,
        'news' => $news,
    ])->header('Content-Type', 'application/xml');
});
