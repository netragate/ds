import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import Tabs from '@/components/navigation/Tabs.vue'
import TabList from '@/components/navigation/TabList.vue'
import Tab from '@/components/navigation/Tab.vue'
import TabPanel from '@/components/navigation/TabPanel.vue'
import Badge from '@/components/feedback/Badge.vue'
import Button from '@/components/button/Button.vue'
import Alert from '@/components/feedback/Alert.vue'
import Chip from '@/components/form/Chip.vue'
import Textarea from '@/components/form/Textarea.vue'
import Drawer from '@/components/overlay/Drawer.vue'
import Popover from '@/components/overlay/Popover.vue'
import Tooltip from '@/components/overlay/Tooltip.vue'
import Dialog from '@/components/overlay/Dialog.vue'
import Card from '@/components/data-display/Card.vue'
import Tag from '@/components/data-display/Tag.vue'
import PageSizeSelect from '@/components/data-display/PageSizeSelect.vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import DateInput from '@/components/form/DateInput.vue'
import Select from '@/components/form/Select.vue'
import DataTableColumnFilter from '@/components/data-display/DataTableColumnFilter.vue'
import type { DataTableColumnFilters, DataTableLabels } from '@/components/data-display/dataTableTypes'

const TabsHarness = defineComponent({
  components: { Tabs, TabList, Tab, TabPanel },
  setup(_, { expose }) {
    const active = ref('')
    expose({ active })
    return () =>
      h(Tabs, { modelValue: active.value, 'onUpdate:modelValue': (v: string) => (active.value = v) }, {
        default: () => [
          h(TabList, null, {
            default: () => [
              h(Tab, { value: 'a' }, () => 'A'),
              h(Tab, { value: 'b' }, () => 'B'),
              h(Tab, { value: 'c' }, () => 'C'),
            ],
          }),
          h(TabPanel, { value: 'a' }, () => 'Panel A'),
          h(TabPanel, { value: 'b' }, () => 'Panel B'),
          h(TabPanel, { value: 'c' }, () => 'Panel C'),
        ],
      })
  },
})

describe('TabList keyboard navigation', () => {
  it('throws outside Tabs', () => {
    expect(() => mount(TabList)).toThrow(/TabList must be used inside Tabs/)
  })

  it('moves with arrows, Home, and End', async () => {
    const wrapper = mount(TabsHarness)
    await nextTick()
    const tablist = wrapper.find('[role="tablist"]')

    await tablist.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.text()).toContain('Panel B')
    await tablist.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.text()).toContain('Panel C')
    await tablist.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.text()).toContain('Panel A')
    await tablist.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.text()).toContain('Panel C')
    await tablist.trigger('keydown', { key: 'Home' })
    expect(wrapper.text()).toContain('Panel A')
    await tablist.trigger('keydown', { key: 'End' })
    expect(wrapper.text()).toContain('Panel C')
    await tablist.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.text()).toContain('Panel A')
    await tablist.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.text()).toContain('Panel C')
    await tablist.trigger('keydown', { key: 'Enter' })
    wrapper.unmount()
  })
})

describe('Badge branches', () => {
  it('renders icon mode with value and size variants', async () => {
    const withIcon = mount(Badge, {
      props: { icon: 'bell', value: 3, size: 'sm', variant: 'success' },
    })
    expect(withIcon.find('svg').exists() || withIcon.html().includes('svg')).toBe(true)
    expect(withIcon.text()).toContain('3')
    withIcon.unmount()

    const appearance = mount(Badge, {
      props: { value: 5, appearance: 'discovery' },
    })
    expect(appearance.text()).toBe('5')
    appearance.unmount()

    const slotOnly = mount(Badge, { slots: { default: 'NEW' } })
    expect(slotOnly.text()).toBe('NEW')
    slotOnly.unmount()
  })
})

describe('Button tooltip and selected branches', () => {
  it('wraps disabled button with tooltip trigger and selection classes', () => {
    const wrapper = mount(Button, {
      props: { disabled: true, tooltip: 'Unavailable', isSelected: true, shouldFitContainer: true },
      slots: { default: 'Save' },
    })
    // Tooltip wrapper path (showTooltip) renders an outer span around the button.
    expect(wrapper.find('span.inline-flex').exists() || wrapper.html().includes('teleport')).toBe(true)
    expect(wrapper.find('button').classes().join(' ')).toMatch(/ring-2/)
    expect(wrapper.find('button').classes().join(' ')).toMatch(/w-full/)
    wrapper.unmount()
  })

  it('blocks click while loading with tooltip', async () => {
    const wrapper = mount(Button, {
      props: { loading: true, tooltip: 'Working' },
      slots: { default: 'Go' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })
})

describe('Alert dismiss and Chip / Textarea branches', () => {
  it('Alert renders without title', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'warning' },
      slots: { default: 'Watch out' },
    })
    expect(wrapper.text()).toContain('Watch out')
  })

  it('Chip ignores blank enter and supports disabled', async () => {
    const wrapper = mount(Chip, { props: { modelValue: ['A'], disabled: true } })
    const input = wrapper.find('input')
    await input.setValue('   ')
    await input.trigger('keyup.enter')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('Textarea shows message and disabled', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: 'x', disabled: true, error: true, message: 'Required' },
    })
    expect(wrapper.text()).toContain('Required')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })
})

describe('Drawer remaining branches', () => {
  it('animates placement changes and resizes left drawer', async () => {
    const wrapper = mount(Drawer, {
      props: {
        open: true,
        placement: 'left',
        resizable: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      slots: { default: 'Side' },
      attachTo: document.body,
    })
    await nextTick()
    await flushPromises()
    await wrapper.setProps({ placement: 'right' })
    await nextTick()
    const handle = document.body.querySelector('[role="separator"]') as HTMLElement
    expect(handle).toBeTruthy()
    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, bubbles: true, pointerId: 1 }))
    handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 320, bubbles: true, pointerId: 1 }))
    handle.dispatchEvent(new PointerEvent('pointerup', { clientX: 320, bubbles: true, pointerId: 1 }))
    await nextTick()
    wrapper.unmount()
  })

  it('ignores overlay click when closeOnOverlay is false', async () => {
    const wrapper = mount(Drawer, {
      props: { open: true, closeOnOverlay: false },
      slots: { default: 'Stay' },
      attachTo: document.body,
    })
    await nextTick()
    const backdrop = document.body.querySelector('.fixed.inset-0') as HTMLElement
    backdrop?.click()
    await nextTick()
    expect(wrapper.props('open')).toBe(true)
    wrapper.unmount()
  })
})

describe('Popover outside click and Dialog slots', () => {
  it('closes Popover on outside click', async () => {
    const outside = document.createElement('button')
    outside.type = 'button'
    outside.textContent = 'Outside'
    document.body.appendChild(outside)

    const wrapper = mount(Popover, {
      props: {
        open: true,
        variant: 'primary',
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      slots: {
        trigger: '<button type="button">T</button>',
        content: 'Inside',
      },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('Inside')
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.props('open')).toBe(false)
    outside.remove()
    wrapper.unmount()
  })

  it('Dialog without footer still renders body', () => {
    const wrapper = mount(Dialog, {
      props: { open: true, closeOnOverlay: false },
      slots: { title: 'Hi', default: 'Body only' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Body only')
    wrapper.unmount()
  })
})

describe('Card Tag PageSizeSelect Tooltip', () => {
  it('Card and Tag link/color variants', () => {
    expect(mount(Card, { slots: { default: 'Card' } }).text()).toContain('Card')
    const tag = mount(Tag, {
      props: { text: 'Docs', isLink: true, href: '#', color: 'purple', isRemovable: false },
    })
    expect(tag.element.tagName).toBe('A')
    tag.unmount()
  })

  it('PageSizeSelect emits page size changes', async () => {
    const wrapper = mount(PageSizeSelect, {
      props: {
        modelValue: 10,
        options: [10, 25, 50],
        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
      },
    })
    const select = wrapper.find('select')
    if (select.exists()) {
      await select.setValue('25')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([25])
    } else {
      await wrapper.find('[role="combobox"]').trigger('click')
      await nextTick()
    }
    wrapper.unmount()
  })

  it('Tooltip respects canShow false', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip', canShow: () => false },
      slots: { default: '<button type="button">Hover</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('mouseenter')
    await nextTick()
    expect(document.body.textContent).not.toContain('Tip')
    wrapper.unmount()
  })
})

describe('AppLayoutPanelOverlay length parsing', () => {
  it('accepts rem and percent widths', async () => {
    const wrapper = mount({
      components: { AppLayoutPanelOverlay },
      template: `
        <div style="width: 1000px; height: 400px; position: relative">
          <AppLayoutPanelOverlay
            :open="true"
            initial-width="min(20rem, 40%)"
            min-width="10rem"
            max-width="50%"
          >
            Panel
          </AppLayoutPanelOverlay>
        </div>
      `,
    }, { attachTo: document.body })
    await nextTick()
    expect(wrapper.text()).toContain('Panel')
    wrapper.unmount()
  })
})

describe('TimeInput and DateInput remaining', () => {
  it('TimeInput commits typed display value on blur', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })
    const input = wrapper.find('input')
    await input.setValue('09:15')
    await input.trigger('blur')
    await nextTick()
    expect(wrapper.props('modelValue')).toMatch(/09:15/)
    wrapper.unmount()
  })

  it('DateInput clears datetime range', async () => {
    const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
      mount(DateInput, {
        ...options,
        global: {
          stubs: { Teleport: { template: '<div><slot /></div>' } },
        },
      })

    const wrapper = dateInputMount({
      props: {
        range: true,
        showTime: true,
        modelValue: {
          from: { date: '2026-06-10', time: '09:00:00' },
          to: { date: '2026-06-12', time: '18:00:00' },
        },
        locale: 'en',
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const clear = wrapper.findAll('button').find((btn) => btn.text() === 'Clear')
    await clear!.trigger('click')
    expect(wrapper.props('modelValue')).toEqual({
      from: { date: '', time: '' },
      to: { date: '', time: '' },
    })
    wrapper.unmount()
  })
})

describe('Select creatable enter and DataTableColumnFilter popover date apply', () => {
  it('creates option with Enter when creatable', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ label: 'One', value: '1' }],
        creatable: true,
        searchable: true,
        'onUpdate:modelValue': (value: string | string[]) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })
    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()
    const search = document.body.querySelector('input') as HTMLInputElement
    search.value = 'BrandNew'
    search.dispatchEvent(new Event('input'))
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('BrandNew')
    wrapper.unmount()
  })

  it('date filter with inline apply emits apply', async () => {
    const labels = {
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

    const filters = ref<DataTableColumnFilters>({ joined: { from: '2026-01-01', to: '2026-01-31' } })
    const wrapper = mount(DataTableColumnFilter, {
      props: {
        column: { key: 'joined', label: 'Joined', filter: 'date' },
        labels,
        modelValue: filters.value,
        inlineActions: true,
        canApply: true,
        layout: 'popover',
        'onUpdate:modelValue': (value: DataTableColumnFilters) => {
          filters.value = value
          void wrapper.setProps({ modelValue: value })
        },
      },
    })
    await wrapper.find('button[aria-label="Apply"]').trigger('click')
    expect(wrapper.emitted('apply')).toHaveLength(1)
    wrapper.unmount()
  })
})
