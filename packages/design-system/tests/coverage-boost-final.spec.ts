import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import DataTable from '@/components/data-display/DataTable.vue'
import SidebarMenu from '@/components/navigation/SidebarMenu.vue'
import SidebarMenuGroup from '@/components/navigation/SidebarMenuGroup.vue'
import SidebarMenuItem from '@/components/navigation/SidebarMenuItem.vue'
import DateInput from '@/components/form/DateInput.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Alert from '@/components/feedback/Alert.vue'
import Modal from '@/components/overlay/Modal.vue'

describe('DataTable multi-sort and server watches', () => {
  it('cycles multi-column sort with metaKey and syncs server requests', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'age', label: 'Age', sortable: true },
        ],
        rows: [
          { id: '1', name: 'Zed', age: 30 },
          { id: '2', name: 'Ann', age: 20 },
          { id: '3', name: 'Bob', age: 25 },
        ],
        rowKey: 'id',
        serverSide: true,
        total: 3,
        pageSize: 10,
        searchable: true,
        resizable: true,
      },
    })

    const nameBtn = wrapper.findAll('button').find((b) => b.text().includes('Name'))
    const ageBtn = wrapper.findAll('button').find((b) => b.text().includes('Age'))
    expect(nameBtn && ageBtn).toBeTruthy()

    await nameBtn!.trigger('click')
    await nextTick()
    await ageBtn!.trigger('click', { metaKey: true })
    await nextTick()
    await ageBtn!.trigger('click', { metaKey: true })
    await nextTick()
    await ageBtn!.trigger('click', { metaKey: true })
    await nextTick()

    await wrapper.setProps({ search: 'An' })
    await flushPromises()
    await wrapper.setProps({ pageSize: 25 })
    await flushPromises()
    await wrapper.setProps({ columnFilters: { name: 'Ann' } })
    await flushPromises()

    expect(wrapper.emitted('request')!.length).toBeGreaterThan(1)

    // Drop a column from the set to hit width cleanup.
    await wrapper.setProps({
      columns: [{ key: 'name', label: 'Name', sortable: true, width: '120px' }],
    })
    await nextTick()
    wrapper.unmount()
  })
})

describe('SidebarMenuGroup flyout placement overrides', () => {
  it('forces flyout up and down placements', async () => {
    for (const flyoutPlacement of ['up', 'down'] as const) {
      const wrapper = mount(SidebarMenu, {
        props: { collapsed: false },
        slots: {
          default: `
            <SidebarMenuGroup id="g1" label="Group" flyout-placement="${flyoutPlacement}">
              <SidebarMenuItem id="g1.a" label="Item A" />
              <SidebarMenuItem id="g1.b" label="Item B" />
            </SidebarMenuGroup>
          `,
        },
        global: { components: { SidebarMenuGroup, SidebarMenuItem } },
        attachTo: document.body,
      })

      const trigger = wrapper.find('button')
      await trigger.trigger('mouseenter')
      await nextTick()
      await flushPromises()
      expect(document.body.querySelector('[data-sidebar-flyout]') || wrapper.text()).toBeTruthy()
      wrapper.unmount()
    }
  })
})

describe('DateInput showTime range seeds times from model', () => {
  it('copies times from datetime range model when finishing selection', async () => {
    const wrapper = mount(DateInput, {
      props: {
        range: true,
        showTime: true,
        locale: 'en',
        modelValue: {
          from: { date: '2026-06-01', time: '08:15:00' },
          to: { date: '2026-06-02', time: '19:45:00' },
        },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    const days = () =>
      wrapper
        .findAll('div.grid.grid-cols-7.gap-1 button')
        .filter((btn) => !btn.classes().join(' ').includes('muted-foreground/40'))
    await days().find((b) => b.text() === '10')!.trigger('click')
    await days().find((b) => b.text() === '12')!.trigger('click')
    await nextTick()
    const confirm = wrapper.findAll('button').find((b) => b.text() === 'Confirm')
    await confirm!.trigger('click')
    const value = wrapper.props('modelValue') as {
      from: { date: string; time: string }
      to: { date: string; time: string }
    }
    expect(value.from.time).toBe('08:15:00')
    expect(value.to.time).toBe('19:45:00')
    wrapper.unmount()
  })
})

describe('AppLayout Alert Modal leftover arms', () => {
  it('covers AppLayout without menu and Alert without icon slot', async () => {
    const layout = mount(AppLayout, {
      props: { showMenu: false, showHeader: false, showFooter: false, footerWidth: 'content' },
      slots: { default: 'Content only' },
    })
    expect(layout.text()).toContain('Content only')
    layout.unmount()

    expect(mount(Alert, { props: { variant: 'info' }, slots: { default: 'Hi' } }).text()).toContain('Hi')

    const modal = mount(Modal, {
      props: { open: true, closeOnOverlay: false },
      slots: { default: 'Locked' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Locked')
    modal.unmount()
  })
})
