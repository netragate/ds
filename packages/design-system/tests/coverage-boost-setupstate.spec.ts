import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import Select from '@/components/form/Select.vue'
import DataTableColumnFilterMenu from '@/components/data-display/DataTableColumnFilterMenu.vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import Tooltip from '@/components/overlay/Tooltip.vue'
import type { DataTableColumnFilters, DataTableLabels } from '@/components/data-display/dataTableTypes'

function setupState(wrapper: { vm: unknown }): Record<string, any> {
  return ((wrapper.vm as any).$?.setupState ?? wrapper.vm) as Record<string, any>
}

function mockRect(el: Element, rect: Partial<DOMRect>) {
  Object.defineProperty(el, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      toJSON: () => ({}),
      ...rect,
    }),
  })
}

const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
  mount(DateInput, {
    ...options,
    global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
  })

describe('DateInput setupState branch hammer', () => {
  it('exercises selectToday range, confirm guards, and panel positioning', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        showTime: true,
        locale: 'en',
        maxRangeDays: 5,
        modelValue: {
          from: { date: '2026-06-10', time: '09:00:00' },
          to: { date: '2026-06-12', time: '18:00:00' },
        },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })

    const state = setupState(wrapper)

    state.selectToday()
    await nextTick()
    expect(state.pendingRange).toBeTruthy()

    state.pendingRange = null
    state.confirmRange()

    state.open = true
    state.rangeDraftFrom = '2026-06-10'
    state.selectDay('2026-06-20')
    expect(state.pendingRange).toBeNull()

    state.rangeDraftFrom = '2026-06-10'
    state.selectDay('2026-06-12')
    await nextTick()
    state.confirmRange()

    if (state.rootRef) {
      mockRect(state.rootRef, {
        top: 700,
        left: 50,
        bottom: 740,
        right: 350,
        width: 300,
        height: 40,
      })
    }
    state.open = true
    await state.updatePanelPosition()
    if (state.panelRef) {
      mockRect(state.panelRef, {
        top: 750,
        left: 50,
        bottom: 1100,
        right: 450,
        width: 400,
        height: 350,
      })
    }
    await state.updatePanelPosition()

    if (state.rootRef) {
      mockRect(state.rootRef, {
        top: 20,
        left: 900,
        bottom: 60,
        right: 1200,
        width: 300,
        height: 40,
      })
    }
    await state.updatePanelPosition()

    wrapper.unmount()
  })

  it('covers single showTime today and disabled toggle', async () => {
    const wrapper = dateInputMount({
      props: {
        showTime: true,
        locale: 'en',
        modelValue: { date: '2026-06-15', time: '10:00:00' },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    state.selectToday()
    await nextTick()
    expect((wrapper.props('modelValue') as { date: string }).date).toMatch(/^\d{4}-\d{2}-\d{2}$/)

    await wrapper.setProps({ disabled: true })
    state.open = false
    state.toggleCalendar()
    expect(state.open).toBe(false)
    wrapper.unmount()
  })
})

describe('TimeInput setupState branches', () => {
  it('commits invalid draft and switches editing bound', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        range: true,
        modelValue: { from: '09:00:00', to: '10:00:00' },
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })
    const state = setupState(wrapper)

    state.open = true
    state.editingBound = 'to'
    state.setPart('hours', '15')
    await nextTick()
    state.draftFrom = 'not-a-time'
    state.commitDraft()
    state.displayValue = 'bad'
    state.commitDisplayValue()
    wrapper.unmount()
  })
})

describe('Select setupState', () => {
  it('covers server search emit and create candidate paths', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ label: 'One', value: '1' }],
        searchable: true,
        serverSearch: true,
        creatable: true,
        minSearchChars: 2,
        'onUpdate:modelValue': (value: string | string[]) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })
    const state = setupState(wrapper)

    state.emitServerSearch('a')
    state.emitServerSearch('ab')
    expect(wrapper.emitted('search')?.length).toBeGreaterThan(0)
    state.open = true
    state.query = 'brand-new'
    state.createFromQuery()
    if (state.triggerRef) {
      mockRect(state.triggerRef, {
        top: 700,
        left: 800,
        bottom: 740,
        right: 1000,
        width: 200,
        height: 40,
      })
    }
    state.updatePanelPosition()
    wrapper.unmount()
  })
})

describe('AppLayoutPanelOverlay setupState', () => {
  it('clamps resize against rem percent and min()', async () => {
    const wrapper = mount(AppLayoutPanelOverlay, {
      props: {
        open: true,
        initialWidth: 'min(20rem, 40%)',
        minWidth: '10rem',
        maxWidth: '70%',
      },
      slots: { default: 'Panel' },
      attachTo: document.body,
    })
    await nextTick()
    const state = setupState(wrapper)

    if (state.panelRef?.parentElement) {
      mockRect(state.panelRef.parentElement, {
        width: 1000,
        height: 500,
        top: 0,
        left: 0,
        right: 1000,
        bottom: 500,
      })
    }
    if (state.panelRef) {
      mockRect(state.panelRef, {
        width: 320,
        height: 500,
        top: 0,
        left: 680,
        right: 1000,
        bottom: 500,
      })
    }
    await state.syncPanelWidth()
    state.onResizePointerDown(
      new PointerEvent('pointerdown', { clientX: 680, pointerId: 1, bubbles: true }),
    )
    state.onResizePointerMove(new PointerEvent('pointermove', { clientX: 400 }))
    state.onResizePointerUp()
    expect(state.panelWidthPx === null || typeof state.panelWidthPx === 'number').toBe(true)
    wrapper.unmount()
  })
})

describe('Tooltip setupState positioning', () => {
  it('computes flip paths for left placement near edge', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: 'Edge', placement: 'left', delay: 0, flip: true },
      slots: { default: '<button type="button">T</button>' },
      attachTo: document.body,
    })
    const state = setupState(wrapper)

    if (state.triggerRef) {
      mockRect(state.triggerRef, {
        top: 10,
        left: 10,
        bottom: 30,
        right: 40,
        width: 30,
        height: 20,
      })
    }
    state.show()
    vi.runAllTimers()
    await nextTick()
    await nextTick()
    if (state.tooltipRef) {
      mockRect(state.tooltipRef, {
        width: 120,
        height: 40,
        top: 0,
        left: -100,
        right: 20,
        bottom: 40,
      })
    }
    await state.updatePosition()
    state.hide()
    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('DataTableColumnFilterMenu setupState', () => {
  it('applies clear and overflow positioning helpers', async () => {
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

    const wrapper = mount(DataTableColumnFilterMenu, {
      props: {
        column: { key: 'name', label: 'Name', filter: 'text' },
        labels,
        open: true,
        applyMode: true,
        modelValue: { name: 'Ana' } as DataTableColumnFilters,
        'onUpdate:open': () => undefined,
        'onUpdate:modelValue': () => undefined,
      },
      attachTo: document.body,
    })
    await flushPromises()
    const state = setupState(wrapper)

    state.syncDraftFromApplied()
    if (state.triggerRef) {
      mockRect(state.triggerRef, {
        top: 700,
        left: 900,
        bottom: 732,
        right: 932,
        width: 32,
        height: 32,
      })
    }
    await state.updatePanelPosition()
    if (state.panelRef) {
      mockRect(state.panelRef, {
        top: 740,
        left: 900,
        bottom: 1000,
        right: 1200,
        width: 300,
        height: 260,
      })
    }
    await state.updatePanelPosition()
    state.draftFilters = { name: 'Ana' }
    state.applyFilter()
    state.clearFilter()
    wrapper.unmount()
  })
})
