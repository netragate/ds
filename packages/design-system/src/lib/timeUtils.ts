import type { TimeRangeValue } from './dateTimeTypes'

export const TIME_HMS = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
export const TIME_HM = /^([01]\d|2[0-3]):([0-5]\d)$/

export function timeInputPlaceholder(): string {
  return 'hh:mm:ss'
}

export function padTimePart(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatTimeHms(hours: number, minutes: number, seconds: number): string {
  return `${padTimePart(hours)}:${padTimePart(minutes)}:${padTimePart(seconds)}`
}

/** Parse `HH:mm:ss` or `HH:mm` → canonical `HH:mm:ss`. Empty → `''`. Invalid → `null`. */
export function parseTimeInput(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  const hms = trimmed.match(TIME_HMS)
  if (hms) {
    return `${hms[1]}:${hms[2]}:${hms[3]}`
  }

  const hm = trimmed.match(TIME_HM)
  if (hm) {
    return `${hm[1]}:${hm[2]}:00`
  }

  return null
}

export function isValidTimeHms(value: string): boolean {
  return TIME_HMS.test(value)
}

export function timeToSeconds(value: string): number | null {
  const parsed = parseTimeInput(value)
  if (!parsed) {
    return null
  }

  const [hours, minutes, seconds] = parsed.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export function compareTimeHms(a: string, b: string): number {
  const left = timeToSeconds(a)
  const right = timeToSeconds(b)

  if (left === null || right === null) {
    return 0
  }

  return left - right
}

export function normalizeTimeRange(from: string, to: string): TimeRangeValue {
  const parsedFrom = parseTimeInput(from) ?? ''
  const parsedTo = parseTimeInput(to) ?? ''

  if (!parsedFrom || !parsedTo) {
    return { from: parsedFrom, to: parsedTo }
  }

  if (compareTimeHms(parsedFrom, parsedTo) <= 0) {
    return { from: parsedFrom, to: parsedTo }
  }

  return { from: parsedTo, to: parsedFrom }
}

export function formatTimeRangeDisplay(range: TimeRangeValue): string {
  if (!range.from && !range.to) {
    return ''
  }

  if (range.from && !range.to) {
    return `${range.from} –`
  }

  if (!range.from && range.to) {
    return `– ${range.to}`
  }

  return `${range.from} – ${range.to}`
}

export function roundTimeToSteps(
  date: Date,
  minuteStep = 1,
  secondStep = 1,
): string {
  const hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  const safeMinuteStep = Math.max(1, minuteStep)
  const safeSecondStep = Math.max(1, secondStep)

  minutes = Math.floor(minutes / safeMinuteStep) * safeMinuteStep
  seconds = Math.floor(seconds / safeSecondStep) * safeSecondStep

  return formatTimeHms(hours, minutes, seconds)
}

export function buildTimeOptions(
  minuteStep = 1,
  secondStep = 1,
): string[] {
  const safeMinuteStep = Math.max(1, Math.min(60, minuteStep))
  const safeSecondStep = Math.max(1, Math.min(60, secondStep))
  const options: string[] = []

  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += safeMinuteStep) {
      for (let second = 0; second < 60; second += safeSecondStep) {
        options.push(formatTimeHms(hour, minute, second))
      }
    }
  }

  return options
}

export function splitTimeHms(value: string): { hours: number; minutes: number; seconds: number } | null {
  const parsed = parseTimeInput(value)
  if (!parsed || !TIME_HMS.test(parsed)) {
    return null
  }

  const [hours, minutes, seconds] = parsed.split(':').map(Number)
  return { hours, minutes, seconds }
}
