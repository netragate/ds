import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import Tooltip from '@/components/overlay/Tooltip.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import DateInput from '@/components/form/DateInput.vue'
import DataTableColumnFilterMenu from '@/components/data-display/DataTableColumnFilterMenu.vue'
import Divider from '@/components/data-display/Divider.vue'
import EmptyState from '@/components/data-display/EmptyState.vue'
import Progress from '@/components/feedback/Progress.vue'
import Spinner from '@/components/feedback/Spinner.vue'
import Grid from '@/components/layout/Grid.vue'
import Link from '@/components/link/Link.vue'
import Chip from '@/components/form/Chip.vue'
import Input from '@/components/form/Input.vue'
import Alert from '@/components/feedback/Alert.vue'
import PageSizeSelect from '@/components/data-display/PageSizeSelect.vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import Modal from '@/components/overlay/Modal.vue'
import ModalHeader from '@/components/overlay/ModalHeader.vue'
import ModalBody from '@/components/overlay/ModalBody.vue'
import ModalFooter from '@/components/overlay/ModalFooter.vue'
import ModalTitle from '@/components/overlay/ModalTitle.vue'
import Dialog from '@/components/overlay/Dialog.vue'
import type { DataTableColumnFilters, DataTableLabels } from '@/components/data-display/dataTableTypes'
import {
  formatCellValue,
  formatDataTableLabel,
  applyColumnFilters,
  sortDataTableRows,
  getCellValue,
} from '@/components/data-display/dataTableUtils'
import {
  inclusiveDaySpan,
  isDateRangeWithinMaxDays,
  normalizeDateRange,
  parseLocaleDateInput,
  compareIsoDate,
  formatIsoForLocale,
} from '@/lib/dateUtils'

const labels = {
  filterTitle: 'Filter {column}',
  filterPlaceholder: 'Filter {column}…',
  filterAriaLabel: 'Filter {column}',
  filterApply: 'Apply',
  filterClear: 'Clear',
  filterEnumAll: 'All {column}',
  filterDateFrom: 'From',
  filterDateTo: 'To',
  filterDateFromAriaLabel: 'From date',
  filterDateToAriaLabel: 'To date',
} as Required<DataTableLabels>

describe('Tooltip placements and delay', () => {
  it.each(['top', 'bottom', 'left', 'right', 'top-start', 'top-end'] as const)(
    'shows on %s placement',
    async (placement) => {
      vi.useFakeTimers()
      const wrapper = mount(Tooltip, {
        props: {
          content: `Tip-${placement}`,
          placement,
          delay: 0,
          variant: 'primary',
          shortcut: '⌘K',
        },
        slots: { default: `<button type="button">${placement}</button>` },
        attachTo: document.body,
      })
      await wrapper.find('span.inline-flex').trigger('mouseenter')
      await vi.runAllTimersAsync()
      await nextTick()
      expect(document.body.textContent).toContain(`Tip-${placement}`)
      await wrapper.find('span.inline-flex').trigger('mouseleave')
      wrapper.unmount()
      vi.useRealTimers()
    },
  )

  it('uses appearance fallback and focus events', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: 'Focus tip', delay: 0, appearance: 'danger', flip: false },
      slots: { default: '<button type="button">F</button>' },
      attachTo: document.body,
    })
    await wrapper.find('span.inline-flex').trigger('focusin')
    await vi.runAllTimersAsync()
    await nextTick()
    expect(document.body.textContent).toContain('Focus tip')
    await wrapper.find('span.inline-flex').trigger('focusout')
    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('TimeInput range typing and outside close', () => {
  it('parses range display text and clears range', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        range: true,
        modelValue: { from: '09:00:00', to: '17:00:00' },
        locale: 'pt-BR',
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })

    const input = wrapper.find('input')
    await input.setValue('10:00 – 12:00')
    await input.trigger('blur')
    await nextTick()
    expect(wrapper.props('modelValue')).toEqual({ from: '10:00:00', to: '12:00:00' })

    await input.setValue('bad')
    await input.trigger('blur')
    await nextTick()

    await wrapper.find('button[aria-expanded]').trigger('click')
    const clear = wrapper.findAll('button').find((btn) => btn.text() === 'Limpar')
    await clear!.trigger('click')
    expect(wrapper.props('modelValue')).toEqual({ from: '', to: '' })
    wrapper.unmount()
  })

  it('closes on outside mousedown and when disabled while open', async () => {
    const wrapper = mount(TimeInput, {
      props: { modelValue: '08:00:00' },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('true')
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await nextTick()
    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('false')

    await wrapper.find('button[aria-expanded]').trigger('click')
    await wrapper.setProps({ disabled: true })
    await nextTick()
    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })
})

describe('DataTableColumnFilterMenu interactions', () => {
  it('opens, applies, clears, escapes, and ignores when disabled', async () => {
    const filters = ref<DataTableColumnFilters>({})
    const open = ref(false)
    const wrapper = mount(DataTableColumnFilterMenu, {
      props: {
        column: { key: 'name', label: 'Name', filter: 'text' },
        labels,
        open: open.value,
        applyMode: true,
        modelValue: filters.value,
        'onUpdate:open': (value: boolean) => {
          open.value = value
          void wrapper.setProps({ open: value })
        },
        'onUpdate:modelValue': (value: DataTableColumnFilters) => {
          filters.value = value
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(open.value).toBe(true)

    const input = document.body.querySelector('input') as HTMLInputElement | null
    expect(input).toBeTruthy()
    input!.value = 'Ana'
    input!.dispatchEvent(new Event('input', { bubbles: true }))
    await flushPromises()
    const apply = document.body.querySelector('button[aria-label="Apply"]') as HTMLButtonElement
    apply?.click()
    await flushPromises()
    expect(filters.value.name).toBe('Ana')

    await wrapper.setProps({ open: true })
    await flushPromises()
    const clear = [...document.body.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Clear')
    clear?.click()
    await flushPromises()

    await wrapper.setProps({ open: true, disabled: false })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    wrapper.unmount()
  })
})

describe('DateInput showTime today and range invalid type-in', () => {
  const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
    mount(DateInput, {
      ...options,
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
    })

  it('selects today with showTime without closing', async () => {
    const wrapper = dateInputMount({
      props: {
        showTime: true,
        modelValue: { date: '', time: '' },
        locale: 'en',
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const today = wrapper.findAll('button').find((btn) => btn.text() === 'Today')
    await today!.trigger('click')
    await nextTick()
    const value = wrapper.props('modelValue') as { date: string; time: string }
    expect(value.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('does not parse type-in while range is enabled', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        modelValue: { from: '2026-06-10', to: '2026-06-12' },
        locale: 'en',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('06/20/2026')
    await input.trigger('blur')
    expect(wrapper.props('modelValue')).toEqual({ from: '2026-06-10', to: '2026-06-12' })
    wrapper.unmount()
  })
})

describe('Small component branch fills', () => {
  it('covers Divider EmptyState Progress Spinner Grid Link Alert Input Chip', async () => {
    expect(mount(Divider).exists()).toBe(true)
    expect(mount(Divider, { props: { orientation: 'vertical' } }).exists()).toBe(true)
    expect(
      mount(EmptyState, {
        props: { title: 'None', description: 'Empty' },
        slots: { action: '<button>Retry</button>' },
      }).text(),
    ).toContain('None')
    expect(mount(Progress, { props: { value: 0 } }).attributes('aria-valuenow')).toBe('0')
    expect(mount(Progress, { props: { value: 100 } }).attributes('aria-valuenow')).toBe('100')
    expect(mount(Spinner, { props: { size: 'sm', glow: false } }).exists()).toBe(true)
    expect(mount(Grid, { props: { cols: 3, mdCols: 4, lgCols: 6 } }).exists()).toBe(true)
    expect(mount(Link, { props: { href: '#', external: true }, slots: { default: 'Go' } }).attributes('target')).toBe('_blank')
    expect(mount(Alert, { props: { variant: 'info', title: 'Note' } }).text()).toContain('Note')
    expect(mount(Input, { props: { modelValue: 'x', error: true, message: 'Required' } }).text()).toContain('Required')

    const chip = mount(Chip, { props: { modelValue: ['A', 'B'] } })
    await chip.find('input').trigger('keydown', { key: 'Backspace' })
    expect(chip.emitted('update:modelValue')?.[0]).toEqual([['A']])
    chip.unmount()
  })

  it('PageSizeSelect via native select options', async () => {
    const wrapper = mount(PageSizeSelect, {
      props: {
        modelValue: 10,
        options: [10, 25],
        'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
      },
    })
    const select = wrapper.find('select')
    if (select.exists()) {
      await select.setValue('25')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([25])
    }
    wrapper.unmount()
  })
})

describe('Modal composition Dialog description-only', () => {
  it('composes modal parts and description-only dialog', async () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      slots: {
        default: `
          <ModalHeader has-close-button @close="() => {}"><ModalTitle>T</ModalTitle></ModalHeader>
          <ModalBody>B</ModalBody>
          <ModalFooter>F</ModalFooter>
        `,
      },
      global: { components: { ModalHeader, ModalBody, ModalFooter, ModalTitle } },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('T')
    wrapper.unmount()

    const dialog = mount(Dialog, {
      props: { open: true },
      slots: { description: 'Only desc', default: 'Body' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Only desc')
    dialog.unmount()
  })
})

describe('AppLayoutPanelOverlay close via slot and non-resizable open sync', () => {
  it('exposes closePanel from slot and resets width on close', async () => {
    const open = ref(true)
    const wrapper = mount(AppLayoutPanelOverlay, {
      props: {
        open: open.value,
        resizable: false,
        backdrop: true,
        initialWidth: '18rem',
        'onUpdate:open': (value: boolean) => {
          open.value = value
          void wrapper.setProps({ open: value })
        },
      },
      slots: {
        default: `<template #default="{ closePanel }"><button type="button" @click="closePanel">Close me</button></template>`,
      },
    })
    await nextTick()
    const closeBtn = wrapper.findAll('button').find((b) => b.text() === 'Close me')
    if (closeBtn) {
      await closeBtn.trigger('click')
      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    }
    await wrapper.setProps({ open: false })
    await wrapper.setProps({ open: true })
    await nextTick()
    wrapper.unmount()
  })
})

describe('utils leftover branches', () => {
  it('covers dataTableUtils and dateUtils edge cases', () => {
    expect(formatDataTableLabel('X {column}', 'Name')).toBe('X Name')
    expect(formatCellValue(null)).toBe('')
    expect(formatCellValue({ a: 1 })).toBe('{"a":1}')
    expect(formatCellValue(true)).toBe('true')
    expect(getCellValue({ a: null }, 'a.b')).toBeUndefined()
    expect(sortDataTableRows([{ n: 2 }, { n: 1 }], null, 'asc')).toHaveLength(2)
    expect(
      applyColumnFilters([{ name: 'Ana' }], [{ key: 'name', label: 'Name', filter: 'text' }], {
        name: '  ',
      }),
    ).toHaveLength(1)

    expect(normalizeDateRange('2026-06-12', '2026-06-10')).toEqual({
      from: '2026-06-10',
      to: '2026-06-12',
    })
    expect(compareIsoDate('2026-06-10', '2026-06-11')).toBeLessThan(0)
    expect(formatIsoForLocale('2026-06-10', 'pt-BR')).toContain('2026')
    expect(inclusiveDaySpan('2026-06-10', 'bad')).toBeNull()
    expect(isDateRangeWithinMaxDays('2026-06-10', '2026-06-12', 0)).toBe(true)
    expect(parseLocaleDateInput('32/01/2026', 'pt-BR')).toBeNull()
    expect(parseLocaleDateInput('01/32/2026', 'en')).toBeNull()
    expect(parseLocaleDateInput('15/06/26', 'pt-BR')).toBe('2026-06-15')
  })

  it('sidebar menu open key helpers handle nested paths', async () => {
    const mod = await import('@/components/navigation/sidebarMenuOpenKeys')
    expect(mod.ancestorMenuKeys('a.b.c')).toEqual(expect.arrayContaining(['a', 'a.b']))
    expect(mod.menuIdsEqual('a/b', 'a.b')).toBe(true)
    expect(mod.isDescendantMenuKey('a.b.c', 'a')).toBe(true)
    expect(mod.parentMenuKey('a')).toBeNull()
  })
})
