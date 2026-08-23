import { describe, expect, it } from 'vitest'
import {
  compareTimeHms,
  formatTimeRangeDisplay,
  normalizeTimeRange,
  parseTimeInput,
  roundTimeToSteps,
  timeInputPlaceholder,
} from '@/lib/timeUtils'

describe('timeUtils', () => {
  it('parses HH:mm:ss and normalizes HH:mm', () => {
    expect(parseTimeInput('14:30:45')).toBe('14:30:45')
    expect(parseTimeInput('09:15')).toBe('09:15:00')
    expect(parseTimeInput('')).toBe('')
    expect(parseTimeInput('25:00:00')).toBeNull()
    expect(timeInputPlaceholder()).toBe('hh:mm:ss')
  })

  it('compares and normalizes ranges', () => {
    expect(compareTimeHms('09:00:00', '18:00:00')).toBeLessThan(0)
    expect(normalizeTimeRange('18:00:00', '09:00:00')).toEqual({
      from: '09:00:00',
      to: '18:00:00',
    })
    expect(formatTimeRangeDisplay({ from: '09:00:00', to: '18:00:00' })).toBe(
      '09:00:00 – 18:00:00',
    )
  })

  it('rounds current time to steps', () => {
    const date = new Date(2026, 5, 16, 14, 37, 48)
    expect(roundTimeToSteps(date, 15, 30)).toBe('14:30:30')
  })
})
