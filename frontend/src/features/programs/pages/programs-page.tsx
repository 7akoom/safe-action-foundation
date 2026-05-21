import { SEO } from '../../../components/seo/seo'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { ProgramsSection } from '../../home/components/programs-section'
import type { Language } from '../../../lib/language'
import type { Program, Settings } from '../../../types/home'

interface Props {
  settings: Settings | null
  programs: Program[]
  language: Language
  onLanguageChange: (language: Language) => void
}

export function ProgramsPage({
  settings,
  programs,
  language,
  onLanguageChange,
}: Props) {
  const isArabic = language === 'ar'

  return (
    <>
      <SEO
        title={isArabic ? 'برامجنا' : 'Our Programs'}
        description={
          isArabic
            ? 'تعرّف على برامج مؤسسة Safe Action الإنسانية والتنموية.'
            : 'Explore Safe Action Foundation humanitarian and development programs.'
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
              {isArabic ? 'برامجنا' : 'Our Programs'}
            </p>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              {isArabic
                ? 'برامج متكاملة لدعم المجتمعات'
                : 'Integrated Programs for Community Support'}
            </h1>
          </div>
        </section>

        <ProgramsSection programs={programs} language={language} />

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}