<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Check from '@lucide/vue/dist/esm/icons/check.mjs'
import ChevronDown from '@lucide/vue/dist/esm/icons/chevron-down.mjs'
import Search from '@lucide/vue/dist/esm/icons/search.mjs'
import X from '@lucide/vue/dist/esm/icons/x.mjs'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  modelValue?: string | string[]
  options: SelectOption[]
  multiple?: boolean
  searchable?: boolean
  /**
   * When true, typing a value that is not in options offers creating it.
   * Ignored when `serverSearch` is true.
   */
  creatable?: boolean
  /**
   * When true, options are not filtered locally. Parent owns filtering via the
   * `search` event and by updating `options`. Disables create-from-query.
   */
  serverSearch?: boolean
  /** Minimum characters before emitting `search` (serverSearch only). */
  minSearchChars?: number
  /** Shows a searching empty state while the parent loads remote options. */
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  id?: string
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  multiple: false,
  searchable: true,
  creatable: false,
  serverSearch: false,
  minSearchChars: 0,
  loading: false,
  disabled: false,
  placeholder: 'Select an option...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  search: [query: string]
}>()

const open = ref(false)
const query = ref('')
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)
const panelStyle = ref({ top: '0px', left: '0px', width: '0px' })
const PANEL_GAP_PX = 4
const VIEWPORT_PADDING_PX = 8
/** Fallback when panel is not measured yet (max-h-44 ≈ 11rem + chrome). */
const PANEL_HEIGHT_FALLBACK_PX = 220

function updatePanelPosition(): void {
  if (!triggerRef.value) return

  const rect = triggerRef.value.getBoundingClientRect()
  const viewportH = window.innerHeight
  const viewportW = window.innerWidth
  const panelHeight = panelRef.value?.offsetHeight || PANEL_HEIGHT_FALLBACK_PX
  const spaceBelow = viewportH - rect.bottom - VIEWPORT_PADDING_PX
  const spaceAbove = rect.top - VIEWPORT_PADDING_PX
  const openUpward = spaceBelow < panelHeight && spaceAbove > spaceBelow

  let top = openUpward
    ? rect.top - panelHeight - PANEL_GAP_PX
    : rect.bottom + PANEL_GAP_PX
  top = Math.max(
    VIEWPORT_PADDING_PX,
    Math.min(top, viewportH - Math.min(panelHeight, viewportH - VIEWPORT_PADDING_PX * 2) - VIEWPORT_PADDING_PX),
  )

  let left = rect.left
  const width = rect.width
  if (left + width > viewportW - VIEWPORT_PADDING_PX) {
    left = Math.max(VIEWPORT_PADDING_PX, viewportW - width - VIEWPORT_PADDING_PX)
  }
  left = Math.max(VIEWPORT_PADDING_PX, left)

  panelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
  }
}

const selectedValues = computed<string[]>(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }
  return typeof props.modelValue === 'string' && props.modelValue ? [props.modelValue] : []
})

const selectedOptions = computed(() =>
  props.options.filter((option) => selectedValues.value.includes(option.value)),
)

const creatableEnabled = computed(() => props.creatable && !props.serverSearch)

const needsMoreSearchChars = computed(() => {
  if (!props.serverSearch) return false
  const min = Math.max(0, props.minSearchChars)
  return query.value.trim().length < min
})

const filteredOptions = computed(() => {
  if (props.serverSearch) return props.options
  const term = query.value.trim().toLowerCase()
  if (!term) return props.options
  return props.options.filter((option) => option.label.toLowerCase().includes(term))
})

const createCandidate = computed(() => {
  if (!creatableEnabled.value) return ''
  const term = query.value.trim()
  if (!term) return ''
  const exists = props.options.some(
    (option) =>
      option.value.toLowerCase() === term.toLowerCase() ||
      option.label.toLowerCase() === term.toLowerCase(),
  )
  return exists ? '' : term
})

const emptyMessage = computed(() => {
  if (props.serverSearch && needsMoreSearchChars.value) {
    const min = Math.max(0, props.minSearchChars)
    return `Type at least ${min} character${min === 1 ? '' : 's'}…`
  }
  if (props.serverSearch && props.loading) return 'Searching…'
  return 'No results found'
})

const singleLabel = computed(() => {
  const selected = selectedValues.value[0]
  if (!selected) return ''
  return props.options.find((option) => option.value === selected)?.label ?? selected
})

function isSelected(value: string): boolean {
  return selectedValues.value.includes(value)
}

function toggleOpen(): void {
  if (props.disabled) return
  open.value = !open.value
}

function selectOption(value: string): void {
  if (props.multiple) {
    const next = isSelected(value)
      ? selectedValues.value.filter((item) => item !== value)
      : [...selectedValues.value, value]
    emit('update:modelValue', next)
    return
  }

  emit('update:modelValue', value)
  open.value = false
  query.value = ''
}

function removeTag(value: string): void {
  if (!props.multiple) return
  emit(
    'update:modelValue',
    selectedValues.value.filter((item) => item !== value),
  )
}

function clearAll(): void {
  if (!props.multiple) return
  emit('update:modelValue', [])
}

function createFromQuery(): void {
  const term = createCandidate.value
  if (!term) return
  selectOption(term)
}

function emitServerSearch(term: string): void {
  if (!props.serverSearch) return
  const min = Math.max(0, props.minSearchChars)
  const trimmed = term.trim()
  emit('search', trimmed.length >= min ? trimmed : '')
}

function onDocumentPointerDown(event: PointerEvent): void {
  if (!open.value) return
  const target = event.target as Node
  if (triggerRef.value?.contains(target) || panelRef.value?.contains(target)) return
  open.value = false
  query.value = ''
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    query.value = ''
    return
  }
  if (event.key === 'Enter' && open.value && createCandidate.value) {
    event.preventDefault()
    createFromQuery()
  }
}

watch(query, (term) => {
  emitServerSearch(term)
})

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    updatePanelPosition()
    // Second pass after paint so we use the real panel height for flip-up.
    requestAnimationFrame(() => {
      updatePanelPosition()
    })
    if (props.searchable) {
      searchRef.value?.focus()
    }
    if (props.serverSearch) {
      emitServerSearch(query.value)
    }
    return
  }
  query.value = ''
})

onMounted(() => {
  // Capture pointerdown so outside-close runs before target click.
  // A bubble-phase `click` listener races with toggleOpen and closes on the same open click.
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updatePanelPosition)
  window.addEventListener('scroll', updatePanelPosition, true)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updatePanelPosition)
  window.removeEventListener('scroll', updatePanelPosition, true)
})
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <div
      ref="triggerRef"
      :id="id"
      role="combobox"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :class="
        cn(
          'flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-lg border bg-input-background px-3 py-2 text-sm transition-all',
          open ? 'border-primary shadow-[0_0_0_1px_rgba(0,212,255,0.25)]' : 'border-border',
          disabled && 'cursor-not-allowed opacity-50',
        )
      "
      @click.stop="toggleOpen"
    >
      <Search v-if="searchable" :size="14" class="shrink-0 text-muted-foreground" />

      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        <template v-if="multiple">
          <span
            v-for="option in selectedOptions"
            :key="option.value"
            class="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/12 px-2 py-0.5 text-xs font-medium text-primary"
            @click.stop
          >
            {{ option.label }}
            <button
              type="button"
              class="rounded p-0.5 text-primary/80 transition-colors hover:bg-primary/20 hover:text-primary"
              :aria-label="`Remove ${option.label}`"
              @click.stop="removeTag(option.value)"
            >
              <X :size="10" stroke-width="2.5" />
            </button>
          </span>
          <span v-if="selectedOptions.length === 0" class="text-muted-foreground">
            {{ placeholder }}
          </span>
        </template>
        <span
          v-else
          class="truncate"
          :class="singleLabel ? 'text-foreground' : 'text-muted-foreground'"
        >
          {{ singleLabel || placeholder }}
        </span>
      </div>

      <ChevronDown
        :size="14"
        class="shrink-0 text-muted-foreground transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      />
    </div>

    <Teleport to="body">
      <div
        v-if="open"
        ref="panelRef"
        role="presentation"
        class="fixed z-[600] overflow-hidden rounded-lg border border-primary bg-popover text-sm shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        :style="panelStyle"
        @click.stop
      >
        <div v-if="searchable" class="border-b border-border/60 px-3 py-2.5">
          <input
            ref="searchRef"
            v-model="query"
            type="text"
            placeholder="Search..."
            class="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            @keydown.enter.prevent="createFromQuery"
          />
        </div>

        <div
          role="listbox"
          :aria-multiselectable="multiple || undefined"
          class="max-h-44 overflow-y-auto py-1"
        >
          <button
            v-for="option in filteredOptions"
            :key="option.value"
            type="button"
            role="option"
            :aria-selected="isSelected(option.value)"
            class="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-primary/8"
            :class="isSelected(option.value) ? 'text-primary' : 'text-foreground'"
            @click="selectOption(option.value)"
          >
            <span>{{ option.label }}</span>
            <Check
              v-if="isSelected(option.value)"
              :size="14"
              class="shrink-0 text-primary"
              stroke-width="2.5"
            />
          </button>
          <button
            v-if="createCandidate"
            type="button"
            role="option"
            class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-primary/8"
            @click="createFromQuery"
          >
            <span>Create “{{ createCandidate }}”</span>
          </button>
          <p
            v-else-if="filteredOptions.length === 0"
            class="px-3 py-4 text-center text-xs text-muted-foreground"
          >
            {{ emptyMessage }}
          </p>
        </div>

        <div
          v-if="multiple"
          class="flex items-center justify-between border-t border-border/60 px-3 py-2 text-xs"
        >
          <span class="text-muted-foreground">{{ selectedValues.length }} selected</span>
          <button
            type="button"
            class="font-medium text-destructive transition-opacity hover:opacity-80"
            :disabled="selectedValues.length === 0"
            @click.stop="clearAll"
          >
            Clear all
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
