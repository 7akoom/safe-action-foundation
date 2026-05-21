import type { Language } from '../lib/language'

export function localizedField(
  item: unknown,
  field: string,
  language: Language,
): string {
  if (!item || typeof item !== 'object') return ''

  const record = item as Record<string, unknown>

  const localizedKey = `${field}_${language}`
  const fallbackKey = `${field}_en`

  const value = record[localizedKey] ?? record[fallbackKey]

  return typeof value === 'string' ? value : ''
}