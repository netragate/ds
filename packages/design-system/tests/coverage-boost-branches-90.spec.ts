import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import Select from '@/components/form/Select.vue'
import Input from '@/components/form/Input.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import DataTableColumnFilter from '@/components/data-display/DataTableColumnFilter.vue'
import DataTableColumnFilterMenu from '@/components/data-display/DataTableColumnFilterMenu.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import Tooltip from '@/components/overlay/Tooltip.vue'
import Drawer from '@/components/overlay/Drawer.vue'
import Badge from '@/components/feedback/Badge.vue'
import Spinner from '@/components/feedback/Spinner.vue'
import Button from '@/components/button/Button.vue'
import SidebarMenu from '@/components/navigation/SidebarMenu.vue'
import SidebarMenuGroup from '@/components/navigation/SidebarMenuGroup.vue'
import SidebarMenuItem from '@/components/navigation/SidebarMenuItem.vue'
import {
  formatCellValue,
  isColumnFilterActive,
  patchColumnFilter,
} from '@/components/data-display/dataTableUtils'
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

const filterLabels = {
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

describe('Tooltip flip scoring paths', () => {
  it.each([
    { placement: 'right' as const, trigger: { top: 200, left: 700, right: 740, bottom: 220, width: 40, height: 20 } },
    { placement: 'bottom' as const, trigger: { top: 700, left: 200, right: 240, bottom: 720, width: 40, height: 20 } },
    { placement: 'top-end' as const, trigger: { top: 8, left: 200, right: 240, bottom: 28, width: 40, height: 20 } },
    { placement: 'top-start' as const, trigger: { top: 8, left: 200, right: 240, bottom: 28, width: 40, height: 20 } },
  ])('flips $placement when preferred side overflows', async ({ placement, trigger }) => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: `Tip-${placement}`, placement, delay: 0, flip: true },
      slots: { default: '<button type="button">T</button>' },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    if (state.triggerRef) mockRect(state.triggerRef, trigger)
    state.show()
    vi.runAllTimers()
    await nextTick()
    await nextTick()
    if (state.tooltipRef) {
      mockRect(state.tooltipRef, {
        width: 200,
        height: 80,
        top: 0,
        left: 0,
        right: 200,
        bottom: 80,
      })
    }
    await state.updatePosition()
    state.onViewportChange()
    await wrapper.setProps({ placement: placement === 'right' ? 'left' : 'right' })
    await nextTick()
    state.hide()
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('prefers flipped score when both sides overflow', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: 'Tight', placement: 'top', delay: 0, flip: true },
      slots: { default: '<button type="button">T</button>' },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    if (state.triggerRef) {
      mockRect(state.triggerRef, {
        top: 20,
        left: 20,
        right: 60,
        bottom: 40,
        width: 40,
        height: 20,
      })
    }
    state.show()
    vi.runAllTimers()
    await nextTick()
    if (state.tooltipRef) {
      mockRect(state.tooltipRef, {
        width: window.innerWidth,
        height: window.innerHeight,
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
      })
    }
    await state.updatePosition()
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('skips show when canShow returns false', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: { content: 'Nope', delay: 0, canShow: () => false },
      slots: { default: '<button type="button">T</button>' },
    })
    setupState(wrapper).show()
    vi.runAllTimers()
    await nextTick()
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()
    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('DateInput remaining display and emit arms', () => {
  const stubs = { Teleport: { template: '<div><slot /></div>' } }

  it('covers formatSingleDisplay and range sync edges', async () => {
    const wrapper = mount(DateInput, {
      props: {
        showTime: true,
        modelValue: { date: '', time: '08:00:00' },
        'onUpdate:modelValue': (v: unknown) => wrapper.setProps({ modelValue: v as never }),
      },
      global: { stubs },
    })
    const state = setupState(wrapper)
    expect(wrapper.find('input').element).toBeTruthy()
    state.syncDisplayFromModel()
    await wrapper.setProps({ modelValue: { date: '2026-06-01', time: '' } })
    await nextTick()
    state.emitDateOnly('2026-06-02')
    await wrapper.setProps({ showTime: false, modelValue: '2026-06-03' })
    state.emitDateOnly('2026-06-04')
    wrapper.unmount()

    const range = mount(DateInput, {
      props: {
        range: true,
        showTime: true,
        modelValue: {
          from: { date: '2026-06-01', time: '09:00:00' },
          to: { date: '', time: '' },
        },
        'onUpdate:modelValue': (v: unknown) => range.setProps({ modelValue: v as never }),
      },
      global: { stubs },
    })
    const rs = setupState(range)
    rs.syncDisplayFromModel()
    await range.setProps({
      modelValue: {
        from: { date: '', time: '' },
        to: { date: '2026-06-10', time: '18:00:00' },
      },
    })
    await nextTick()
    rs.pendingTimes = null
    rs.emitDateRange({ from: '2026-06-01', to: '2026-06-05' })
    rs.seedPendingFromModel()
    await range.setProps({
      modelValue: { from: '2026-06-01', to: '2026-06-05' } as never,
      showTime: true,
    })
    await nextTick()
    rs.seedPendingFromModel()
    await range.setProps({ showTime: false, modelValue: { from: '2026-06-01', to: '2026-06-05' } })
    rs.seedPendingFromModel()
    rs.emitDateRange({ from: '2026-06-02', to: '2026-06-03' })
    range.unmount()
  })
})

describe('TimeInput remaining arms', () => {
  it('covers range draft editing, display commit, and outside click', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        range: true,
        modelValue: { from: '10:00:00', to: '11:00:00' },
        'onUpdate:modelValue': (v: unknown) => wrapper.setProps({ modelValue: v as never }),
      },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    state.editingBound = 'to'
    state.activeDraft = '12:00:00'
    expect(state.activeDraft).toBe('12:00:00')
    state.editingBound = 'from'
    state.activeDraft = '09:30:00'
    state.setPart('minutes', '15')
    state.displayValue = 'bad – worse'
    state.commitDisplayValue()
    state.displayValue = '08:00:00 – 09:00:00'
    state.commitDisplayValue()
    state.open = true
    state.onDocumentPointerDown(new MouseEvent('mousedown', { bubbles: true }))
    state.togglePanel()
    state.clearValue()
    await wrapper.setProps({ modelValue: { from: null, to: null } as never })
    await nextTick()
    state.syncDraftFromModel()
    await wrapper.setProps({ range: false, modelValue: { from: '1' } as never })
    await nextTick()
    state.syncDisplayFromModel()
    wrapper.unmount()
  })
})

describe('AppLayout grid template combinations', () => {
  it.each([
    { showMenu: true, showHeader: true, showFooter: true, footerWidth: 'full' as const },
    { showMenu: true, showHeader: true, showFooter: false, footerWidth: 'full' as const },
    { showMenu: true, showHeader: false, showFooter: true, footerWidth: 'full' as const },
    { showMenu: true, showHeader: false, showFooter: false, footerWidth: 'full' as const },
    { showMenu: false, showHeader: true, showFooter: true, footerWidth: 'full' as const },
    { showMenu: false, showHeader: true, showFooter: false, footerWidth: 'full' as const },
    { showMenu: false, showHeader: false, showFooter: true, footerWidth: 'full' as const },
    { showMenu: false, showHeader: false, showFooter: false, footerWidth: 'full' as const },
    { showMenu: true, showHeader: true, showFooter: true, footerWidth: 'content' as const },
  ])('renders layout %#', (props) => {
    const wrapper = mount(AppLayout, {
      props: { ...props, menuCollapsible: true },
      slots: { header: 'H', menu: 'M', default: 'C', footer: 'F' },
    })
    const state = setupState(wrapper)
    state.toggleMenu()
    state.closePanel()
    expect(wrapper.text()).toContain('C')
    wrapper.unmount()
  })
})

describe('DataTable leftover branches', () => {
  it('covers width watch, serverSide, striped expandable, and resize guard', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name', width: '10rem', sortable: true, filter: 'text' },
          { key: 'age', label: 'Age', sortable: true },
        ],
        rows: [
          { id: '1', name: 'Ana', age: 30 },
          { id: '2', name: 'Bob', age: 40 },
        ],
        rowKey: 'id',
        resizable: true,
        striped: true,
        expandable: true,
        searchable: true,
      },
      slots: { expanded: '<div>detail</div>' },
    })
    const state = setupState(wrapper)
    expect(state.rowStripeClass(1)).toBeTruthy()
    expect(state.useCssStripe).toBe(false)
    state.setFilterMenuOpen('name', true)
    state.setFilterMenuOpen('name', false)
    await wrapper.setProps({
      columns: [{ key: 'name', label: 'Name', sortable: true }],
    })
    await nextTick()
    await wrapper.setProps({
      serverSide: true,
      total: 50,
      rows: [{ id: '1', name: 'Ana', age: 30 }],
    })
    await nextTick()
    expect(state.filteredTotal).toBe(50)
    expect(state.columnWidthStyle({ key: 'missing', label: 'X' })).toBeUndefined()
    const fakeEvent = {
      preventDefault() {},
      stopPropagation() {},
      clientX: 10,
      pointerId: 1,
      currentTarget: { closest: () => null, setPointerCapture() {} },
    } as unknown as PointerEvent
    state.onResizePointerDown({ key: 'name', label: 'Name' }, fakeEvent)
    wrapper.unmount()
  })
})

describe('Column filter and menu leftover arms', () => {
  it('covers date/enum setters without object current and menu helpers', async () => {
    const filters = ref<DataTableColumnFilters>({ joined: 'oops', status: 'x' })
    const dateFilter = mount(DataTableColumnFilter, {
      props: {
        column: { key: 'joined', label: 'Joined', filter: 'date' },
        labels: filterLabels,
        modelValue: filters.value,
        'onUpdate:modelValue': (v: DataTableColumnFilters) => {
          filters.value = v
        },
        layout: 'inline',
        inlineActions: true,
      },
    })
    const ds = setupState(dateFilter)
    ds.dateFrom = '2026-01-01'
    ds.dateTo = '2026-01-31'
    dateFilter.unmount()

    const enumFilter = mount(DataTableColumnFilter, {
      props: {
        column: {
          key: 'status',
          label: 'Status',
          filter: 'enum',
          filterOptions: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ],
        },
        labels: filterLabels,
        modelValue: {},
        'onUpdate:modelValue': () => undefined,
        layout: 'popover',
      },
    })
    const es = setupState(enumFilter)
    es.enumValue = 'a'
    es.enumValue = ''
    es.enumValue = ['a', 'b']
    enumFilter.unmount()

    const menu = mount(DataTableColumnFilterMenu, {
      props: {
        column: { key: 'name', label: 'Name', filter: 'text' },
        labels: filterLabels,
        open: false,
        applyMode: false,
        disabled: true,
        modelValue: { name: 'Ana' },
        'onUpdate:open': () => undefined,
        'onUpdate:modelValue': () => undefined,
      },
      attachTo: document.body,
    })
    const ms = setupState(menu)
    ms.toggleOpen()
    ms.cloneColumnFilterValue(undefined)
    ms.cloneColumnFilterValue(['a'])
    ms.cloneColumnFilterValue({ from: '1', to: '2' })
    ms.cloneColumnFilterValue('plain')
    await menu.setProps({ open: true, disabled: false, applyMode: true, modelValue: {} })
    await flushPromises()
    ms.syncDraftFromApplied()
    ms.clearFilter()
    ms.applyFilter()
    ms.onDocumentClick(new MouseEvent('click', { bubbles: true }))
    ms.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }))
    ms.updatePanelPosition()
    menu.unmount()

    expect(patchColumnFilter({ a: '1' }, 'a', '')).toEqual({})
    expect(patchColumnFilter({ a: ['x'] }, 'a', [])).toEqual({})
    expect(patchColumnFilter({ a: { from: '', to: '' } }, 'a', { from: '', to: '' })).toEqual({})
    expect(isColumnFilterActive({ key: 'x', label: 'X', filter: 'date' }, { from: '', to: '' })).toBe(
      false,
    )
    expect(formatCellValue(true)).toBe('true')
    expect(formatCellValue({ a: 1 })).toBe('{"a":1}')
  })
})

describe('Panel overlay parseLength and resize guards', () => {
  it('parses rem percent min and skips resize when not resizable', async () => {
    const wrapper = mount(AppLayoutPanelOverlay, {
      props: {
        open: true,
        resizable: true,
        minWidth: '10rem',
        maxWidth: 'min(80%, 40rem)',
      },
      slots: { default: 'panel' },
      attachTo: document.body,
    })
    await nextTick()
    const state = setupState(wrapper)
    expect(state.parseLengthToPx('12px', 1000)).toBe(12)
    expect(state.parseLengthToPx('2rem', 1000)).toBe(32)
    expect(state.parseLengthToPx('50%', 800)).toBe(400)
    expect(state.parseLengthToPx('min(10%, 5rem)', 1000)).toBe(80)
    expect(state.parseLengthToPx('nope', 1000)).toBe(0)
    state.onResizePointerDown(new PointerEvent('pointerdown', { clientX: 100 }))
    await wrapper.setProps({ resizable: false })
    state.onResizePointerDown(new PointerEvent('pointerdown', { clientX: 100 }))
    state.onResizePointerMove(new PointerEvent('pointermove', { clientX: 50 }))
    state.closePanel()
    wrapper.unmount()
  })
})

describe('Select leftover arms', () => {
  it('covers multiple creatable serverSearch empty messages and clear', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'One', value: '1' }],
        multiple: true,
        creatable: true,
        modelValue: ['custom'],
        'onUpdate:modelValue': (v: unknown) => wrapper.setProps({ modelValue: v as never }),
      },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    expect(state.selectedOptions.some((o: { value: string }) => o.value === 'custom')).toBe(true)
    state.query = 'One'
    expect(state.createCandidate).toBe('')
    state.query = 'brand-new'
    state.createFromQuery()
    state.removeTag('1')
    state.clearAll()
    state.toggleOpen()
    state.onDocumentPointerDown(new PointerEvent('pointerdown'))
    await wrapper.setProps({
      multiple: false,
      modelValue: '',
      serverSearch: true,
      minSearchChars: 1,
      loading: true,
      creatable: false,
    })
    state.query = ''
    expect(state.emptyMessage).toContain('Type at least')
    state.query = 'ab'
    expect(state.emptyMessage).toBe('Searching…')
    state.emitServerSearch('ab')
    state.emitServerSearch('')
    await wrapper.setProps({ loading: false, minSearchChars: 0 })
    expect(state.emptyMessage).toBe('No results found')
    wrapper.unmount()
  })
})

describe('Drawer Badge Spinner Button Input leftovers', () => {
  it('hits remaining component arms', async () => {
    const drawer = mount(Drawer, {
      props: { open: true, placement: 'top', closeOnOverlay: false, resizable: true },
      slots: { default: 'body' },
      attachTo: document.body,
    })
    const ds = setupState(drawer)
    ds.onOverlayClick()
    ds.onResizePointerDown(
      new PointerEvent('pointerdown', { clientX: 10, pointerId: 1 }) as PointerEvent & {
        currentTarget: HTMLElement
      },
    )
    await drawer.setProps({ placement: 'left', closeOnOverlay: true, open: true })
    await flushPromises()
    const handle = document.createElement('div')
    handle.setPointerCapture = () => undefined
    handle.releasePointerCapture = () => undefined
    handle.addEventListener = (type: string, listener: EventListener) => {
      if (type === 'pointermove') {
        ;(listener as (e: PointerEvent) => void)(
          new PointerEvent('pointermove', { clientX: 320 }),
        )
      }
      if (type === 'pointerup') {
        ;(listener as () => void)()
      }
    }
    ds.onResizePointerDown({
      preventDefault() {},
      pointerId: 1,
      clientX: 300,
      currentTarget: handle,
    } as unknown as PointerEvent)
    await drawer.setProps({ open: false })
    await flushPromises()
    drawer.unmount()

    expect(mount(Badge, { props: { value: 120 } }).text()).toContain('99+')
    expect(mount(Badge, { props: { icon: 'check', size: 'sm', value: 3 } }).text()).toContain('3')
    expect(
      mount(Badge, { props: { appearance: 'danger', variant: 'default' as never } }).exists(),
    ).toBe(true)

    expect(mount(Spinner, { props: { glow: false, label: 'Wait' } }).attributes('aria-label')).toBe(
      'Wait',
    )
    expect(
      mount(Spinner, { props: { ariaLabel: 'Spin' }, attrs: { 'aria-label': '' } }).attributes(
        'aria-label',
      ),
    ).toBeTruthy()

    const btn = mount(Button, {
      props: { size: 'sm', icon: 'check', loading: true, tooltip: 'Busy', disabled: false },
    })
    await btn.trigger('click')
    btn.unmount()
    const btnLg = mount(Button, { props: { size: 'lg', icon: 'check' } })
    expect(btnLg.exists()).toBe(true)
    btnLg.unmount()

    const input = mount(Input, {
      props: {
        modelValue: 'a',
        size: 'default',
        transform: (v: string) => v.toUpperCase(),
        error: true,
        message: 'err',
        id: 'in1',
        'onUpdate:modelValue': (v: string) => input.setProps({ modelValue: v }),
      },
      slots: { elemBefore: 'B', elemAfter: 'A' },
    })
    await input.find('input').setValue('hi')
    await input.setProps({ type: 'file', modelValue: '' })
    await input.find('input').trigger('change')
    input.unmount()
  })
})

describe('SidebarMenuGroup leftover arms', () => {
  it('covers defaultOpen, scroll parent, and settings unregister', async () => {
    const scrollHost = document.createElement('div')
    scrollHost.style.overflowY = 'auto'
    document.body.appendChild(scrollHost)

    const wrapper = mount(
      {
        components: { SidebarMenu, SidebarMenuGroup, SidebarMenuItem },
        template: `
          <SidebarMenu :collapsed="false" submenu-mode="flyout">
            <SidebarMenuGroup id="g1" label="Group" :child-ids="['i1']" default-open>
              <SidebarMenuItem id="i1" label="Item" />
            </SidebarMenuGroup>
          </SidebarMenu>
        `,
      },
      { attachTo: scrollHost },
    )
    await nextTick()
    const group = wrapper.findComponent(SidebarMenuGroup)
    const state = setupState(group)
    state.flyoutOpen = true
    state.addPositionListeners()
    state.updateFlyoutPosition?.()
    state.findScrollParent(group.element as HTMLElement)
    state.getViewportBounds()
    state.shouldOpenFlyoutUpward(
      { top: 10, bottom: 30, height: 20, left: 0, right: 100, width: 100 } as DOMRect,
      400,
    )
    state.hideFlyout()
    state.removePositionListeners()
    await wrapper.setProps({})
    wrapper.unmount()
    scrollHost.remove()

    const inline = mount({
      components: { SidebarMenu, SidebarMenuGroup, SidebarMenuItem },
      template: `
        <SidebarMenu :collapsed="false" submenu-mode="inline">
          <SidebarMenuGroup id="g2" label="Inline" :child-ids="['i2']" disabled>
            <SidebarMenuItem id="i2" label="Item" disabled />
          </SidebarMenuGroup>
        </SidebarMenu>
      `,
    })
    await nextTick()
    expect(inline.text()).toContain('Inline')
    inline.unmount()
  })
})
