import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { api } from '../../../api/client'
import type { Language } from '../../../lib/language'
import type { Settings } from '../../../types/home'
import { localizedField } from '../../../utils/localized-field'

interface Props {
  settings: Settings | null
  language: Language
}

export function ContactSection({ settings, language }: Props) {
  const isArabic = language === 'ar'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setStatus('idle')

    try {
      await api.post('/contact-messages', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      })

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-gradient-to-br from-[#1577ce] to-[#0f5fa5] py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff8905]">
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-5xl">
            {isArabic ? 'لنبني مجتمعات أكثر أماناً معاً' : 'Let’s build safer communities together'}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white">
            {isArabic
              ? 'تواصل مع مؤسسة Safe Action للشراكات أو تنسيق البرامج أو الاستفسارات العامة.'
              : 'Reach out to Safe Action Foundation for partnerships, program coordination, or general inquiries.'}
          </p>

          <div className="mt-10 grid gap-5">
            <div className="rounded-3xl bg-white/10 p-6">
              <Mail className="text-[#ff8905]" />
              <p className="mt-4 text-sm font-bold text-[#ff8905]">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </p>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="mt-1 inline-block text-lg font-black" dir="ltr">
                  {settings?.email ?? 'program@Safeactionfoundation.org'}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6">
              <Phone className="text-[#ff8905]" />
              <p className="mt-4 text-sm font-bold text-[#ff8905]">
                {isArabic ? 'الهاتف' : 'Phone'}
              </p>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="mt-1 inline-block text-lg font-black" dir="ltr">
                  {settings?.phone ?? '+963 962 450 07 01'}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6">
              <MapPin className="text-[#ff8905]" />
              <p className="mt-4 text-sm font-bold text-[#ff8905]">
                {isArabic ? 'الموقع' : 'Location'}
              </p>
              <p className="mt-1 text-lg font-black">
                {localizedField(settings, 'location', language) || 'Damascus, Syria'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl">
          <div className="grid gap-5">
            <input name="name" required placeholder={isArabic ? 'الاسم الكامل' : 'Full name'} className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#1577ce]" />
            <input name="email" required type="email" placeholder={isArabic ? 'البريد الإلكتروني' : 'Email address'} className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#1577ce]" />
            <input name="phone" placeholder={isArabic ? 'رقم الهاتف' : 'Phone number'} className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#1577ce]" />
            <input name="subject" required placeholder={isArabic ? 'الموضوع' : 'Subject'} className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#1577ce]" />
            <textarea name="message" required rows={6} placeholder={isArabic ? 'رسالتك' : 'Your message'} className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#1577ce]" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#1577ce] px-7 py-4 text-sm font-bold text-white disabled:opacity-60"
            >
              {isSubmitting
                ? isArabic ? 'جاري الإرسال...' : 'Sending...'
                : isArabic ? 'إرسال الرسالة' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm font-bold text-green-600">
                {isArabic ? 'تم إرسال رسالتك بنجاح.' : 'Your message has been sent successfully.'}
              </p>
            )}

            {status === 'error' && (
              <p className="text-sm font-bold text-red-600">
                {isArabic ? 'حدث خطأ أثناء الإرسال.' : 'Something went wrong. Please try again.'}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}