<script setup lang="ts">
import { computed, ref } from 'vue'
import UsageBlock from '../components/UsageBlock.vue'
import { usePlaygroundLocale } from '../composables/usePlaygroundLocale'
import { playgroundSnippetAttr, templateBooleanAttr } from '../utils/propTemplateName'
import type { type TimeRangeValue } from '@/lib/dateTimeTypes'
import Switch from '@/components/form/Switch.vue'
import TimeInput from '@/components/form/TimeInput.vue'
const { locale: appLocale, t } = usePlaygroundLocale()

const range = ref(false)
const disabled = ref(false)
const minuteStep = ref(1)
const secondStep = ref(1)
const singleValue = ref('14:30:00')
const rangeValue = ref<TimeRangeValue>({ from: '09:00:00', to: '18:30:00' })

const value = computed({
  get: () => (range.value ? rangeValue.value : singleValue.value),
  set: (next: string | TimeRangeValue) => {
    if (range.value) {
      rangeValue.value = next as TimeRangeValue
      return
    }
    singleValue.value = next as string
  },
})

const code = computed(() => {
  const lines = [
    '<TimeInput',
    '  v-model="time"',
    `  ${playgroundSnippetAttr('locale', appLocale.value === 'pt-BR' ? 'pt-BR' : 'en')}`,
  ]

  if (range.value) lines.push(`  ${templateBooleanAttr('range', true)}`)
  if (disabled.value) lines.push(`  ${templateBooleanAttr('disabled', true)}`)
  if (minuteStep.value !== 1) lines.push(`  ${playgroundSnippetAttr('minuteStep', minuteStep.value)}`)
  if (secondStep.value !== 1) lines.push(`  ${playgroundSnippetAttr('secondStep', secondStep.value)}`)

  lines.push('/>')
  return lines.join('\n')
})
</script>

<template>
  <div>
    <p class="mb-4 font-mono text-xs uppercase tracking-wider text-[#4D6A87]">{{ t('drawer.livePlayground') }}</p>
    <div class="pg-playground-panel mb-6 space-y-5 rounded-xl p-4">
      <div class="pg-playground-preview rounded-xl p-4">
        <TimeInput
          :key="`${range}-${disabled}-${minuteStep}-${secondStep}`"
          v-model="value"
          :locale="appLocale === 'pt-BR' ? 'pt-BR' : 'en'"
          :range="range"
          :disabled="disabled"
          :minute-step="minuteStep"
          :second-step="secondStep"
          class="max-w-sm"
        />
      </div>
      <label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#4D6A87]">
        <Switch v-model="range" size="sm" />
        range
      </label>
      <label class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#4D6A87]">
        <Switch v-model="disabled" size="sm" />
        disabled
      </label>
      <div class="space-y-1 px-2">
        <label class="block font-mono text-xs text-[#4D6A87]">minuteStep — {{ minuteStep }}</label>
        <input v-model.number="minuteStep" type="number" min="1" max="30" class="w-full rounded-md border border-border bg-background px-2 py-1 text-xs" />
      </div>
      <div class="space-y-1 px-2">
        <label class="block font-mono text-xs text-[#4D6A87]">secondStep — {{ secondStep }}</label>
        <input v-model.number="secondStep" type="number" min="1" max="30" class="w-full rounded-md border border-border bg-background px-2 py-1 text-xs" />
      </div>
    </div>
    <UsageBlock :code="code" />
  </div>
</template>
