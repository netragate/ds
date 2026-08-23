<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UsageBlock from '../components/UsageBlock.vue'
import { usePlaygroundLocale } from '../composables/usePlaygroundLocale'
import { playgroundSnippetAttr, templateBooleanAttr } from '../utils/propTemplateName'
import { playgroundOptionStyle } from './playgroundOptionStyle'
import type { DateInputModelValue, DateRangeValue, DateTimeRangeValue, DateTimeValue } from '@/index'
import { DateInput, Switch } from '@/index'

const { locale: appLocale, t } = usePlaygroundLocale()

const localeOptions = ['en', 'pt-BR'] as const
type DateLocale = (typeof localeOptions)[number]

const range = ref(false)
const showTime = ref(false)
const disabled = ref(false)
const dateLocale = ref<DateLocale>(appLocale.value === 'pt-BR' ? 'pt-BR' : 'en')

const singleDate = ref('2026-06-16')
const dateRange = ref<DateRangeValue>({ from: '2026-06-10', to: '2026-06-16' })
const singleDateTime = ref<DateTimeValue>({ date: '2026-06-16', time: '14:30:00' })
const dateTimeRange = ref<DateTimeRangeValue>({
  from: { date: '2026-06-10', time: '09:00:00' },
  to: { date: '2026-06-16', time: '18:00:00' },
})

const value = computed<DateInputModelValue>({
  get() {
    if (range.value && showTime.value) return dateTimeRange.value
    if (range.value) return dateRange.value
    if (showTime.value) return singleDateTime.value
    return singleDate.value
  },
  set(next) {
    if (range.value && showTime.value) {
      dateTimeRange.value = next as DateTimeRangeValue
      return
    }
    if (range.value) {
      dateRange.value = next as DateRangeValue
      return
    }
    if (showTime.value) {
      singleDateTime.value = next as DateTimeValue
      return
    }
    singleDate.value = next as string
  },
})

watch(appLocale, (locale) => {
  dateLocale.value = locale === 'pt-BR' ? 'pt-BR' : 'en'
})

const code = computed(() => {
  const lines = [
    '<DateInput',
    '  v-model="date"',
    `  ${playgroundSnippetAttr('locale', dateLocale.value)}`,
  ]

  if (range.value) lines.push(`  ${templateBooleanAttr('range', true)}`)
  if (showTime.value) lines.push(`  ${templateBooleanAttr('showTime', true)}`)
  if (disabled.value) lines.push(`  ${templateBooleanAttr('disabled', true)}`)

  lines.push('/>')
  return lines.join('\n')
})
</script>

<template>
  <div>
    <p class="mb-4 font-mono text-xs uppercase tracking-wider text-[#4D6A87]">{{ t('drawer.livePlayground') }}</p>
    <div class="pg-playground-panel mb-6 space-y-5 rounded-xl p-4">
      <div class="pg-playground-preview rounded-xl p-4">
        <DateInput
          :key="`${dateLocale}-${range}-${showTime}-${disabled}`"
          v-model="value"
          :locale="dateLocale"
          :range="range"
          :show-time="showTime"
          :disabled="disabled"
          class="max-w-sm"
        />
      </div>
      <div>
        <p class="mb-2 font-mono text-xs uppercase tracking-wider text-[#4D6A87]">locale</p>
        <button
          v-for="item in localeOptions"
          :key="item"
          type="button"
          class="mb-1 block w-full rounded px-2 py-1 text-left text-xs transition-all"
          :style="playgroundOptionStyle(dateLocale === item)"
          @click="dateLocale = item"
        >
          {{ item }}
        </button>
      </div>
      <label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#4D6A87]">
        <Switch v-model="range" size="sm" />
        range
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#4D6A87]">
        <Switch v-model="showTime" size="sm" />
        showTime
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#4D6A87]">
        <Switch v-model="disabled" size="sm" />
        disabled
      </label>
    </div>
    <UsageBlock :code="code" />
  </div>
</template>
