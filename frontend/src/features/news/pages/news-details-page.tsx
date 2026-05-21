import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

  excerpt_en: string | null
  excerpt_ar: string | null

  content_en: string
  content_ar: string

  featured_image_url: string | null

  seo_title_en: string | null
  seo_title_ar: string | null

  seo_description_en: string | null
  seo_description_ar: string | null

  published_at: string | null
}

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function NewsDetailsPage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const { slug } = useParams()

  const [news, setNews] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const isArabic = language === 'ar'

  useEffect(() => {
    setIsLoading(true)
    setNotFound(false)

    fetch(`${API_BASE_URL}/api/news/${slug}`)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true)
          return null
        }

        return response.json()
      })
      .then((data) => {
        if (data?.data) {
          setNews(data.data)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false))
  }, [slug])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl animate-pulse">
            <div className="h-80 rounded-[2rem] bg-slate-100" />
            <div className="mt-10 h-12 w-3/4 rounded-3xl bg-slate-200" />
            <div className="mt-6 h-5 w-full rounded-full bg-slate-200" />
            <div className="mt-3 h-5 w-2/3 rounded-full bg-slate-200" />
            <div className="mt-12 h-64 rounded-[2rem] bg-slate-100" />
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    )
  }

  if (notFound || !news) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-4xl font-black text-slate-950">
              {isArabic ? 'الخبر غير موجود' : 'News not found'}
            </h1>

            <p className="mt-4 text-slate-600">
              {isArabic
                ? 'ربما تم حذف هذا الخبر أو لم يعد متاحاً.'
                : 'This news item may have been removed or is no longer available.'}
            </p>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    )
  }

  return (
    <>
      <SEO
        title={
          localizedField(news, 'seo_title', language) ||
          localizedField(news, 'title', language)
        }
        description={
          localizedField(news, 'seo_description', language) ||
          localizedField(news, 'excerpt', language)
        }
        image={
          news.featured_image_url
            ? `${API_BASE_URL}${news.featured_image_url}`
            : undefined
        }
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="relative overflow-hidden">
          <div className="h-[520px] bg-slate-100">
            {news.featured_image_url ? (
              <img
                src={`${API_BASE_URL}${news.featured_image_url}`}
                alt={localizedField(news, 'title', language)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#1577ce] text-7xl font-black text-white">
                {localizedField(news, 'title', language).slice(0, 2)}
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-end px-6 pb-16">
            <div className="mx-auto w-full max-w-5xl text-white">
              <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                {localizedField(news, 'title', language)}
              </h1>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div
              className="prose prose-lg max-w-none prose-headings:font-black prose-img:rounded-3xl"
              dangerouslySetInnerHTML={{
                __html: localizedField(news, 'content', language),
              }}
            />
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}