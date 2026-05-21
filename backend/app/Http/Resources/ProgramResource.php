<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title_en' => $this->title_en,
            'title_ar' => $this->title_ar,

            'slug' => $this->slug,

            'short_description_en' => $this->short_description_en,
            'short_description_ar' => $this->short_description_ar,

            'description_en' => $this->description_en,
            'description_ar' => $this->description_ar,

            'featured_image_url' => $this->featured_image
                ? Storage::url($this->featured_image)
                : null,

            'icon_url' => $this->icon
                ? Storage::url($this->icon)
                : null,

            'sort_order' => $this->sort_order,

            'is_published' => $this->is_published,
            'published_at' => $this->published_at,

            'seo_title_en' => $this->seo_title_en,
            'seo_title_ar' => $this->seo_title_ar,

            'seo_description_en' => $this->seo_description_en,
            'seo_description_ar' => $this->seo_description_ar,
        ];
    }
}
