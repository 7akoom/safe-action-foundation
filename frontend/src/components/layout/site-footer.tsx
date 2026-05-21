import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../api/client'
import type { Language } from '../../lib/language'
import type { Settings } from '../../types/home'
import { localizedField } from '../../utils/localized-field'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6'

interface Props {
  settings: Settings | null
  language: Language
}

const quickLinks = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
  { labelEn: 'About Us', labelAr: 'من نحن', href: '/about' },
  { labelEn: 'Programs', labelAr: 'البرامج', href: '/programs' },
  { labelEn: 'Where We Work', labelAr: 'أماكن عملنا', href: '/where-we-work' },
  { labelEn: 'News', labelAr: 'الأخبار', href: '/news' },
  { labelEn: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
]

export function SiteFooter({ settings, language }: Props) {
  const isArabic = language === 'ar'

  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center">
            <img
              src={
                settings?.logo_url
                  ? `${API_BASE_URL}${settings.logo_url}`
                  : '/logo.svg'
              }
              alt="Safe Action Foundation"
              className="h-14 w-auto max-w-[220px] object-contain"
              onError={(event) => {
                event.currentTarget.src = '/logo.svg'
              }}
            />
          </Link>

          <p className="mt-5 max-w-sm leading-7 text-slate-600">
            {localizedField(settings, 'hero_description', language)}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">
            {isArabic ? 'روابط سريعة' : 'Quick Links'}
          </h3>

          <div className="mt-5 grid gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-[#1577ce]"
              >
                {isArabic ? item.labelAr : item.labelEn}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">
            {isArabic ? 'التواصل' : 'Contact'}
          </h3>

          <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="inline-block" dir="ltr">
                {settings?.email}
              </p>
            </div>

            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="inline-block" dir="ltr">
                {settings?.phone}
              </p>
            </div>

            <p>{localizedField(settings, 'location', language)}</p>

            <div className="flex items-center gap-3 pt-4">
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#1577ce] hover:text-white"
                >
                  <FaFacebookF size={18} />
                </a>
              )}

              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#ff8905] hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {settings?.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#1577ce] hover:text-white"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}

              {settings?.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-950 hover:text-white"
                >
                  <FaXTwitter size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-200 px-6 pt-6">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()}{' '}
          {localizedField(settings, 'organization_name', language) ||
            'Safe Action Foundation'}
          . {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}