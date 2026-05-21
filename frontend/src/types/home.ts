export interface Settings {
  organization_name_en: string
  organization_name_ar: string

  hero_title_en: string | null
  hero_title_ar: string | null

  hero_description_en: string | null
  hero_description_ar: string | null

  hero_image_url: string | null

  logo_url: string | null

  about_title_en: string | null
  about_title_ar: string | null
  about_description_en: string | null
  about_description_ar: string | null

  mission_title_en: string | null
  mission_title_ar: string | null
  mission_description_en: string | null
  mission_description_ar: string | null

  vision_title_en: string | null
  vision_title_ar: string | null
  vision_description_en: string | null
  vision_description_ar: string | null

  beneficiaries_count: number
  programs_count: number
  volunteers_count: number
  partners_count: number

  about_image_url: string | null

  email: string | null
  phone: string | null
  location_en: string | null
  location_ar: string | null

  tagline_en: string | null
  tagline_ar: string | null

  seo_title_en: string | null
  seo_title_ar: string | null

  seo_description_en: string | null
  seo_description_ar: string | null

  facebook_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
}

export interface Program {
  id: number

  title_en: string
  title_ar: string

  slug: string

  short_description_en: string | null
  short_description_ar: string | null

  featured_image_url: string | null

  description_en: string | null
  description_ar: string | null

  seo_title_en: string | null
  seo_title_ar: string | null

  seo_description_en: string | null
  seo_description_ar: string | null
}

export interface HomeResponse {
  settings: Settings | null
  programs: Program[]
}