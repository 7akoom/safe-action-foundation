import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'
import { API_BASE_URL } from '../../../api/client'

interface Props {
  settings: Settings | null
  language: Language
}

export function HeroSection({ settings, language }: Props) {
  const isArabic = language === 'ar'

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <img
        src={
            settings?.hero_image_url
                ? `${API_BASE_URL}${settings.hero_image_url}`
                : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1800&auto=format&fit=crop'
            }
        alt="Community Support"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className={`absolute inset-0 ${
          isArabic
            ? 'bg-gradient-to-l from-white/95 via-white/60 to-transparent'
            : 'bg-gradient-to-r from-white/95 via-white/60 to-transparent'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[88vh] items-center px-6 lg:px-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]"
          >
            {localizedField(settings, 'organization_name', language) || 'Safe Action Foundation'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black leading-tight text-slate-950 md:text-7xl"
          >
            {localizedField(settings, 'hero_title', language) ||
              'Protecting Communities. Restoring Dignity.'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl"
          >
            {localizedField(settings, 'hero_description', language) ||
  'Safe Action Foundation delivers protection-centered humanitarian and development programs that strengthen safety, dignity, and resilience across Syria.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1577ce] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-200 transition hover:scale-[1.02]"
            >
              {language === 'ar' ? 'برامجنا' : 'Explore Programs'}
              <ArrowRight size={18} />
            </a>

            <a
              href="#about"
              className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-900 transition hover:border-[#1577ce] hover:text-[#1577ce]"
            >
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}