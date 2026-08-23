<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type {
  DateInputModelValue,
  DateRangeValue,
  DateTimeRangeValue,
  DateTimeValue,
} from '@/lib/dateTimeTypes'
import {
  buildCalendarMonthGrid,
  dateInputPlaceholder,
  dateRangeInputPlaceholder,
  formatDateRangeForLocale,
  formatIsoForLocale,
  formatMonthYear,
  getWeekdayLabels,
  isDateRangeWithinMaxDays,
  normalizeDateRange,
  parseIsoDate,
  parseLocaleDateInput,
  toIsoDate,
} from '@/lib/dateUtils'
import { roundTimeToSteps } from '@/lib/timeUtils'
import { formInputVariants, type FormInputVariants } from './formInputVariants'
import TimeInput from './TimeInput.vue'

export type { DateInputModelValue }

export interface DateInputProps extends /* @vue-ignore */ FormInputVariants {
  size?: FormInputVariants['size']
  modelValue?: DateInputModelValue
  range?: boolean
  showTime?: boolean
  /** Inclusive max days for range selection. Omitted / ≤0 = unlimited. */
  maxRangeDays?: number
  locale?: string
  disabled?: boolean
  clearLabel?: string
  todayLabel?: string
  /** Label for the confirm button in range mode (defaults by locale). */
  confirmLabel?: string
  minuteStep?: number
  secondStep?: number
  /** Overrides locale-based placeholder when set. */
  placeholder?: string
  id?: string
  class?: string
  'aria-label'?: string
}

const props = withDefaults(defineProps<DateInputProps>(), {
  modelValue: '',
  range: false,
  showTime: false,
  maxRangeDays: undefined,
  locale: 'en',
  disabled: false,
  size: 'md',
  clearLabel: undefined,
  todayLabel: undefined,
  confirmLabel: undefined,
  minuteStep: 1,
  secondStep: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateInputModelValue]
}>()

const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const open = ref(false)
const displayValue = ref('')
const viewDate = ref(new Date())
/** First click in range mode before `to` is chosen. */
const rangeDraftFrom = ref('')
/** Range selection while the panel is open — committed only on Confirm. */
const pendingRange = ref<DateRangeValue | null>(null)
/** Time selection while the panel is open (range + showTime). */
const pendingTimes = ref<{ from: string; to: string } | null>(null)
const panelStyle = ref<Record<string, string>>({
  top: '0px',
  left: '0px',
})

const PANEL_GAP_PX = 6
const VIEWPORT_PADDING_PX = 8

const resolvedClearLabel = computed(() =>
  props.clearLabel ?? (props.locale === 'pt-BR' ? 'Limpar' : 'Clear'),
)
const resolvedTodayLabel = computed(() =>
  props.todayLabel ?? (props.locale === 'pt-BR' ? 'Hoje' : 'Today'),
)
const resolvedConfirmLabel = computed(() =>
  props.confirmLabel ?? (props.locale === 'pt-BR' ? 'Confirmar' : 'Confirm'),
)
const placeholder = computed(() => {
  if (props.placeholder) return props.placeholder
  if (props.range) return dateRangeInputPlaceholder(props.locale)
  return dateInputPlaceholder(props.locale)
})
const weekdayLabels = computed(() => getWeekdayLabels(props.locale))

const inputClasses = computed(() =>
  cn(
    formInputVariants({
      size: props.size,
      error: false,
      success: false,
    }),
    'w-full pr-9',
  ),
)

const monthLabel = computed(() =>
  formatMonthYear(viewDate.value.getFullYear(), viewDate.value.getMonth(), props.locale),
)

const nextViewDate = computed(() => {
  const next = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1)
  return next
})

const nextMonthLabel = computed(() =>
  formatMonthYear(nextViewDate.value.getFullYear(), nextViewDate.value.getMonth(), props.locale),
)

function emptyDateRange(): DateRangeValue {
  return { from: '', to: '' }
}

function emptyDateTime(): DateTimeValue {
  return { date: '', time: '' }
}

function emptyDateTimeRange(): DateTimeRangeValue {
  return { from: emptyDateTime(), to: emptyDateTime() }
}

function isDateRange(value: DateInputModelValue | undefined): value is DateRangeValue {
  return Boolean(
    value
    && typeof value === 'object'
    && 'from' in value
    && 'to' in value
    && typeof (value as DateRangeValue).from === 'string',
  )
}

function isDateTime(value: DateInputModelValue | undefined): value is DateTimeValue {
  return Boolean(
    value
    && typeof value === 'object'
    && 'date' in value
    && 'time' in value
    && !('from' in value),
  )
}

function isDateTimeRange(value: DateInputModelValue | undefined): value is DateTimeRangeValue {
  return Boolean(
    value
    && typeof value === 'object'
    && 'from' in value
    && 'to' in value
    && typeof (value as DateTimeRangeValue).from === 'object',
  )
}

const dateRangeModel = computed((): DateRangeValue => {
  if (props.showTime && isDateTimeRange(props.modelValue)) {
    return { from: props.modelValue.from.date, to: props.modelValue.to.date }
  }
  if (!props.showTime && isDateRange(props.modelValue)) {
    return props.modelValue
  }
  return emptyDateRange()
})

const activeDateRange = computed((): DateRangeValue => pendingRange.value ?? dateRangeModel.value)

const canConfirmRange = computed(
  () =>
    props.range
    && !rangeDraftFrom.value
    && Boolean(activeDateRange.value.from && activeDateRange.value.to),
)

const singleDateModel = computed((): string => {
  if (props.showTime && isDateTime(props.modelValue)) {
    return props.modelValue.date
  }
  if (typeof props.modelValue === 'string') {
    return props.modelValue
  }
  return ''
})

const calendarSelection = computed(() => {
  if (props.range) {
    const from = rangeDraftFrom.value || activeDateRange.value.from
    const to = rangeDraftFrom.value ? '' : activeDateRange.value.to
    return { from, to }
  }
  return singleDateModel.value
})

const calendarDays = computed(() =>
  buildCalendarMonthGrid(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth(),
    calendarSelection.value,
    props.locale,
  ),
)

const nextCalendarDays = computed(() =>
  buildCalendarMonthGrid(
    nextViewDate.value.getFullYear(),
    nextViewDate.value.getMonth(),
    calendarSelection.value,
    props.locale,
  ),
)

const calendarPanels = computed(() => {
  const left = {
    key: `${viewDate.value.getFullYear()}-${viewDate.value.getMonth()}`,
    label: monthLabel.value,
    days: calendarDays.value,
  }
  if (!props.range) return [left]
  return [
    left,
    {
      key: `${nextViewDate.value.getFullYear()}-${nextViewDate.value.getMonth()}`,
      label: nextMonthLabel.value,
      days: nextCalendarDays.value,
    },
  ]
})

const timeModel = computed({
  get: (): string | { from: string; to: string } => {
    if (props.range) {
      if (pendingTimes.value) return pendingTimes.value
      if (isDateTimeRange(props.modelValue)) {
        return { from: props.modelValue.from.time, to: props.modelValue.to.time }
      }
      return { from: '', to: '' }
    }
    if (isDateTime(props.modelValue)) {
      return props.modelValue.time
    }
    return ''
  },
  set: (value: string | { from: string; to: string }) => {
    if (props.range) {
      const times = typeof value === 'object' ? value : { from: '', to: '' }
      if (!pendingRange.value) {
        pendingRange.value = { ...dateRangeModel.value }
      }
      pendingTimes.value = times
      return
    }

    const time = typeof value === 'string' ? value : ''
    emit('update:modelValue', {
      date: singleDateModel.value,
      time,
    })
  },
})

function formatSingleDisplay(date: string, time: string): string {
  if (!date && !time) return ''
  const datePart = date ? formatIsoForLocale(date, props.locale) : ''
  if (!props.showTime) return datePart
  if (!datePart) return time
  if (!time) return datePart
  return `${datePart} ${time}`
}

function syncDisplayFromModel(): void {
  if (props.range) {
    if (props.showTime && isDateTimeRange(props.modelValue)) {
      const { from, to } = props.modelValue
      const left = formatSingleDisplay(from.date, from.time)
      const right = formatSingleDisplay(to.date, to.time)
      if (!left && !right) {
        displayValue.value = ''
        return
      }
      displayValue.value = `${left || '…'} – ${right || '…'}`
      return
    }

    displayValue.value = formatDateRangeForLocale(
      dateRangeModel.value.from,
      dateRangeModel.value.to,
      props.locale,
    )
    return
  }

  if (props.showTime && isDateTime(props.modelValue)) {
    displayValue.value = formatSingleDisplay(props.modelValue.date, props.modelValue.time)
    return
  }

  displayValue.value = singleDateModel.value
    ? formatIsoForLocale(singleDateModel.value, props.locale)
    : ''
}

function syncViewFromModel(): void {
  const iso = props.range
    ? (dateRangeModel.value.from || dateRangeModel.value.to)
    : singleDateModel.value
  const parsed = iso ? parseIsoDate(iso) : null
  viewDate.value = parsed ?? new Date()
}

watch(
  () => [props.modelValue, props.locale, props.range, props.showTime] as const,
  () => {
    syncDisplayFromModel()
    syncViewFromModel()
  },
  { immediate: true, deep: true },
)

watch(
  () => props.disabled,
  (isDisabled) => {
    if (isDisabled) closeCalendar()
  },
)

function emitDateOnly(iso: string): void {
  if (props.showTime) {
    const time = isDateTime(props.modelValue) ? props.modelValue.time : ''
    emit('update:modelValue', { date: iso, time })
  } else {
    emit('update:modelValue', iso)
  }
}

function emitDateRange(range: DateRangeValue): void {
  if (props.showTime) {
    const times = pendingTimes.value
      ?? (isDateTimeRange(props.modelValue)
        ? { from: props.modelValue.from.time, to: props.modelValue.to.time }
        : { from: '', to: '' })
    emit('update:modelValue', {
      from: { date: range.from, time: times.from },
      to: { date: range.to, time: times.to },
    })
  } else {
    emit('update:modelValue', range)
  }
}

function seedPendingFromModel(): void {
  if (!props.range) return
  pendingRange.value = { ...dateRangeModel.value }
  if (props.showTime && isDateTimeRange(props.modelValue)) {
    pendingTimes.value = {
      from: props.modelValue.from.time,
      to: props.modelValue.to.time,
    }
  } else if (props.showTime) {
    pendingTimes.value = { from: '', to: '' }
  } else {
    pendingTimes.value = null
  }
}

function discardPending(): void {
  pendingRange.value = null
  pendingTimes.value = null
}

function onDisplayInput(event: Event): void {
  displayValue.value = (event.target as HTMLInputElement).value
}

function commitDisplayValue(): void {
  if (props.range || props.showTime) {
    // Range / datetime: calendar + TimeInput only (type-in kept for single date).
    syncDisplayFromModel()
    return
  }

  const parsed = parseLocaleDateInput(displayValue.value, props.locale)
  if (parsed === null) {
    syncDisplayFromModel()
    return
  }
  emitDateOnly(parsed)
  if (parsed) {
    const date = parseIsoDate(parsed)
    if (date) viewDate.value = date
  }
}

function toggleCalendar(): void {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    rangeDraftFrom.value = ''
    seedPendingFromModel()
    syncViewFromModel()
  } else {
    discardPending()
  }
}

function closeCalendar(): void {
  open.value = false
  rangeDraftFrom.value = ''
  discardPending()
}

async function updatePanelPosition(): Promise<void> {
  if (!open.value || !rootRef.value) return

  const trigger = rootRef.value.getBoundingClientRect()
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight
  const maxPanelWidth = Math.max(0, viewportW - VIEWPORT_PADDING_PX * 2)

  // Prefer below + left-aligned with the input.
  let top = trigger.bottom + PANEL_GAP_PX
  let left = trigger.left

  panelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    maxWidth: `${maxPanelWidth}px`,
    ...(props.range ? {} : { width: `${Math.min(trigger.width, maxPanelWidth)}px` }),
  }

  await nextTick()
  const panel = panelRef.value
  if (!panel) return

  // Second measure after paint for accurate dual-month width/height.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

  const panelRect = panel.getBoundingClientRect()
  const panelWidth = Math.min(panelRect.width || trigger.width, maxPanelWidth)
  const panelHeight = panelRect.height

  const spaceBelow = viewportH - trigger.bottom - VIEWPORT_PADDING_PX
  const spaceAbove = trigger.top - VIEWPORT_PADDING_PX
  const openUpward = spaceBelow < panelHeight && spaceAbove > spaceBelow

  top = openUpward
    ? trigger.top - panelHeight - PANEL_GAP_PX
    : trigger.bottom + PANEL_GAP_PX

  // Horizontal: keep in viewport; prefer aligning to trigger left, else flip to trigger right.
  const overflowRight = left + panelWidth > viewportW - VIEWPORT_PADDING_PX
  if (overflowRight) {
    left = trigger.right - panelWidth
  }
  left = Math.min(left, viewportW - panelWidth - VIEWPORT_PADDING_PX)
  left = Math.max(VIEWPORT_PADDING_PX, left)

  // Vertical clamp (panel taller than viewport).
  const maxTop = viewportH - Math.min(panelHeight, viewportH - VIEWPORT_PADDING_PX * 2) - VIEWPORT_PADDING_PX
  top = Math.max(VIEWPORT_PADDING_PX, Math.min(top, maxTop))

  panelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    maxWidth: `${maxPanelWidth}px`,
    ...(props.range ? {} : { width: `${Math.min(trigger.width, maxPanelWidth)}px` }),
  }
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  await updatePanelPosition()
})

function selectDay(iso: string): void {
  if (props.range) {
    if (!rangeDraftFrom.value) {
      rangeDraftFrom.value = iso
      return
    }

    if (isDayBeyondMaxRange(iso)) {
      return
    }

    const normalized = normalizeDateRange(rangeDraftFrom.value, iso)
    if (!isDateRangeWithinMaxDays(normalized.from, normalized.to, props.maxRangeDays)) {
      return
    }
    rangeDraftFrom.value = ''
    pendingRange.value = normalized
    if (props.showTime && !pendingTimes.value) {
      pendingTimes.value = isDateTimeRange(props.modelValue)
        ? { from: props.modelValue.from.time, to: props.modelValue.to.time }
        : { from: '', to: '' }
    }
    // Range stays open until Confirm — v-model commits only then.
    return
  }

  emitDateOnly(iso)
  if (!props.showTime) {
    closeCalendar()
  }
}

function isDayBeyondMaxRange(iso: string): boolean {
  if (!props.range || !rangeDraftFrom.value) return false
  if (props.maxRangeDays == null || props.maxRangeDays <= 0) return false
  return !isDateRangeWithinMaxDays(rangeDraftFrom.value, iso, props.maxRangeDays)
}

function clearValue(): void {
  discardPending()
  if (props.range) {
    if (props.showTime) {
      emit('update:modelValue', emptyDateTimeRange())
    } else {
      emit('update:modelValue', emptyDateRange())
    }
  } else if (props.showTime) {
    emit('update:modelValue', emptyDateTime())
  } else {
    emit('update:modelValue', '')
  }
  closeCalendar()
}

function selectToday(): void {
  const today = toIsoDate(new Date())
  const nowTime = roundTimeToSteps(new Date(), props.minuteStep, props.secondStep)

  if (props.range) {
    pendingRange.value = { from: today, to: today }
    if (props.showTime) {
      pendingTimes.value = { from: nowTime, to: nowTime }
    }
    rangeDraftFrom.value = ''
    viewDate.value = new Date()
    return
  }

  if (props.showTime) {
    emit('update:modelValue', { date: today, time: nowTime })
  } else {
    emitDateOnly(today)
  }

  viewDate.value = new Date()
  if (!props.showTime) {
    closeCalendar()
  }
}

function confirmRange(): void {
  if (!canConfirmRange.value) return
  const range = pendingRange.value ?? dateRangeModel.value
  if (!range.from || !range.to) return
  emitDateRange(range)
  discardPending()
  open.value = false
  rangeDraftFrom.value = ''
}

function shiftMonth(delta: number): void {
  const next = new Date(viewDate.value)
  next.setMonth(next.getMonth() + delta)
  viewDate.value = next
}

function onDocumentPointerDown(event: MouseEvent): void {
  if (!open.value) return
  const target = event.target as Node
  if (rootRef.value?.contains(target) || panelRef.value?.contains(target)) return
  closeCalendar()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && open.value) closeCalendar()
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointerDown)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updatePanelPosition)
  window.addEventListener('scroll', updatePanelPosition, true)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentPointerDown)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updatePanelPosition)
  window.removeEventListener('scroll', updatePanelPosition, true)
})

function dayButtonClass(day: {
  iso: string
  inMonth: boolean
  isSelected: boolean
  isToday: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
}): string {
  const beyondMax = isDayBeyondMaxRange(day.iso)
  return cn(
    'inline-flex size-8 items-center justify-center rounded-md text-xs transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    beyondMax
      ? 'cursor-not-allowed text-muted-foreground/30'
      : day.isSelected || day.isRangeStart || day.isRangeEnd
        ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,212,255,0.35)]'
        : day.isInRange
          ? 'bg-primary/15 text-primary'
          : day.isToday
            ? 'border border-primary/40 text-primary'
            : day.inMonth
              ? 'text-foreground hover:bg-accent hover:text-accent-foreground'
              : 'text-muted-foreground/40 hover:bg-accent/50 hover:text-muted-foreground',
  )
}
</script>

<template>
  <div ref="rootRef" class="relative w-full" :class="props.class">
    <input
      :id="id"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="range || showTime"
      :class="inputClasses"
      :aria-label="props['aria-label']"
      @input="onDisplayInput"
      @blur="commitDisplayValue"
      @keydown.enter.prevent="commitDisplayValue"
    />
    <button
      type="button"
      class="absolute top-1/2 right-1 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled"
      :aria-label="props['aria-label']"
      :aria-expanded="open"
      @click.stop="toggleCalendar"
    >
      <Calendar :size="14" aria-hidden="true" />
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        ref="panelRef"
        class="fixed z-[var(--ds-z-dropdown)] rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        :class="range ? 'w-max min-w-[16.5rem]' : 'min-w-[16.5rem]'"
        :style="panelStyle"
        @click.stop
      >
      <div
        class="mb-3 flex gap-4"
        :class="range ? 'flex-col sm:flex-row' : 'flex-col'"
      >
        <div
          v-for="(panel, panelIndex) in calendarPanels"
          :key="panel.key"
          class="min-w-[15.5rem] flex-1"
        >
          <div class="mb-3 flex items-center justify-between gap-2">
            <button
              v-if="panelIndex === 0"
              type="button"
              class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              :aria-label="locale === 'pt-BR' ? 'Mês anterior' : 'Previous month'"
              @click="shiftMonth(-1)"
            >
              <ChevronLeft :size="16" aria-hidden="true" />
            </button>
            <span v-else class="inline-flex size-8" aria-hidden="true" />

            <p class="flex-1 text-center text-sm font-medium capitalize">{{ panel.label }}</p>

            <button
              v-if="!range || panelIndex === calendarPanels.length - 1"
              type="button"
              class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              :aria-label="locale === 'pt-BR' ? 'Próximo mês' : 'Next month'"
              @click="shiftMonth(1)"
            >
              <ChevronRight :size="16" aria-hidden="true" />
            </button>
            <span v-else class="inline-flex size-8" aria-hidden="true" />
          </div>

          <div class="mb-1 grid grid-cols-7 gap-1">
            <span
              v-for="(label, index) in weekdayLabels"
              :key="`${panel.key}-${label}-${index}`"
              class="flex size-8 items-center justify-center text-xs font-medium uppercase text-muted-foreground"
            >
              {{ label }}
            </span>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <template v-for="day in panel.days" :key="`${panel.key}-${day.iso}`">
              <!-- Range dual-month: hide adjacent-month fillers (shown on the other panel). -->
              <span
                v-if="range && !day.inMonth"
                class="size-8"
                aria-hidden="true"
              />
              <button
                v-else
                type="button"
                :class="dayButtonClass(day)"
                :disabled="isDayBeyondMaxRange(day.iso)"
                @click="selectDay(day.iso)"
              >
                {{ day.day }}
              </button>
            </template>
          </div>
        </div>
      </div>

      <div v-if="showTime" class="mt-3 border-t border-border pt-3">
        <TimeInput
          v-model="timeModel"
          :range="range"
          :locale="locale"
          :size="size"
          :disabled="disabled"
          :minute-step="minuteStep"
          :second-step="secondStep"
        />
      </div>

      <div class="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
        <button
          type="button"
          class="text-xs font-medium text-primary transition-opacity hover:opacity-80"
          @click="clearValue"
        >
          {{ resolvedClearLabel }}
        </button>
        <button
          v-if="range"
          type="button"
          class="text-xs font-medium text-primary transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="!canConfirmRange"
          @click="confirmRange"
        >
          {{ resolvedConfirmLabel }}
        </button>
        <button
          v-else
          type="button"
          class="text-xs font-medium text-primary transition-opacity hover:opacity-80"
          @click="selectToday"
        >
          {{ resolvedTodayLabel }}
        </button>
      </div>
      </div>
    </Teleport>
  </div>
</template>
