import { SEO } from '../../../components/seo/seo'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { AboutSection } from '../../home/components/about-section'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function AboutPage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const isArabic = language === 'ar'

  return (
    <>
      <SEO
        title={isArabic ? 'من نحن' : 'About Us'}
        description={
          isArabic
            ? 'تعرف على مؤسسة Safe Action ورسالتها الإنسانية.'
            : 'Learn more about Safe Action Foundation and its humanitarian mission.'
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
              {isArabic ? 'من نحن' : 'About Us'}
            </p>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              {isArabic
                ? 'نبني مجتمعات أكثر أماناً وكرامة'
                : 'Building Safer & Stronger Communities'}
            </h1>
          </div>
        </section>

        <AboutSection settings={settings} language={language} />

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}