import { motion } from 'framer-motion'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'
import { API_BASE_URL } from '../../../api/client'

interface Props {
  settings: Settings | null
  language: Language
}

export function AboutSection({ settings, language }: Props) {
  const isArabic = language === 'ar'

  return (
    <section id="about" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              src={
                settings?.about_image_url
                  ? `${API_BASE_URL}${settings.about_image_url}`
                  : 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1400&auto=format&fit=crop'
              }
              alt={localizedField(settings, 'about_title', language) || 'About Safe Action'}
              className="h-[620px] w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
            {isArabic ? 'من نحن' : 'About Us'}
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            {localizedField(settings, 'about_title', language)}
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            {localizedField(settings, 'about_description', language)}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h3 className="text-xl font-black text-slate-900">
                {localizedField(settings, 'mission_title', language)}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {localizedField(settings, 'mission_description', language)}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h3 className="text-xl font-black text-slate-900">
                {localizedField(settings, 'vision_title', language)}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {localizedField(settings, 'vision_description', language)}
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#1577ce]">
                {settings?.programs_count ?? 0}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {isArabic ? 'البرامج' : 'Programs'}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#1577ce]">
                {settings?.volunteers_count ?? 0}+
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {isArabic ? 'متطوع' : 'Volunteers'}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#1577ce]">
                {settings?.beneficiaries_count ?? 0}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {isArabic ? 'مستفيد' : 'Beneficiaries'}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#1577ce]">
                {settings?.partners_count ?? 0}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {isArabic ? 'شريك' : 'Partners'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}