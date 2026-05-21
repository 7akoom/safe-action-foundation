<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        $news = News::query()
            ->where('is_published', true)
            ->latest('published_at')
            ->get()
            ->map(fn(News $item): array => $this->formatNews($item));

        return response()->json([
            'news' => $news,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $news = News::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'data' => $this->formatNews($news),
        ]);
    }

    private function formatNews(News $news): array
    {
        return [
            'id' => $news->id,

            'title_en' => $news->title_en,
            'title_ar' => $news->title_ar,

            'slug' => $news->slug,

            'excerpt_en' => $news->excerpt_en,
            'excerpt_ar' => $news->excerpt_ar,

            'content_en' => $news->content_en,
            'content_ar' => $news->content_ar,

            'featured_image_url' => $news->featured_image
                ? Storage::url($news->featured_image)
                : null,

            'seo_title_en' => $news->seo_title_en,
            'seo_title_ar' => $news->seo_title_ar,

            'seo_description_en' => $news->seo_description_en,
            'seo_description_ar' => $news->seo_description_ar,

            'published_at' => $news->published_at,
        ];
    }
}
