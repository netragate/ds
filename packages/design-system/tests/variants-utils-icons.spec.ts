import { describe, expect, it } from 'vitest'
import { buttonVariants } from '@/components/button/buttonVariants'
import {
  badgeVariants,
  badgeAppearanceStyles,
  badgeVariantToAppearance,
} from '@/components/feedback/badgeVariants'
import { alertVariants } from '@/components/feedback/alertVariants'
import { formInputVariants } from '@/components/form/formInputVariants'
import { overlayAppearanceClasses } from '@/components/overlay/overlayAppearance'
import { semanticSurfaceClasses } from '@/lib/semanticSurfaceClasses'
import {
  sidebarMenuTriggerClass,
  sidebarMenuIconClass,
  sidebarMenuLabelClass,
  sidebarMenuChevronClass,
  sidebarMenuStateClass,
  sidebarMenuIconStateClass,
} from '@/components/navigation/sidebarMenuStyles'
import { resolveIcon, loadIcon } from '@/icons/resolveIcon'
import { iconographyComponents, buttonIcons } from '@/icons/iconography.icons'
import {
  parseTimeInput,
  isValidTimeHms,
  timeToSeconds,
  compareTimeHms,
  normalizeTimeRange,
  formatTimeRangeDisplay,
  buildTimeOptions,
  splitTimeHms,
  roundTimeToSteps,
} from '@/lib/timeUtils'
import {
  parseIsoDate,
  isIsoInRange,
  inclusiveDaySpan,
  isDateRangeWithinMaxDays,
  parseLocaleDateInput,
  formatDateRangeForLocale,
  dateRangeInputPlaceholder,
} from '@/lib/dateUtils'

describe('variant maps', () => {
  it('buttonVariants covers variants and sizes', () => {
    expect(buttonVariants({ variant: 'primary', size: 'sm' })).toContain('h-8')
    expect(buttonVariants({ variant: 'destructive', size: 'lg' })).toContain('h-10')
    expect(buttonVariants({ variant: 'ghost', size: 'icon' })).toBeTruthy()
    expect(buttonVariants({ variant: 'outline' })).toBeTruthy()
    expect(buttonVariants({ variant: 'secondary' })).toBeTruthy()
    expect(buttonVariants({ variant: 'link' })).toBeTruthy()
    expect(buttonVariants({ variant: 'warning' })).toBeTruthy()
    expect(buttonVariants({ variant: 'discovery' })).toBeTruthy()
    expect(buttonVariants({ variant: 'subtle' })).toBeTruthy()
    expect(buttonVariants({ variant: 'clean' })).toBeTruthy()
    expect(buttonVariants({ variant: 'default', size: 'compact' })).toBeTruthy()
  })

  it('badgeVariants and appearance styles cover options', () => {
    expect(badgeVariants({ size: 'sm' })).toContain('min-h-7')
    expect(badgeVariants({ size: 'md' })).toContain('min-h-8')
    for (const appearance of Object.keys(badgeAppearanceStyles)) {
      expect(badgeAppearanceStyles[appearance as keyof typeof badgeAppearanceStyles].color).toBeTruthy()
    }
    expect(badgeVariantToAppearance.destructive).toBe('important')
    expect(badgeVariantToAppearance.success).toBe('added')
  })

  it('alertVariants and formInputVariants cover options', () => {
    for (const variant of ['info', 'success', 'warning', 'error'] as const) {
      expect(alertVariants({ variant })).toBeTruthy()
    }
    expect(formInputVariants({ size: 'sm', error: true })).toBeTruthy()
    expect(formInputVariants({ size: 'lg', success: true })).toBeTruthy()
    expect(formInputVariants({ size: 'md' })).toBeTruthy()
  })

  it('overlay and semantic surface maps expose keys', () => {
    expect(overlayAppearanceClasses.primary).toBeTruthy()
    expect(overlayAppearanceClasses.ghost).toBeTruthy()
    expect(overlayAppearanceClasses.outline).toBeTruthy()
    expect(overlayAppearanceClasses.danger).toBeTruthy()
    expect(semanticSurfaceClasses.success).toBeTruthy()
    expect(semanticSurfaceClasses.error).toBeTruthy()
    expect(semanticSurfaceClasses.info).toBeTruthy()
    expect(semanticSurfaceClasses.warning).toBeTruthy()
  })

  it('sidebar menu style helpers return class strings', () => {
    expect(sidebarMenuTriggerClass()).toBeTruthy()
    expect(sidebarMenuIconClass()).toBeTruthy()
    expect(sidebarMenuLabelClass()).toBeTruthy()
    expect(sidebarMenuChevronClass()).toBeTruthy()
    expect(sidebarMenuStateClass(true)).toContain('text-primary')
    expect(sidebarMenuStateClass(false)).toContain('text-muted-foreground')
    expect(sidebarMenuIconStateClass(true, true)).toContain('rounded-md')
    expect(sidebarMenuIconStateClass(true, false)).toContain('text-primary')
    expect(sidebarMenuIconStateClass(false, false)).toBe('')
  })
})

describe('resolveIcon', () => {
  it('returns a component for a known icon', () => {
    expect(resolveIcon('zap')).toBeTruthy()
  })

  it('throws for unknown icons', () => {
    expect(() => resolveIcon('not-a-real-icon' as never)).toThrow(/Unknown icon/)
  })

  it('loadIcon resolves the same component', async () => {
    await expect(loadIcon('zap')).resolves.toBe(resolveIcon('zap'))
  })

  it('re-exports iconographyComponents and buttonIcons', () => {
    expect(iconographyComponents).toBeTruthy()
    expect(buttonIcons).toBe(iconographyComponents)
  })
})

describe('timeUtils gaps', () => {
  it('parses HM, rejects invalid, and compares ranges', () => {
    expect(parseTimeInput('')).toBe('')
    expect(parseTimeInput('09:30')).toBe('09:30:00')
    expect(parseTimeInput('bad')).toBeNull()
    expect(isValidTimeHms('09:30:00')).toBe(true)
    expect(isValidTimeHms('9:30')).toBe(false)
    expect(timeToSeconds('01:00:00')).toBe(3600)
    expect(timeToSeconds('bad')).toBeNull()
    expect(compareTimeHms('01:00:00', '02:00:00')).toBeLessThan(0)
    expect(compareTimeHms('bad', '01:00:00')).toBe(0)
    expect(normalizeTimeRange('18:00:00', '09:00:00')).toEqual({
      from: '09:00:00',
      to: '18:00:00',
    })
    expect(normalizeTimeRange('', '09:00:00')).toEqual({ from: '', to: '09:00:00' })
    expect(formatTimeRangeDisplay({ from: '', to: '' })).toBe('')
    expect(formatTimeRangeDisplay({ from: '09:00:00', to: '' })).toBe('09:00:00 –')
    expect(formatTimeRangeDisplay({ from: '', to: '18:00:00' })).toBe('– 18:00:00')
    expect(formatTimeRangeDisplay({ from: '09:00:00', to: '18:00:00' })).toBe(
      '09:00:00 – 18:00:00',
    )
    expect(splitTimeHms('12:34:56')).toEqual({ hours: 12, minutes: 34, seconds: 56 })
    expect(splitTimeHms('bad')).toBeNull()
    expect(roundTimeToSteps(new Date('2026-01-01T10:17:44'), 15, 30)).toBe('10:15:30')
    expect(buildTimeOptions(30, 60).length).toBeGreaterThan(10)
  })
})

describe('dateUtils gaps', () => {
  it('covers range helpers and invalid parse paths', () => {
    expect(parseIsoDate('not-iso')).toBeNull()
    expect(isIsoInRange('2026-06-11', '2026-06-10', '2026-06-12')).toBe(true)
    expect(inclusiveDaySpan('2026-06-10', '2026-06-12')).toBe(3)
    expect(inclusiveDaySpan('bad', '2026-06-12')).toBeNull()
    expect(isDateRangeWithinMaxDays('2026-06-10', '2026-06-20', 3)).toBe(false)
    expect(isDateRangeWithinMaxDays('2026-06-10', '2026-06-11', null)).toBe(true)
    expect(parseLocaleDateInput('not-a-date', 'en')).toBeNull()
    expect(formatDateRangeForLocale('2026-06-10', '2026-06-12', 'en')).toContain('2026')
    expect(dateRangeInputPlaceholder('pt-BR')).toBeTruthy()
  })
})
