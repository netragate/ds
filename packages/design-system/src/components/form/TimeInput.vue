<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import Clock from '@lucide/vue/dist/esm/icons/clock.mjs'
import { cn } from '@/lib/utils'
import type { TimeRangeValue } from '@/lib/dateTimeTypes'
import {
  formatTimeHms,
  formatTimeRangeDisplay,
  normalizeTimeRange,
  parseTimeInput,
  padTimePart,
  splitTimeHms,
  timeInputPlaceholder,
} from '@/lib/timeUtils'
import { formInputVariants, type FormInputVariants } from './formInputVariants'

export type TimeInputModelValue = string | TimeRangeValue

export interface TimeInputProps extends /* @vue-ignore */ FormInputVariants {
  size?: FormInputVariants['size']
  modelValue?: TimeInputModelValue
  range?: boolean
  locale?: string
  disabled?: boolean
  minuteStep?: number
  secondStep?: number
  clearLabel?: string
  placeholder?: string
  id?: string
  class?: string
  'aria-label'?: string
}

const props = withDefaults(defineProps<TimeInputProps>(), {
  modelValue: '',
  range: false,
  locale: 'en',
  disabled: false,
  size: 'md',
  minuteStep: 1,
  secondStep: 1,
  clearLabel: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: TimeInputModelValue]
}>()

const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)
const displayValue = ref('')
const draftFrom = ref('00:00:00')
const draftTo = ref('00:00:00')
const editingBound = ref<'from' | 'to'>('from')
/** Bounds only count once the user (or model) has set them — avoids normalizing against default 00:00:00. */
const fromCommitted = ref(false)
const toCommitted = ref(false)

const resolvedClearLabel = computed(() =>
  props.clearLabel ?? (props.locale === 'pt-BR' ? 'Limpar' : 'Clear'),
)

const fromLabel = computed(() => (props.locale === 'pt-BR' ? 'Início' : 'Start'))
const toLabel = computed(() => (props.locale === 'pt-BR' ? 'Fim' : 'End'))

const placeholder = computed(
  () =>
    props.placeholder
    ?? (props.range
      ? `${timeInputPlaceholder()} – ${timeInputPlaceholder()}`
      : timeInputPlaceholder()),
)

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

const minuteStep = computed(() => Math.max(1, Math.min(60, props.minuteStep)))
const secondStep = computed(() => Math.max(1, Math.min(60, props.secondStep)))

const hourOptions = computed(() => Array.from({ length: 24 }, (_, i) => padTimePart(i)))
const minuteOptions = computed(() => {
  const options: string[] = []
  for (let m = 0; m < 60; m += minuteStep.value) {
    options.push(padTimePart(m))
  }
  return options
})
const secondOptions = computed(() => {
  const options: string[] = []
  for (let s = 0; s < 60; s += secondStep.value) {
    options.push(padTimePart(s))
  }
  return options
})

const activeDraft = computed({
  get: () => (editingBound.value === 'to' ? draftTo.value : draftFrom.value),
  set: (value: string) => {
    if (editingBound.value === 'to') {
      draftTo.value = value
    } else {
      draftFrom.value = value
    }
  },
})

const activeParts = computed(() => splitTimeHms(activeDraft.value) ?? { hours: 0, minutes: 0, seconds: 0 })

function emptyRange(): TimeRangeValue {
  return { from: '', to: '' }
}

function asRange(value: TimeInputModelValue | undefined): TimeRangeValue {
  if (value && typeof value === 'object' && 'from' in value) {
    return { from: value.from ?? '', to: value.to ?? '' }
  }
  return emptyRange()
}

function syncDisplayFromModel(): void {
  if (props.range) {
    displayValue.value = formatTimeRangeDisplay(asRange(props.modelValue))
    return
  }

  const single = typeof props.modelValue === 'string' ? props.modelValue : ''
  displayValue.value = single
}

function syncDraftFromModel(): void {
  if (props.range) {
    const range = asRange(props.modelValue)
    draftFrom.value = range.from || '00:00:00'
    draftTo.value = range.to || '00:00:00'
    fromCommitted.value = Boolean(range.from)
    toCommitted.value = Boolean(range.to)
    return
  }

  const single = typeof props.modelValue === 'string' ? props.modelValue : ''
  draftFrom.value = single || '00:00:00'
}

watch(
  () => [props.modelValue, props.range, props.locale] as const,
  () => {
    syncDisplayFromModel()
    syncDraftFromModel()
  },
  { immediate: true, deep: true },
)

watch(
  () => props.disabled,
  (isDisabled) => {
    if (isDisabled) closePanel()
  },
)

function emitSingle(value: string): void {
  emit('update:modelValue', value)
}

function emitRange(range: TimeRangeValue): void {
  emit('update:modelValue', range)
}

function setPart(part: 'hours' | 'minutes' | 'seconds', raw: string): void {
  const parts = { ...activeParts.value }
  parts[part] = Number(raw)
  activeDraft.value = formatTimeHms(parts.hours, parts.minutes, parts.seconds)
  commitDraft()
}

function commitDraft(): void {
  if (props.range) {
    if (editingBound.value === 'from') {
      fromCommitted.value = true
    } else {
      toCommitted.value = true
    }

    const from = fromCommitted.value ? draftFrom.value : ''
    const to = toCommitted.value ? draftTo.value : ''
    const normalized = normalizeTimeRange(from, to)
    if (normalized.from) draftFrom.value = normalized.from
    if (normalized.to) draftTo.value = normalized.to
    emitRange(normalized)
    syncDisplayFromModel()
    return
  }

  const parsed = parseTimeInput(draftFrom.value)
  if (parsed === null) {
    syncDraftFromModel()
    return
  }
  emitSingle(parsed)
  syncDisplayFromModel()
}

function onDisplayInput(event: Event): void {
  displayValue.value = (event.target as HTMLInputElement).value
}

function commitDisplayValue(): void {
  if (props.range) {
    const parts = displayValue.value.split(/\s*[–-]\s*/)
    const from = parseTimeInput(parts[0] ?? '')
    const to = parseTimeInput(parts[1] ?? '')
    if (from === null || to === null) {
      syncDisplayFromModel()
      return
    }
    emitRange(normalizeTimeRange(from, to))
    syncDisplayFromModel()
    return
  }

  const parsed = parseTimeInput(displayValue.value)
  if (parsed === null) {
    syncDisplayFromModel()
    return
  }
  emitSingle(parsed)
  syncDisplayFromModel()
}

function togglePanel(): void {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) syncDraftFromModel()
}

function closePanel(): void {
  open.value = false
}

function clearValue(): void {
  if (props.range) {
    emitRange(emptyRange())
  } else {
    emitSingle('')
  }
  closePanel()
}

function onDocumentPointerDown(event: MouseEvent): void {
  if (!open.value) return
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  closePanel()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && open.value) closePanel()
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
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
      @click.stop="togglePanel"
    >
      <Clock :size="14" aria-hidden="true" />
    </button>

    <div
      v-if="open"
      class="absolute top-[calc(100%+0.375rem)] right-0 z-[var(--ds-z-dropdown)] w-full min-w-[16rem] rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      @click.stop
    >
      <div v-if="range" class="mb-2 flex gap-1">
        <button
          type="button"
          class="flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors"
          :class="editingBound === 'from' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-accent'"
          @click="editingBound = 'from'"
        >
          {{ fromLabel }}
        </button>
        <button
          type="button"
          class="flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors"
          :class="editingBound === 'to' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-accent'"
          @click="editingBound = 'to'"
        >
          {{ toLabel }}
        </button>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <label class="flex flex-col gap-1">
          <span class="text-xs text-muted-foreground">HH</span>
          <select
            class="rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground"
            :value="padTimePart(activeParts.hours)"
            @change="setPart('hours', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="hour in hourOptions" :key="hour" :value="hour">{{ hour }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs text-muted-foreground">MM</span>
          <select
            class="rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground"
            :value="padTimePart(activeParts.minutes)"
            @change="setPart('minutes', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="minute in minuteOptions" :key="minute" :value="minute">{{ minute }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs text-muted-foreground">SS</span>
          <select
            class="rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground"
            :value="padTimePart(activeParts.seconds)"
            @change="setPart('seconds', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="second in secondOptions" :key="second" :value="second">{{ second }}</option>
          </select>
        </label>
      </div>

      <div class="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
        <button
          type="button"
          class="text-xs font-medium text-primary transition-opacity hover:opacity-80"
          @click="clearValue"
        >
          {{ resolvedClearLabel }}
        </button>
        <p class="font-mono text-xs text-muted-foreground">{{ activeDraft }}</p>
      </div>
    </div>
  </div>
</template>
