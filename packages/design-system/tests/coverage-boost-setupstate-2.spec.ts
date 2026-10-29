import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import SidebarMenu from '@/components/navigation/SidebarMenu.vue'
import SidebarMenuGroup from '@/components/navigation/SidebarMenuGroup.vue'
import SidebarMenuItem from '@/components/navigation/SidebarMenuItem.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import Drawer from '@/components/overlay/Drawer.vue'
import Input from '@/components/form/Input.vue'
import DateInput from '@/components/form/DateInput.vue'

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

describe('SidebarMenuGroup setupState flyout math', () => {
  it('covers placement up/down/auto space calculations', async () => {
    for (const flyoutPlacement of ['up', 'down', 'auto'] as const) {
      const wrapper = mount(SidebarMenu, {
        props: { collapsed: false },
        slots: {
          default: `
            <SidebarMenuGroup id="g1" label="Group" flyout-placement="${flyoutPlacement}">
              <SidebarMenuItem id="g1.a" label="A" />
              <SidebarMenuItem id="g1.b" label="B" />
            </SidebarMenuGroup>
          `,
        },
        global: { components: { SidebarMenuGroup, SidebarMenuItem } },
        attachTo: document.body,
      })

      const group = wrapper.findComponent(SidebarMenuGroup)
      const state = setupState(group)

      const rectLow = {
        top: 700,
        left: 20,
        bottom: 740,
        right: 180,
        width: 160,
        height: 40,
      } as DOMRect
      const rectHigh = {
        top: 20,
        left: 20,
        bottom: 60,
        right: 180,
        width: 160,
        height: 40,
      } as DOMRect

      expect(typeof state.shouldOpenFlyoutUpward(rectLow, 300)).toBe('boolean')
      expect(typeof state.shouldOpenFlyoutUpward(rectHigh, 300)).toBe('boolean')
      if (flyoutPlacement === 'auto') {
        expect(state.shouldOpenFlyoutUpward(rectLow, 0)).toBe(false)
      }
      if (flyoutPlacement === 'up') {
        expect(state.shouldOpenFlyoutUpward(rectLow, 0)).toBe(true)
      }
      if (flyoutPlacement === 'down') {
        expect(state.shouldOpenFlyoutUpward(rectLow, 999)).toBe(false)
      }
      state.applyFlyoutPosition(rectLow, 280)
      state.applyFlyoutPosition(rectHigh, 280)
      state.showFlyout()
      await nextTick()
      state.updateFlyoutPosition()
      state.hideFlyout()
      state.scheduleHideFlyout()
      wrapper.unmount()
    }
  })
})

describe('DataTable setupState sort and page clamps', () => {
  it('hits multi-sort branches and filteredTotal clamp', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name', sortable: true, width: '10rem' },
          { key: 'age', label: 'Age', sortable: true },
        ],
        rows: [
          { id: '1', name: 'Zed', age: 30 },
          { id: '2', name: 'Ann', age: 20 },
        ],
        rowKey: 'id',
        pageSize: 1,
        currentPage: 5,
        searchable: false,
        resizable: true,
        serverSide: false,
      },
    })

    const state = setupState(wrapper)
    const nameCol = { key: 'name', label: 'Name', sortable: true }
    const ageCol = { key: 'age', label: 'Age', sortable: true }

    const click = (ctrlKey = false) =>
      ({ ctrlKey, metaKey: false, preventDefault() {} }) as MouseEvent
    state.toggleSort?.(nameCol, click())
    state.toggleSort?.(nameCol, click())
    state.toggleSort?.(nameCol, click())
    state.toggleSort?.(ageCol, click(true))
    state.toggleSort?.(ageCol, click(true))
    state.toggleSort?.(ageCol, click(true))

    expect(state.sortIcon?.(nameCol)).toBeTruthy()
    expect(state.headerAriaSort?.(nameCol)).toBeTruthy()
    expect(state.columnWidthStyle?.(nameCol)).toBeTruthy()

    // Force page clamp via filteredTotal watcher path.
    state.currentPage = 99
    await nextTick()
    wrapper.unmount()
  })
})

describe('Drawer and Input setupState leftovers', () => {
  it('resizes right drawer and covers Input transform empty file', async () => {
    const drawer = mount(Drawer, {
      props: { open: true, placement: 'right', resizable: true },
      slots: { default: 'Drawer' },
      attachTo: document.body,
    })
    await nextTick()
    const dState = setupState(drawer)
    const handle = document.body.querySelector('[role="separator"]') as HTMLElement | null
    if (handle && dState.onResizePointerDown) {
      const event = new PointerEvent('pointerdown', { clientX: 800, pointerId: 1, bubbles: true })
      Object.defineProperty(event, 'currentTarget', { value: handle })
      handle.setPointerCapture = () => undefined
      handle.releasePointerCapture = () => undefined
      dState.onResizePointerDown(event)
    }
    await drawer.setProps({ placement: 'bottom' })
    await nextTick()
    drawer.unmount()

    const input = mount(Input, {
      props: {
        modelValue: 'ab',
        transform: (v: string) => v.trim(),
        'onUpdate:modelValue': (value: string) => input.setProps({ modelValue: value }),
      },
    })
    await input.find('input').setValue('  hi  ')
    expect(input.emitted('update:modelValue')?.[0]?.[0]).toBe('hi')
    input.unmount()
  })
})

describe('DateInput setupState more arms', () => {
  it('seeds pending times and clears datetime values', async () => {
    const wrapper = mount(DateInput, {
      props: {
        range: true,
        showTime: true,
        locale: 'pt-BR',
        modelValue: {
          from: { date: '', time: '' },
          to: { date: '', time: '' },
        },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    state.open = true
    state.rangeDraftFrom = '2026-06-10'
    state.selectDay('2026-06-11')
    await nextTick()
    expect(state.pendingTimes).toEqual({ from: '', to: '' })
    state.clearValue()
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual({
      from: { date: '', time: '' },
      to: { date: '', time: '' },
    })
    wrapper.unmount()
  })
})
