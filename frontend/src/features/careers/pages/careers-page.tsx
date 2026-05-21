import { BriefcaseBusiness, CalendarDays, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  short_description_en: string | null
  short_description_ar: string | null
  deadline: string | null
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

export function CareersPage({ settings, language, onLanguageChange }: Props) {
  const [careers, setCareers] = useState<Career[]>([])
  const isArabic = language === 'ar'

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/careers`)
      .then((response) => response.json())
      .then((data) => setCareers(data.careers ?? []))
      .catch(console.error)
  }, [])

  return (
    <>
      <SEO
        title={isArabic ? 'الوظائف' : 'Careers'}
        description={
          isArabic
            ? 'فرص العمل المتاحة لدى مؤسسة Safe Action.'
            : 'Explore career opportunities with Safe Action Foundation.'
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
              {isArabic ? 'الوظائف' : 'Careers'}
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">
              {isArabic ? 'انضم إلى فريقنا' : 'Join Our Team'}
            </h1>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl space-y-6">
            {careers.map((career) => (
              <article
                key={career.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wider text-[#ff8905]">
                      {localizedField(career, 'department', language)}
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-slate-950">
                      {localizedField(career, 'title', language)}
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                      {localizedField(career, 'short_description', language)}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={17} />
                        {localizedField(career, 'location', language)}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <BriefcaseBusiness size={17} />
                        {localizedField(career, 'employment_type', language)}
                      </span>

                      {career.deadline && (
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={17} />
                          {isArabic ? 'آخر موعد:' : 'Deadline:'}{' '}
                          {formatDate(career.deadline, isArabic)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/careers/${career.slug}`}
                    className="shrink-0 rounded-full bg-[#1577ce] px-6 py-3 text-center text-sm font-bold text-white"
                  >
                    {isArabic ? 'عرض التفاصيل' : 'View Details'}
                  </Link>
                </div>
              </article>
            ))}

            {careers.length === 0 && (
              <div className="rounded-[2rem] bg-slate-50 p-10 text-center">
                <p className="text-lg font-bold text-slate-600">
                  {isArabic
                    ? 'لا توجد وظائف متاحة حالياً.'
                    : 'No open positions are available at the moment.'}
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