import { describe, expect, it } from 'vitest'
import {
  buildCalendarMonthGrid,
  compareIsoDate,
  dateInputPlaceholder,
  formatIsoForLocale,
  isIsoInRange,
  normalizeDateRange,
  parseLocaleDateInput,
  toIsoDate,
} from '@/lib/dateUtils'

describe('dateUtils', () => {
  it('formats and parses pt-BR dates', () => {
    expect(formatIsoForLocale('2026-06-15', 'pt-BR')).toBe('15/06/2026')
    expect(parseLocaleDateInput('15/06/2026', 'pt-BR')).toBe('2026-06-15')
    expect(dateInputPlaceholder('pt-BR')).toBe('dd/mm/aaaa')
  })

  it('formats and parses en-US dates', () => {
    expect(formatIsoForLocale('2026-06-15', 'en')).toBe('06/15/2026')
    expect(parseLocaleDateInput('06/15/2026', 'en')).toBe('2026-06-15')
    expect(dateInputPlaceholder('en')).toBe('mm/dd/yyyy')
  })

  it('normalizes and tests date ranges', () => {
    expect(compareIsoDate('2026-06-01', '2026-06-10')).toBe(-1)
    expect(normalizeDateRange('2026-06-10', '2026-06-01')).toEqual({
      from: '2026-06-01',
      to: '2026-06-10',
    })
    expect(isIsoInRange('2026-06-05', '2026-06-01', '2026-06-10')).toBe(true)
    expect(isIsoInRange('2026-06-15', '2026-06-01', '2026-06-10')).toBe(false)
  })

  it('builds a 6-week calendar grid with range flags', () => {
    const grid = buildCalendarMonthGrid(2026, 5, '2026-06-16', 'pt-BR')
    expect(grid).toHaveLength(42)
    expect(grid.some((day) => day.iso === '2026-06-16' && day.isSelected)).toBe(true)

    const rangeGrid = buildCalendarMonthGrid(
      2026,
      5,
      { from: '2026-06-10', to: '2026-06-12' },
      'en',
    )
    expect(rangeGrid.find((day) => day.iso === '2026-06-10')?.isRangeStart).toBe(true)
    expect(rangeGrid.find((day) => day.iso === '2026-06-12')?.isRangeEnd).toBe(true)
    expect(rangeGrid.find((day) => day.iso === '2026-06-11')?.isInRange).toBe(true)

    const now = new Date()
    const currentGrid = buildCalendarMonthGrid(
      now.getFullYear(),
      now.getMonth(),
      toIsoDate(now),
      'pt-BR',
    )
    expect(currentGrid.some((day) => day.iso === toIsoDate(now) && day.isToday)).toBe(true)
  })
})
