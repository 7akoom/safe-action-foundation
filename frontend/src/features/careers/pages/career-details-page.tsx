import { BriefcaseBusiness, CalendarDays, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../../api/client'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'

interface Career {
  id: number
  title_en: string
  title_ar: string
  slug: string

  location_en: string | null
  location_ar: string | null

  employment_type_en: string | null
  employment_type_ar: string | null

  department_en: string | null
  department_ar: string | null

  description_en: string | null
  description_ar: string | null

  requirements_en: string | null
  requirements_ar: string | null

  apply_email: string | null
  apply_url: string | null
  deadline: string | null

  seo_title_en: string | null
  seo_title_ar: string | null
  seo_description_en: string | null
  seo_description_ar: string | null
}

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

function formatDate(value: string, isArabic: boolean) {
  return new Intl.DateTimeFormat(isArabic ? 'ar' : 'en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

export function CareerDetailsPage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const { slug } = useParams()
  const [career, setCareer] = useState<Career | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const isArabic = language === 'ar'

  useEffect(() => {
    setIsLoading(true)
    setNotFound(false)

    fetch(`${API_BASE_URL}/api/careers/${slug}`)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true)
          return null
        }

        return response.json()
      })
      .then((data) => {
        if (data?.data) {
          setCareer(data.data)
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
            <div className="h-5 w-40 rounded-full bg-slate-200" />
            <div className="mt-6 h-14 w-3/4 rounded-3xl bg-slate-200" />
            <div className="mt-6 h-5 w-full rounded-full bg-slate-200" />
            <div className="mt-3 h-5 w-2/3 rounded-full bg-slate-200" />
            <div className="mt-12 h-96 rounded-[2rem] bg-slate-100" />
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    )
  }

  if (notFound || !career) {
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
              {isArabic ? 'الوظيفة غير موجودة' : 'Career not found'}
            </h1>

            <p className="mt-4 text-slate-600">
              {isArabic
                ? 'ربما تم حذف هذه الوظيفة أو لم تعد متاحة.'
                : 'This career opportunity may have been removed or is no longer available.'}
            </p>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    )
  }

  const applyHref =
    career.apply_url ||
    `mailto:${career.apply_email ?? settings?.email ?? ''}?subject=${encodeURIComponent(
      localizedField(career, 'title', language),
    )}`

  return (
    <>
      <SEO
        title={
          localizedField(career, 'seo_title', language) ||
          localizedField(career, 'title', language)
        }
        description={
          localizedField(career, 'seo_description', language) ||
          localizedField(career, 'short_description', language)
        }
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="bg-[#1577ce] px-6 py-24 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
              {isArabic ? 'فرصة عمل' : 'Career Opportunity'}
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">
              {localizedField(career, 'title', language)}
            </h1>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold text-blue-100">
              <span className="inline-flex items-center gap-2">
                <MapPin size={18} />
                {localizedField(career, 'location', language)}
              </span>

              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness size={18} />
                {localizedField(career, 'employment_type', language)}
              </span>

              {career.deadline && (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={18} />
                  {isArabic ? 'آخر موعد:' : 'Deadline:'} {formatDate(career.deadline, isArabic)}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
            <article className="rounded-[2rem] bg-slate-50 p-8 md:p-12">
              <h2 className="text-3xl font-black text-slate-950">
                {isArabic ? 'وصف الوظيفة' : 'Job Description'}
              </h2>

              <div
                className="prose prose-lg mt-8 max-w-none prose-headings:font-black"
                dangerouslySetInnerHTML={{
                  __html: localizedField(career, 'description', language),
                }}
              />

              <h2 className="mt-14 text-3xl font-black text-slate-950">
                {isArabic ? 'المتطلبات' : 'Requirements'}
              </h2>

              <div
                className="prose prose-lg mt-8 max-w-none prose-headings:font-black"
                dangerouslySetInnerHTML={{
                  __html: localizedField(career, 'requirements', language),
                }}
              />
            </article>

            <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">
                {isArabic ? 'التقديم' : 'Apply'}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {isArabic
                  ? 'إذا كنت مهتماً بهذه الفرصة، يمكنك التقديم من خلال الرابط أو البريد الإلكتروني.'
                  : 'If you are interested in this opportunity, you can apply using the link or email below.'}
              </p>

              <a
                href={applyHref}
                target={career.apply_url ? '_blank' : undefined}
                rel={career.apply_url ? 'noreferrer' : undefined}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1577ce] px-6 py-4 text-sm font-bold text-white"
              >
                <Mail size={18} />
                {isArabic ? 'قدّم الآن' : 'Apply Now'}
              </a>
            </aside>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}