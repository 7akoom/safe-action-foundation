import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../api/client'
import type { Language } from '../../lib/language'
import type { Settings } from '../../types/home'
import { Container } from './container'

interface Props {
  settings: Settings | null
  language: Language
  onLanguageChange: (language: Language) => void
}

const navItems = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
  { labelEn: 'About Us', labelAr: 'من نحن', href: '/about' },
  { labelEn: 'Programs', labelAr: 'البرامج', href: '/programs' },
  { labelEn: 'Where We Work', labelAr: 'أماكن عملنا', href: '/where-we-work' },
  { labelEn: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
]

const moreItems = [
  { labelEn: 'Get Involved', labelAr: 'شارك معنا', href: '/get-involved' },
  { labelEn: 'Donate', labelAr: 'تبرع', href: '/donate' },
  { labelEn: 'News', labelAr: 'الأخبار', href: '/news' },
  { labelEn: 'Careers', labelAr: 'الوظائف', href: '/careers' },
]

export function SiteHeader({ settings, language, onLanguageChange }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const isArabic = language === 'ar'

  const toggleLanguage = () => {
    onLanguageChange(isArabic ? 'en' : 'ar')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={
                settings?.logo_url
                  ? `${API_BASE_URL}${settings.logo_url}`
                  : '/logo.svg'
              }
              alt="Safe Action Foundation"
              className="h-12 w-auto max-w-[170px] object-contain sm:h-14 sm:max-w-[200px] lg:h-16 lg:max-w-[220px]"
              onError={(event) => {
                event.currentTarget.src = '/logo.svg'
              }}
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-extrabold text-slate-700 transition hover:text-[#1577ce]"
              >
                {isArabic ? item.labelAr : item.labelEn}
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen((value) => !value)}
                className="inline-flex items-center gap-1 text-sm font-extrabold text-slate-700 transition hover:text-[#1577ce]"
              >
                {isArabic ? 'المزيد' : 'More'}
                <ChevronDown size={16} />
              </button>

              {isMoreOpen && (
                <div
                  className={`absolute top-full mt-4 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ${
                    isArabic ? 'left-0' : 'right-0'
                  }`}
                >
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#1577ce]"
                    >
                      {isArabic ? item.labelAr : item.labelEn}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#1577ce] hover:text-[#1577ce]"
            >
              {isArabic ? 'English' : 'العربية'}
            </button>

            <Link
              to="/contact"
              className="rounded-full bg-[#1577ce] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-[#0f66b3]"
            >
              {isArabic ? 'تواصل معنا' : 'Get in Touch'}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 py-5 lg:hidden">
            <nav className="flex flex-col gap-3">
              {[...navItems, ...moreItems].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#1577ce]"
                >
                  {isArabic ? item.labelAr : item.labelEn}
                </Link>
              ))}

              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
              >
                {isArabic ? 'English' : 'العربية'}
              </button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}