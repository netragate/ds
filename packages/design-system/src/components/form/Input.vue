<script setup lang="ts">
import { computed, nextTick, useSlots, useTemplateRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import { formInputVariants, type FormInputVariants } from './formInputVariants'

export interface InputProps {
  size?: FormInputVariants['size'] | 'default'
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'date' | 'file'
  placeholder?: string
  minLength?: number
  maxLength?: number
  /** File input: accepted MIME types / extensions (native `accept`). */
  accept?: string
  /** File input: allow selecting more than one file. */
  multiple?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  success?: boolean
  message?: string
  id?: string
  lang?: string
  class?: string
  /**
   * Optional value transform applied on every input event (e.g. masks).
   * When the transformed value differs from what the user typed, the native
   * input is synced immediately so the DOM cannot keep rejected characters.
   * Ignored when `type` is `file`.
   */
  transform?: (value: string) => string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
  success: false,
  size: 'md',
  multiple: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [event: Event]
}>()

const slots = useSlots()
const inputEl = useTemplateRef<HTMLInputElement>('inputEl')

const isFile = computed(() => props.type === 'file')

const hasBefore = computed(() => !!slots.elemBefore)
const hasAfter = computed(() => !!slots.elemAfter)

// Map the ADS 'default' size alias to 'md', and 'compact' stays as 'compact'
const resolvedSize = computed(() => {
  if (props.size === 'default') return 'md'
  return props.size as FormInputVariants['size']
})

const fileButtonSizeClasses: Record<NonNullable<FormInputVariants['size']>, string> = {
  compact: 'file:px-2 file:text-xs',
  sm: 'file:px-2 file:text-xs',
  md: 'file:px-3 file:text-sm',
  lg: 'file:px-4 file:text-base',
}

const classes = computed(() =>
  cn(
    formInputVariants({
      size: resolvedSize.value,
      error: props.error,
      success: props.success && !props.error,
    }),
    hasBefore.value && 'pl-9',
    hasAfter.value && 'pr-9',
    isFile.value &&
      cn(
        'cursor-pointer p-0 pe-3 file:me-3 file:h-full file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-border file:bg-muted file:font-medium file:text-foreground',
        fileButtonSizeClasses[resolvedSize.value ?? 'md'],
      ),
    props.class,
  ),
)

function syncDomValue(value: string): void {
  if (isFile.value) return
  const el = inputEl.value
  if (el && el.value !== value) {
    el.value = value
  }
}

function fileNamesFromInput(el: HTMLInputElement): string {
  const files = el.files
  if (!files || files.length === 0) return ''
  return Array.from(files)
    .map((file) => file.name)
    .join(', ')
}

function onInput(event: Event): void {
  if (isFile.value) return
  const el = event.target as HTMLInputElement
  let value = el.value
  if (props.transform) {
    value = props.transform(value)
    syncDomValue(value)
  }
  emit('update:modelValue', value)
  // Parent may further normalize modelValue; keep the native input in sync.
  void nextTick(() => {
    syncDomValue(props.modelValue ?? '')
  })
}

function onChange(event: Event): void {
  if (!isFile.value) return
  const el = event.target as HTMLInputElement
  emit('update:modelValue', fileNamesFromInput(el))
  emit('change', event)
}

watch(
  () => props.modelValue,
  (value) => {
    syncDomValue(value ?? '')
  },
)
</script>

<template>
  <div class="w-full">
    <div class="relative flex w-full items-center">
      <span
        v-if="$slots.elemBefore"
        class="absolute left-3 flex items-center pointer-events-none text-muted-foreground"
      >
        <slot name="elemBefore" />
      </span>
      <input
        ref="inputEl"
        :id="id"
        :type="type"
        :value="isFile ? undefined : modelValue"
        :placeholder="isFile ? undefined : placeholder"
        :minlength="isFile ? undefined : minLength"
        :maxlength="isFile ? undefined : maxLength"
        :accept="isFile ? accept : undefined"
        :multiple="isFile ? multiple : undefined"
        :disabled="disabled"
        :readonly="isFile ? undefined : readonly"
        :lang="lang"
        :class="classes"
        :aria-invalid="error || undefined"
        :aria-describedby="error && message ? `${id}-error` : undefined"
        @input="onInput"
        @change="onChange"
      />
      <span
        v-if="$slots.elemAfter"
        class="absolute right-3 flex items-center pointer-events-none text-muted-foreground"
      >
        <slot name="elemAfter" />
      </span>
    </div>
    <p
      v-if="error && message"
      :id="id ? `${id}-error` : undefined"
      class="mt-1.5 text-sm text-destructive"
    >
      {{ message }}
    </p>
  </div>
</template>
