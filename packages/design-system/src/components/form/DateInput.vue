<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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
  locale?: string
  disabled?: boolean
  clearLabel?: string
  todayLabel?: string
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
  locale: 'en',
  disabled: false,
  size: 'md',
  clearLabel: undefined,
  todayLabel: undefined,
  minuteStep: 1,
  secondStep: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateInputModelValue]
}>()

const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)
const displayValue = ref('')
const viewDate = ref(new Date())
/** First click in range mode before `to` is chosen. */
const rangeDraftFrom = ref('')

const resolvedClearLabel = computed(() =>
  props.clearLabel ?? (props.locale === 'pt-BR' ? 'Limpar' : 'Clear'),
)
const resolvedTodayLabel = computed(() =>
  props.todayLabel ?? (props.locale === 'pt-BR' ? 'Hoje' : 'Today'),
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
    const from = rangeDraftFrom.value || dateRangeModel.value.from
    const to = rangeDraftFrom.value ? '' : dateRangeModel.value.to
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

const timeModel = computed({
  get: (): string | { from: string; to: string } => {
    if (props.range) {
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
      const dates = dateRangeModel.value
      const times = typeof value === 'object' ? value : { from: '', to: '' }
      emit('update:modelValue', {
        from: { date: dates.from, time: times.from },
        to: { date: dates.to, time: times.to },
      })
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
    const current = isDateTimeRange(props.modelValue) ? props.modelValue : emptyDateTimeRange()
    emit('update:modelValue', {
      from: { date: range.from, time: current.from.time },
      to: { date: range.to, time: current.to.time },
    })
  } else {
    emit('update:modelValue', range)
  }
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
    syncViewFromModel()
  }
}

function closeCalendar(): void {
  open.value = false
  rangeDraftFrom.value = ''
}

function selectDay(iso: string): void {
  if (props.range) {
    if (!rangeDraftFrom.value) {
      rangeDraftFrom.value = iso
      return
    }

    const normalized = normalizeDateRange(rangeDraftFrom.value, iso)
    rangeDraftFrom.value = ''
    emitDateRange(normalized)
    if (!props.showTime) {
      closeCalendar()
    }
    return
  }

  emitDateOnly(iso)
  if (!props.showTime) {
    closeCalendar()
  }
}

function clearValue(): void {
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
    if (props.showTime) {
      emit('update:modelValue', {
        from: { date: today, time: nowTime },
        to: { date: today, time: nowTime },
      })
    } else {
      emitDateRange({ from: today, to: today })
    }
  } else if (props.showTime) {
    emit('update:modelValue', { date: today, time: nowTime })
  } else {
    emitDateOnly(today)
  }

  viewDate.value = new Date()
  if (!props.showTime) {
    closeCalendar()
  }
}

function shiftMonth(delta: number): void {
  const next = new Date(viewDate.value)
  next.setMonth(next.getMonth() + delta)
  viewDate.value = next
}

function onDocumentPointerDown(event: MouseEvent): void {
  if (!open.value) return
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  closeCalendar()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && open.value) closeCalendar()
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentPointerDown)
  document.removeEventListener('keydown', onKeydown)
})

function dayButtonClass(day: {
  inMonth: boolean
  isSelected: boolean
  isToday: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
}): string {
  return cn(
    'inline-flex size-8 items-center justify-center rounded-md text-xs transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    day.isSelected || day.isRangeStart || day.isRangeEnd
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

    <div
      v-if="open"
      class="absolute top-[calc(100%+0.375rem)] right-0 z-[var(--ds-z-dropdown)] w-full min-w-[16.5rem] rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      @click.stop
    >
      <div class="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          :aria-label="locale === 'pt-BR' ? 'Mês anterior' : 'Previous month'"
          @click="shiftMonth(-1)"
        >
          <ChevronLeft :size="16" aria-hidden="true" />
        </button>
        <p class="text-sm font-medium capitalize">{{ monthLabel }}</p>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          :aria-label="locale === 'pt-BR' ? 'Próximo mês' : 'Next month'"
          @click="shiftMonth(1)"
        >
          <ChevronRight :size="16" aria-hidden="true" />
        </button>
      </div>

      <div class="mb-1 grid grid-cols-7 gap-1">
        <span
          v-for="(label, index) in weekdayLabels"
          :key="`${label}-${index}`"
          class="flex size-8 items-center justify-center text-xs font-medium uppercase text-muted-foreground"
        >
          {{ label }}
        </span>
      </div>

      <div class="grid grid-cols-7 gap-1">
        <button
          v-for="day in calendarDays"
          :key="day.iso"
          type="button"
          :class="dayButtonClass(day)"
          @click="selectDay(day.iso)"
        >
          {{ day.day }}
        </button>
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
          type="button"
          class="text-xs font-medium text-primary transition-opacity hover:opacity-80"
          @click="selectToday"
        >
          {{ resolvedTodayLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
