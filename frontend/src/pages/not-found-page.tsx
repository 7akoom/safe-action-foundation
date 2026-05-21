import { Link } from 'react-router-dom'
import type { Language } from '../lib/language'

interface Props {
  language: Language
}

export function NotFoundPage({ language }: Props) {
  const isArabic = language === 'ar'

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
          404 Error
        </p>

        <h1 className="mt-6 text-5xl font-black text-slate-950 md:text-7xl">
          {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          {isArabic
            ? 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.'
            : 'The page you are looking for does not exist or may have been moved.'}
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex rounded-full bg-[#1577ce] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-[#0f66b3]"
        >
          {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </main>
  )
}