<script setup lang="ts">
import { computed } from 'vue'
import { Check } from '@lucide/vue'
import { cn } from '@/lib/utils'
import Input from '@/components/form/Input.vue'
import DateInput from '@/components/form/DateInput.vue'
import Select from '@/components/form/Select.vue'
import IconButton from '@/components/button/IconButton.vue'
import type {
  DataTableColumn,
  DataTableColumnFilters,
  DataTableLabels,
} from './dataTableTypes'
import { formatDataTableLabel, patchColumnFilter } from './dataTableUtils'

const props = withDefaults(
  defineProps<{
    column: DataTableColumn
    canApply?: boolean
    disabled?: boolean
    inlineActions?: boolean
    labels: Required<DataTableLabels>
    locale?: string
    layout?: 'inline' | 'popover'
  }>(),
  {
    canApply: false,
    inlineActions: false,
    layout: 'inline',
    locale: 'en',
  },
)

const emit = defineEmits<{
  apply: []
}>()

const filters = defineModel<DataTableColumnFilters>({ required: true })

function patchFilter(value: DataTableColumnFilters[string]): void {
  filters.value = patchColumnFilter(filters.value, props.column.key, value)
}

const textValue = computed({
  get: () => (filters.value[props.column.key] as string) ?? '',
  set: (value: string) => patchFilter(value),
})

const dateFrom = computed({
  get: () => {
    const current = filters.value[props.column.key]
    return typeof current === 'object' && current != null && !Array.isArray(current)
      ? current.from
      : ''
  },
  set: (from: string) => {
    const current = filters.value[props.column.key]
    const to =
      typeof current === 'object' && current != null && !Array.isArray(current) ? current.to : ''
    patchFilter({ from, to })
  },
})

const dateTo = computed({
  get: () => {
    const current = filters.value[props.column.key]
    return typeof current === 'object' && current != null && !Array.isArray(current)
      ? current.to
      : ''
  },
  set: (to: string) => {
    const current = filters.value[props.column.key]
    const from =
      typeof current === 'object' && current != null && !Array.isArray(current) ? current.from : ''
    patchFilter({ from, to })
  },
})

const enumValue = computed({
  get: () => {
    const current = filters.value[props.column.key]
    return Array.isArray(current) ? current : []
  },
  set: (value: string | string[]) => {
    patchFilter(Array.isArray(value) ? value : value ? [value] : [])
  },
})

const enumOptions = computed(() =>
  (props.column.filterOptions ?? []).map((option) => ({
    label: option.label,
    value: option.value,
  })),
)

const filterPlaceholder = computed(() =>
  formatDataTableLabel(props.labels.filterPlaceholder, props.column.label.toLowerCase()),
)

const filterAriaLabel = computed(() =>
  formatDataTableLabel(props.labels.filterAriaLabel, props.column.label),
)

const enumPlaceholder = computed(() =>
  formatDataTableLabel(props.labels.filterEnumAll, props.column.label.toLowerCase()),
)

const applyButtonClass = 'size-8 shrink-0 px-0'
</script>

<template>
  <div
    v-if="column.filter === 'text'"
    :class="layout === 'popover' ? 'min-w-[12rem]' : 'min-w-[7rem]'"
  >
    <div v-if="inlineActions" class="flex items-center gap-1.5">
      <div class="min-w-0 flex-1">
        <Input
          v-model="textValue"
          size="sm"
          :disabled="disabled"
          :placeholder="filterPlaceholder"
          :aria-label="filterAriaLabel"
        />
      </div>
      <IconButton
        type="button"
        variant="primary"
        size="sm"
        :class="applyButtonClass"
        :disabled="disabled || !canApply"
        :aria-label="labels.filterApply"
        @click="emit('apply')"
      >
        <Check :size="14" aria-hidden="true" />
      </IconButton>
    </div>
    <Input
      v-else
      v-model="textValue"
      size="sm"
      :disabled="disabled"
      :placeholder="filterPlaceholder"
      :aria-label="filterAriaLabel"
    />
  </div>

  <div
    v-else-if="column.filter === 'date'"
    :class="
      layout === 'popover'
        ? 'flex w-full min-w-[12rem] flex-col gap-2'
        : 'flex min-w-[12rem] flex-col gap-1.5'
    "
  >
    <div v-if="inlineActions" class="flex items-start gap-1.5">
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <label class="flex w-full flex-col gap-1">
          <span class="text-xs text-muted-foreground">{{ labels.filterDateFrom }}</span>
          <DateInput
            v-model="dateFrom"
            size="sm"
            :disabled="disabled"
            :locale="locale"
            :aria-label="labels.filterDateFromAriaLabel"
          />
        </label>
        <label class="flex w-full flex-col gap-1">
          <span class="text-xs text-muted-foreground">{{ labels.filterDateTo }}</span>
          <DateInput
            v-model="dateTo"
            size="sm"
            :disabled="disabled"
            :locale="locale"
            :aria-label="labels.filterDateToAriaLabel"
          />
        </label>
      </div>
      <IconButton
        type="button"
        variant="primary"
        size="sm"
        :class="cn(applyButtonClass, 'self-end')"
        :disabled="disabled || !canApply"
        :aria-label="labels.filterApply"
        @click="emit('apply')"
      >
        <Check :size="14" aria-hidden="true" />
      </IconButton>
    </div>
    <template v-else>
      <label class="flex w-full flex-col gap-1">
        <span class="text-xs text-muted-foreground">{{ labels.filterDateFrom }}</span>
        <DateInput
          v-model="dateFrom"
          size="sm"
          :disabled="disabled"
          :locale="locale"
          :aria-label="labels.filterDateFromAriaLabel"
        />
      </label>
      <label class="flex w-full flex-col gap-1">
        <span class="text-xs text-muted-foreground">{{ labels.filterDateTo }}</span>
        <DateInput
          v-model="dateTo"
          size="sm"
          :disabled="disabled"
          :locale="locale"
          :aria-label="labels.filterDateToAriaLabel"
        />
      </label>
    </template>
  </div>

  <div
    v-else-if="column.filter === 'enum'"
    :class="layout === 'popover' ? 'min-w-[12rem]' : 'min-w-[8rem]'"
  >
    <div v-if="inlineActions" class="flex items-center gap-1.5">
      <div class="min-w-0 flex-1">
        <Select
          v-model="enumValue"
          :options="enumOptions"
          multiple
          :searchable="false"
          :disabled="disabled"
          :placeholder="enumPlaceholder"
          class="w-full"
          :aria-label="filterAriaLabel"
        />
      </div>
      <IconButton
        type="button"
        variant="primary"
        size="sm"
        :class="applyButtonClass"
        :disabled="disabled || !canApply"
        :aria-label="labels.filterApply"
        @click="emit('apply')"
      >
        <Check :size="14" aria-hidden="true" />
      </IconButton>
    </div>
    <Select
      v-else
      v-model="enumValue"
      :options="enumOptions"
      multiple
      :searchable="false"
      :disabled="disabled"
      :placeholder="enumPlaceholder"
      class="w-full"
      :aria-label="filterAriaLabel"
    />
  </div>
</template>
