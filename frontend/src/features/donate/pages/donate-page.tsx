import { HeartHandshake } from 'lucide-react'
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

export function DonatePage({
  settings,
  language,
  onLanguageChange,
}: Props) {
  const isArabic = language === 'ar'

  return (
    <>
      <SEO
        title={isArabic ? 'تبرع الآن' : 'Donate'}
        description={
          isArabic
            ? 'ساهم في دعم برامج ومشاريع مؤسسة Safe Action.'
            : 'Support Safe Action Foundation programs and initiatives.'
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
              {isArabic ? 'تبرع الآن' : 'Donate'}
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">
              {isArabic
                ? 'كن سبباً في صناعة الأثر'
                : 'Help Us Create Lasting Impact'}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-blue-100">
              {isArabic
                ? 'دعمكم يساعدنا على الوصول إلى المجتمعات الأكثر احتياجاً وتنفيذ برامج الحماية والتنمية الإنسانية.'
                : 'Your support helps us reach vulnerable communities and implement humanitarian and development programs.'}
            </p>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-[#1577ce] text-white">
              <HeartHandshake size={32} />
            </div>

            <h2 className="mt-8 text-4xl font-black text-slate-950">
              {isArabic ? 'طرق التبرع' : 'Ways to Donate'}
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-7">
                <p className="text-sm font-extrabold uppercase tracking-wider text-[#ff8905]">
                  {isArabic ? 'تحويل بنكي' : 'Bank Transfer'}
                </p>

                <div className="mt-5 space-y-3 text-slate-700">
                  <p>
                    <span className="font-black">Bank:</span> Safe Action Bank
                  </p>

                  <p>
                    <span className="font-black">IBAN:</span>{' '}
                    <span dir="ltr">SA123456789000000</span>
                  </p>

                  <p>
                    <span className="font-black">SWIFT:</span>{' '}
                    <span dir="ltr">SAFACTION</span>
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-50 p-7">
                <p className="text-sm font-extrabold uppercase tracking-wider text-[#ff8905]">
                  {isArabic ? 'تواصل معنا' : 'Contact Us'}
                </p>

                <div className="mt-5 space-y-3 text-slate-700">
                  <p>{settings?.email}</p>
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                        <p className="inline-block" dir="ltr">
                            {settings?.phone}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter settings={settings} language={language} />
      </main>
    </>
  )
}