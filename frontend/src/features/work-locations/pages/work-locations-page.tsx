import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../api/client'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'

interface WorkLocation {
  id: number
  name_en: string
  name_ar: string
  description_en: string | null
  description_ar: string | null
  country_en: string | null
  country_ar: string | null
  city_en: string | null
  city_ar: string | null
  featured_image_url: string | null
}

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function WorkLocationsPage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const [locations, setLocations] = useState<WorkLocation[]>([])

  const isArabic = language === 'ar'

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/work-locations`)
      .then((response) => response.json())
      .then((data) => setLocations(data.locations ?? []))
      .catch(console.error)
  }, [])

  return (
    <>
      <SEO
        title={isArabic ? 'أماكن عملنا' : 'Where We Work'}
        description={
          isArabic
            ? 'اكتشف المناطق التي تعمل فيها مؤسسة Safe Action.'
            : 'Discover where Safe Action Foundation operates.'
        }
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="bg-[#1577ce] px-6 py-28 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
              {isArabic ? 'أماكن عملنا' : 'Where We Work'}
            </p>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              {isArabic
                ? 'نصل إلى المجتمعات الأكثر احتياجاً'
                : 'Reaching Communities Most in Need'}
            </h1>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <article
                key={location.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-60 overflow-hidden bg-slate-100">
                  {location.featured_image_url ? (
                    <img
                      src={`${API_BASE_URL}${location.featured_image_url}`}
                      alt={isArabic ? location.name_ar : location.name_en}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1577ce] text-5xl font-black text-white">
                      {(isArabic ? location.name_ar : location.name_en)
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <p className="text-sm font-extrabold uppercase tracking-wider text-[#ff8905]">
                    {isArabic
                      ? location.country_ar
                      : location.country_en}
                  </p>

                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    {isArabic ? location.name_ar : location.name_en}
                  </h2>

                  <p className="mt-5 leading-7 text-slate-600">
                    {isArabic
                      ? location.description_ar
                      : location.description_en}
                  </p>
                </div>
              </article>
            ))}
            {locations.length === 0 && (
              <div className="col-span-full rounded-[2rem] bg-slate-50 p-10 text-center">
                <p className="text-lg font-bold text-slate-600">
                  {isArabic
                    ? 'لا توجد مواقع عمل منشورة حالياً.'
                    : 'No work locations have been published yet.'}
                </p>
              </div>
            )}
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}