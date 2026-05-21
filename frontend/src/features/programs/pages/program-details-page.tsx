import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import { type Language } from '../../../lib/language'
import type { Program, Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'
import { API_BASE_URL } from '../../../api/client'

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function ProgramDetailsPage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const { slug } = useParams()

  const [program, setProgram] = useState<Program | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const isArabic = language === 'ar'

  useEffect(() => {
    setIsLoading(true)
    setNotFound(false)

    fetch(`${API_BASE_URL}/api/programs/${slug}`)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true)
          return null
        }

        return response.json()
      })
      .then((data) => {
        if (data?.data) {
          setProgram(data.data)
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
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="h-96 rounded-[2rem] bg-slate-100" />

            <div className="mt-10 h-14 w-3/4 rounded-3xl bg-slate-200" />

            <div className="mt-6 h-5 w-full rounded-full bg-slate-200" />
            <div className="mt-3 h-5 w-2/3 rounded-full bg-slate-200" />

            <div className="mt-12 h-[500px] rounded-[2rem] bg-slate-100" />
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    )
  }

  if (notFound || !program) {
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
              {isArabic ? 'البرنامج غير موجود' : 'Program not found'}
            </h1>

            <p className="mt-4 text-slate-600">
              {isArabic
                ? 'ربما تم حذف هذا البرنامج أو لم يعد متاحاً.'
                : 'This program may have been removed or is no longer available.'}
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
          localizedField(program, 'seo_title', language) ||
          localizedField(program, 'title', language)
        }
        description={
          localizedField(program, 'seo_description', language) ||
          localizedField(program, 'short_description', language)
        }
        image={
          program.featured_image_url
            ? `${API_BASE_URL}${program.featured_image_url}`
            : undefined
        }
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={settings}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-black text-[#1577ce]"
            >
              <ArrowLeft size={18} />
              {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
                  {isArabic ? 'برنامج' : 'Program'}
                </p>

                <h1 className="mt-5 text-5xl font-black leading-tight text-slate-950 md:text-7xl">
                  {localizedField(program, 'title', language)}
                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
                  {localizedField(program, 'short_description', language)}
                </p>
              </div>

              <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl">
                {program.featured_image_url ? (
                  <img
                    src={`${API_BASE_URL}${program.featured_image_url}`}
                    alt={localizedField(program, 'title', language)}
                    className="h-[420px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
                    <p className="text-7xl font-black text-[#1577ce]">
                      {localizedField(program, 'title', language)
                        .slice(0, 2)
                        .toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">
                {isArabic ? 'محاور البرنامج' : 'Program Focus'}
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  isArabic
                    ? 'نهج يركز على الحماية'
                    : 'Protection-centered approach',

                  isArabic
                    ? 'تنفيذ قائم على المجتمع'
                    : 'Community-based implementation',

                  isArabic
                    ? 'دعم شامل ومسؤول'
                    : 'Inclusive and accountable support',
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2
                      className="mt-1 text-[#1577ce]"
                      size={20}
                    />

                    <p className="font-semibold leading-7 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <article className="rounded-[2rem] bg-slate-50 p-8 md:p-12">
              <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#ff8905]">
                {isArabic ? 'نظرة عامة' : 'Overview'}
              </p>

              <h2 className="mt-4 text-3xl font-black text-slate-950">
                {isArabic ? 'حول البرنامج' : 'About this Program'}
              </h2>

              <p className="mt-8 text-lg leading-9 text-slate-700">
                {localizedField(program, 'description', language)}
              </p>
            </article>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#ff8905]">
                {isArabic ? 'تواصل معنا' : 'Get in Touch'}
              </p>

              <h2 className="mt-4 text-3xl font-black">
                {isArabic
                  ? 'مهتم بهذا البرنامج؟'
                  : 'Interested in this program?'}
              </h2>
            </div>

            <Link
              to="/"
              state={{ scrollTo: 'contact' }}
              className="rounded-full bg-[#1577ce] px-7 py-4 text-center text-sm font-bold text-white"
            >
              {isArabic ? 'تواصل مع المؤسسة' : 'Contact Safe Action'}
            </Link>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}