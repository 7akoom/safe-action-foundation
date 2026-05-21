<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'organization_name_en' => $this->organization_name_en,
            'organization_name_ar' => $this->organization_name_ar,

            'tagline_en' => $this->tagline_en,
            'tagline_ar' => $this->tagline_ar,

            'hero_title_en' => $this->hero_title_en,
            'hero_title_ar' => $this->hero_title_ar,

            'hero_description_en' => $this->hero_description_en,
            'hero_description_ar' => $this->hero_description_ar,

            'hero_image_url' => $this->hero_image
                ? Storage::url($this->hero_image)
                : null,

            'logo_url' => $this->logo
                ? Storage::url($this->logo)
                : null,

            'email' => $this->email,
            'phone' => $this->phone,

            'location_en' => $this->location_en,
            'location_ar' => $this->location_ar,

            'facebook_url' => $this->facebook_url,
            'instagram_url' => $this->instagram_url,
            'linkedin_url' => $this->linkedin_url,
            'twitter_url' => $this->twitter_url,

            'seo_title_en' => $this->seo_title_en,
            'seo_title_ar' => $this->seo_title_ar,

            'seo_description_en' => $this->seo_description_en,
            'seo_description_ar' => $this->seo_description_ar,

            'about_title_en' => $this->about_title_en,
            'about_title_ar' => $this->about_title_ar,
            'about_description_en' => $this->about_description_en,
            'about_description_ar' => $this->about_description_ar,

            'mission_title_en' => $this->mission_title_en,
            'mission_title_ar' => $this->mission_title_ar,
            'mission_description_en' => $this->mission_description_en,
            'mission_description_ar' => $this->mission_description_ar,

            'vision_title_en' => $this->vision_title_en,
            'vision_title_ar' => $this->vision_title_ar,
            'vision_description_en' => $this->vision_description_en,
            'vision_description_ar' => $this->vision_description_ar,

            'beneficiaries_count' => $this->beneficiaries_count,
            'programs_count' => $this->programs_count,
            'volunteers_count' => $this->volunteers_count,
            'partners_count' => $this->partners_count,

            'about_image_url' => $this->about_image
                ? Storage::url($this->about_image)
                : null,
        ];
    }
}
