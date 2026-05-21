import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../../api/client'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'

interface NewsItem {
  id: number
  title_en: string
  title_ar: string
  slug: string
  excerpt_en: string | null
  excerpt_ar: string | null
  featured_image_url: string | null
  published_at: string | null
}

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function NewsPage({ settings, language, onLanguageChange }: Props) {
  const [news, setNews] = useState<NewsItem[]>([])
  const isArabic = language === 'ar'

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then((response) => response.json())
      .then((data) => setNews(data.news ?? []))
      .catch(console.error)
  }, [])

  return (
    <>
      <SEO
        title={isArabic ? 'الأخبار' : 'News'}
        description={
          isArabic
            ? 'آخر أخبار وأنشطة مؤسسة Safe Action.'
            : 'Latest news and updates from Safe Action Foundation.'
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
              {isArabic ? 'الأخبار' : 'News'}
            </p>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              {isArabic ? 'آخر الأخبار والأنشطة' : 'Latest News & Updates'}
            </h1>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-60 overflow-hidden bg-slate-100">
                  {item.featured_image_url ? (
                    <img
                      src={`${API_BASE_URL}${item.featured_image_url}`}
                      alt={localizedField(item, 'title', language)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1577ce] text-5xl font-black text-white">
                      {localizedField(item, 'title', language).slice(0, 2)}
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <h2 className="text-2xl font-black text-slate-950">
                    {localizedField(item, 'title', language)}
                  </h2>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                    {localizedField(item, 'excerpt', language)}
                  </p>

                  <Link
                    to={`/news/${item.slug}`}
                    className="mt-6 inline-flex text-sm font-black text-[#1577ce]"
                  >
                    {isArabic ? 'قراءة المزيد ←' : 'Read More →'}
                  </Link>
                </div>
              </article>
            ))}
            {news.length === 0 && (
              <div className="col-span-full rounded-[2rem] bg-slate-50 p-10 text-center">
                <p className="text-lg font-bold text-slate-600">
                  {isArabic
                    ? 'لا توجد أخبار منشورة حالياً.'
                    : 'No news has been published yet.'}
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