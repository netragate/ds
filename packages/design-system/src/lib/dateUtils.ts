export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export function parseIsoDate(iso: string): Date | null {
  if (!ISO_DATE.test(iso)) return null
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function compareIsoDate(a: string, b: string): number {
  if (a === b) return 0
  return a < b ? -1 : 1
}

export function isIsoInRange(iso: string, from: string, to: string): boolean {
  if (!ISO_DATE.test(iso)) return false
  if (from && compareIsoDate(iso, from) < 0) return false
  if (to && compareIsoDate(iso, to) > 0) return false
  return Boolean(from || to)
}

export function normalizeDateRange(from: string, to: string): { from: string; to: string } {
  if (!from || !to) {
    return { from, to }
  }

  if (compareIsoDate(from, to) <= 0) {
    return { from, to }
  }

  return { from: to, to: from }
}

/** Inclusive calendar-day count (same day → 1). Invalid ISO → `null`. */
export function inclusiveDaySpan(from: string, to: string): number | null {
  const start = parseIsoDate(from)
  const end = parseIsoDate(to)
  if (!start || !end) return null

  const msPerDay = 24 * 60 * 60 * 1000
  const diff = Math.round(Math.abs(end.getTime() - start.getTime()) / msPerDay)
  return diff + 1
}

/**
 * Whether `[from, to]` fits `maxRangeDays` (inclusive).
 * Missing / non-positive `maxRangeDays` → always true.
 */
export function isDateRangeWithinMaxDays(
  from: string,
  to: string,
  maxRangeDays?: number,
): boolean {
  if (maxRangeDays == null || maxRangeDays <= 0) return true
  const span = inclusiveDaySpan(from, to)
  if (span === null) return false
  return span <= maxRangeDays
}

export function resolveIntlLocale(locale?: string): string {
  return locale === 'pt-BR' ? 'pt-BR' : 'en-US'
}

export function formatIsoForLocale(iso: string, locale?: string): string {
  const date = parseIsoDate(iso)
  if (!date) return ''
  return new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateRangeForLocale(
  from: string,
  to: string,
  locale?: string,
): string {
  if (!from && !to) return ''
  if (from && !to) return `${formatIsoForLocale(from, locale)} –`
  if (!from && to) return `– ${formatIsoForLocale(to, locale)}`
  return `${formatIsoForLocale(from, locale)} – ${formatIsoForLocale(to, locale)}`
}

export function dateInputPlaceholder(locale?: string): string {
  return locale === 'pt-BR' ? 'dd/mm/aaaa' : 'mm/dd/yyyy'
}

export function dateRangeInputPlaceholder(locale?: string): string {
  const single = dateInputPlaceholder(locale)
  return `${single} – ${single}`
}

export function parseLocaleDateInput(value: string, locale?: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return ''

  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/)
  if (!match) return null

  const first = Number(match[1])
  const second = Number(match[2])
  let year = Number(match[3])
  if (year < 100) year += 2000

  const day = locale === 'pt-BR' ? first : second
  const month = locale === 'pt-BR' ? second : first

  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return toIsoDate(date)
}

export function getWeekdayLabels(locale?: string): string[] {
  const intlLocale = resolveIntlLocale(locale)
  const sunday = new Date(2024, 0, 7)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sunday)
    date.setDate(sunday.getDate() + index)
    return new Intl.DateTimeFormat(intlLocale, { weekday: 'narrow' }).format(date)
  })
}

export function formatMonthYear(year: number, month: number, locale?: string): string {
  const intlLocale = resolveIntlLocale(locale)
  const formatted = new Intl.DateTimeFormat(intlLocale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1))
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export interface CalendarDayCell {
  iso: string
  day: number
  inMonth: boolean
  isToday: boolean
  isSelected: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
}

export type CalendarSelection =
  | string
  | { from?: string; to?: string }
  | undefined
  | null

function selectionFlags(
  iso: string,
  selection: CalendarSelection,
): Pick<CalendarDayCell, 'isSelected' | 'isRangeStart' | 'isRangeEnd' | 'isInRange'> {
  if (!selection || typeof selection === 'string') {
    const selected = Boolean(selection && iso === selection)
    return {
      isSelected: selected,
      isRangeStart: false,
      isRangeEnd: false,
      isInRange: false,
    }
  }

  const from = selection.from ?? ''
  const to = selection.to ?? ''
  const isRangeStart = Boolean(from && iso === from)
  const isRangeEnd = Boolean(to && iso === to)
  const isInRange =
    Boolean(from && to) && compareIsoDate(iso, from) >= 0 && compareIsoDate(iso, to) <= 0

  return {
    isSelected: isRangeStart || isRangeEnd,
    isRangeStart,
    isRangeEnd,
    isInRange: isInRange && !isRangeStart && !isRangeEnd,
  }
}

export function buildCalendarMonthGrid(
  year: number,
  month: number,
  selection: CalendarSelection = '',
  locale?: string,
): CalendarDayCell[] {
  void locale
  const todayIso = toIsoDate(new Date())
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPreviousMonth = new Date(year, month, 0).getDate()
  const cells: CalendarDayCell[] = []

  const pushCell = (date: Date, inMonth: boolean) => {
    const iso = toIsoDate(date)
    cells.push({
      iso,
      day: date.getDate(),
      inMonth,
      isToday: iso === todayIso,
      ...selectionFlags(iso, selection),
    })
  }

  for (let index = firstDay - 1; index >= 0; index -= 1) {
    const day = daysInPreviousMonth - index
    pushCell(new Date(year, month - 1, day), false)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    pushCell(new Date(year, month, day), true)
  }

  let nextMonthDay = 1
  while (cells.length % 7 !== 0 || cells.length < 42) {
    pushCell(new Date(year, month + 1, nextMonthDay), false)
    nextMonthDay += 1
  }

  return cells
}
