export type Language = 'en' | 'ar'

export const DEFAULT_LANGUAGE: Language = 'en'

export function getInitialLanguage(): Language {
  return localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
}

export function setDocumentLanguage(language: Language) {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}