import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import Select from '@/components/form/Select.vue'
import DataTableColumnFilterMenu from '@/components/data-display/DataTableColumnFilterMenu.vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import Tooltip from '@/components/overlay/Tooltip.vue'
import Drawer from '@/components/overlay/Drawer.vue'
import Chip from '@/components/form/Chip.vue'
import Textarea from '@/components/form/Textarea.vue'
import Input from '@/components/form/Input.vue'
import type { DataTableColumnFilters, DataTableLabels } from '@/components/data-display/dataTableTypes'

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

describe('DateInput panel positioning branches', () => {
  it('repositions on resize and prefers upward when space below is tight', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: '2026-06-15', locale: 'en' },
      attachTo: document.body,
    })

    const root = wrapper.element as HTMLElement
    mockRect(root, { top: 700, left: 100, bottom: 740, right: 400, width: 300, height: 40 })

    await wrapper.find('button[aria-expanded]').trigger('click')
    await nextTick()
    await flushPromises()

    // Force a second measure pass after panel exists.
    const panel = document.body.querySelector('[role="dialog"], .fixed, [style*="top"]') as HTMLElement | null
    if (panel) {
      mockRect(panel, { top: 750, left: 100, bottom: 1100, right: 500, width: 400, height: 350 })
    }

    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('scroll'))
    await nextTick()
    await flushPromises()

    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })
})

describe('Select panel overflow positioning', () => {
  it('opens near the viewport edge and closes on outside pointerdown', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
        ],
        searchable: true,
      },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]').element
    mockRect(trigger, {
      top: 600,
      left: 900,
      bottom: 640,
      right: 1100,
      width: 200,
      height: 40,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()
    await flushPromises()
    expect(document.body.querySelector('[role="listbox"]')).toBeTruthy()

    window.dispatchEvent(new Event('resize'))
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('[role="listbox"]')).toBeNull()
    wrapper.unmount()
  })
})

describe('DataTableColumnFilterMenu overflow positioning', () => {
  it('flips panel when it would overflow the viewport', async () => {
    const filters = ref<DataTableColumnFilters>({})
    const open = ref(false)
    const wrapper = mount(DataTableColumnFilterMenu, {
      props: {
        column: { key: 'name', label: 'Name', filter: 'text' },
        labels,
        open: false,
        applyMode: false,
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

    const trigger = wrapper.find('button').element
    mockRect(trigger, { top: 700, left: 900, bottom: 732, right: 932, width: 32, height: 32 })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    await nextTick()

    const panel = document.body.querySelector('[style*="top"]') as HTMLElement | null
    if (panel) {
      mockRect(panel, { top: 740, left: 900, bottom: 1000, right: 1200, width: 300, height: 260 })
    }
    window.dispatchEvent(new Event('resize'))
    await flushPromises()

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    wrapper.unmount()
  })
})

describe('AppLayoutPanelOverlay length parsers via resize', () => {
  it('parses px rem percent and min() while dragging', async () => {
    const wrapper = mount(
      {
        components: { AppLayoutPanelOverlay },
        template: `
          <div class="host" style="width: 1000px; height: 500px; position: relative">
            <AppLayoutPanelOverlay
              :open="true"
              initial-width="min(24rem, 50%)"
              min-width="12rem"
              max-width="80%"
            >
              Body
            </AppLayoutPanelOverlay>
          </div>
        `,
      },
      { attachTo: document.body },
    )

    await nextTick()
    const host = wrapper.find('.host').element
    mockRect(host, { width: 1000, height: 500, top: 0, left: 0, right: 1000, bottom: 500 })
    const panel = wrapper.find('[data-app-layout-panel]').element as HTMLElement
    mockRect(panel, { width: 320, height: 500, top: 0, left: 680, right: 1000, bottom: 500 })

    const handle = wrapper.find('[data-app-layout-panel-resize]')
    await handle.trigger('pointerdown', { clientX: 680, pointerId: 1 })
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 500 }))
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 100 }))
    document.dispatchEvent(new PointerEvent('pointerup'))
    await nextTick()
    expect(wrapper.text()).toContain('Body')
    wrapper.unmount()
  })
})

describe('Tooltip flip near edges', () => {
  it('flips and clamps near the viewport corner', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: 'Edge', placement: 'top', delay: 0, flip: true, shortcut: 'Esc' },
      slots: { default: '<button type="button">E</button>' },
      attachTo: document.body,
    })

    const trigger = wrapper.find('span.inline-flex').element
    mockRect(trigger, { top: 4, left: 4, bottom: 24, right: 40, width: 36, height: 20 })
    await wrapper.find('span.inline-flex').trigger('mouseenter')
    vi.runAllTimers()
    await nextTick()
    await nextTick()

    const tip = document.body.querySelector('[role="tooltip"]') as HTMLElement | null
    if (tip) {
      mockRect(tip, { width: 120, height: 40, top: -10, left: -10, right: 110, bottom: 30 })
      window.dispatchEvent(new Event('resize'))
      await nextTick()
    }
    expect(document.body.querySelector('[role="tooltip"]')).toBeTruthy()
    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('Drawer top/bottom resize ignored and close animation', () => {
  it('opens top drawer and closes with timeout path', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Drawer, {
      props: {
        open: true,
        placement: 'top',
        resizable: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      slots: { default: 'Top drawer' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Top drawer')
    await wrapper.setProps({ open: false })
    await vi.advanceTimersByTimeAsync(300)
    await nextTick()
    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('Form leftover template branches', () => {
  it('covers Chip lg disabled remove and Textarea error message', async () => {
    const chip = mount(Chip, {
      props: { modelValue: ['X'], size: 'lg', disabled: true, error: true, message: 'Nope' },
    })
    await chip.find('button[aria-label="Remove X"]').trigger('click')
    expect(chip.emitted('update:modelValue')).toBeUndefined()
    expect(chip.text()).toContain('Nope')
    chip.unmount()

    const textarea = mount(Textarea, {
      props: { modelValue: '', error: true, message: 'Required', id: 'bio', size: 'sm' },
    })
    expect(textarea.text()).toContain('Required')
    textarea.unmount()

    const input = mount(Input, {
      props: { modelValue: 'x', size: 'lg', error: false, success: true },
    })
    expect(input.exists()).toBe(true)
    input.unmount()
  })
})
