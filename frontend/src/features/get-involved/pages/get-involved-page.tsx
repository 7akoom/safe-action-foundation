import { HandHeart, Users, BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiteFooter } from '../../../components/layout/site-footer'
import { SiteHeader } from '../../../components/layout/site-header'
import { SEO } from '../../../components/seo/seo'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

export function GetInvolvedPage({ settings, language, onLanguageChange }: Props) {
  const isArabic = language === 'ar'

  const items = [
    {
      icon: Users,
      title: isArabic ? 'تطوع معنا' : 'Volunteer With Us',
      description: isArabic
        ? 'انضم إلى شبكة المتطوعين وساهم في دعم المجتمعات.'
        : 'Join our volunteer network and contribute to supporting communities.',
    },
    {
      icon: HandHeart,
      title: isArabic ? 'الشراكات' : 'Partnerships',
      description: isArabic
        ? 'نتعاون مع الشركاء لتعزيز الأثر الإنساني والتنموي.'
        : 'We collaborate with partners to strengthen humanitarian and development impact.',
    },
    {
      icon: BriefcaseBusiness,
      title: isArabic ? 'فرص العمل' : 'Careers',
      description: isArabic
        ? 'تابع فرص العمل والانضمام إلى فريق المؤسسة.'
        : 'Explore opportunities to join the Safe Action team.',
    },
  ]

  return (
    <>
      <SEO
        title={isArabic ? 'شارك معنا' : 'Get Involved'}
        description={
          isArabic
            ? 'تعرف على طرق المشاركة مع مؤسسة Safe Action.'
            : 'Learn how to get involved with Safe Action Foundation.'
        }
      />

      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader settings={settings} language={language} onLanguageChange={onLanguageChange} />

        <section className="bg-[#1577ce] px-6 py-28 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
              {isArabic ? 'شارك معنا' : 'Get Involved'}
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">
              {isArabic ? 'كن جزءاً من الأثر' : 'Be Part of the Impact'}
            </h1>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#1577ce] text-white">
                  <item.icon size={26} />
                </div>

                <h2 className="mt-7 text-2xl font-black text-slate-950">
                  {item.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl rounded-[2rem] bg-slate-50 p-10 text-center">
            <h2 className="text-3xl font-black text-slate-950">
              {isArabic ? 'هل ترغب بالتواصل معنا؟' : 'Want to connect with us?'}
            </h2>

            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-full bg-[#1577ce] px-7 py-4 text-sm font-bold text-white"
            >
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}