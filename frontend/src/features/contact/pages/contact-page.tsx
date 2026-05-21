import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import { ContactSection } from '../../home/components/contact-section'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function ContactPage({ settings, language, onLanguageChange }: Props) {
  const isArabic = language === 'ar'

  return (
    <>
      <SEO
        title={isArabic ? 'تواصل معنا' : 'Contact Us'}
        description={isArabic ? 'تواصل مع مؤسسة Safe Action.' : 'Contact Safe Action Foundation.'}
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader settings={settings} language={language} onLanguageChange={onLanguageChange} />
        <ContactSection settings={settings} language={language} />
        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}