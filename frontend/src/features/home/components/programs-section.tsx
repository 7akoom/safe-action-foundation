import { Link } from 'react-router-dom'
import type { Language } from '../../../lib/language'
import type { Program } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'
import { API_BASE_URL } from '../../../api/client'

interface Props {
  programs: Program[]
  language: Language
}

export function ProgramsSection({ programs, language }: Props) {
  const isArabic = language === 'ar'

  return (
    <section id="programs" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#ff8905]">
            {isArabic ? 'برامجنا' : 'Our Programs'}
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
            {isArabic
              ? 'دعم متكامل لبناء مجتمعات أكثر أماناً وقوة'
              : 'Integrated support for safer, stronger communities'}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {isArabic
              ? 'تقدم مؤسسة Safe Action برامج إنسانية وتنموية تركز على الحماية في مختلف أنحاء سوريا.'
              : 'Safe Action Foundation delivers protection-centered humanitarian and development programs across Syria.'}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 h-52 overflow-hidden rounded-2xl bg-slate-100">
                {program.featured_image_url ? (
                  <img
                    src={`${API_BASE_URL}${program.featured_image_url}`}
                    alt={localizedField(program, 'title', language)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 text-4xl font-black text-[#1577ce]">
                    {localizedField(program, 'title', language)
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-slate-950">
                {localizedField(program, 'title', language)}
              </h3>

              <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                {localizedField(program, 'short_description', language)}
              </p>

              <Link
                to={`/programs/${program.slug}`}
                className="mt-6 inline-flex items-center text-sm font-black text-[#1577ce]"
              >
                {isArabic ? 'عرض البرنامج ←' : 'View Program →'}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}