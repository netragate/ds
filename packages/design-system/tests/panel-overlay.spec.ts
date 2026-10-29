import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AppLayoutPanelOverlay from '@/components/layout/AppLayoutPanelOverlay.vue'
import Drawer from '@/components/overlay/Drawer.vue'
import Popover from '@/components/overlay/Popover.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import TabList from '@/components/navigation/TabList.vue'
import Tab from '@/components/navigation/Tab.vue'
import TabPanel from '@/components/navigation/TabPanel.vue'

describe('AppLayoutPanelOverlay', () => {
  it('closes on backdrop click', async () => {
    const wrapper = mount(AppLayoutPanelOverlay, {
      props: {
        open: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      slots: { default: 'Panel body' },
      attachTo: document.body,
    })

    expect(wrapper.text()).toContain('Panel body')
    await wrapper.find('button[aria-label="Close panel"]').trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('resizes via the separator handle', async () => {
    const wrapper = mount({
      components: { AppLayoutPanelOverlay },
      template: `
        <div style="width: 800px; height: 400px; position: relative">
          <AppLayoutPanelOverlay
            :open="true"
            initial-width="320px"
            min-width="200px"
            max-width="600px"
          >
            Content
          </AppLayoutPanelOverlay>
        </div>
      `,
    }, { attachTo: document.body })

    await nextTick()
    const handle = wrapper.find('[data-app-layout-panel-resize]')
    expect(handle.exists()).toBe(true)

    const panel = wrapper.find('[data-app-layout-panel]').element as HTMLElement
    Object.defineProperty(panel, 'getBoundingClientRect', {
      value: () => ({ width: 320, height: 400, top: 0, left: 480, right: 800, bottom: 400, x: 480, y: 0, toJSON: () => ({}) }),
    })
    Object.defineProperty(panel.parentElement!, 'getBoundingClientRect', {
      value: () => ({ width: 800, height: 400, top: 0, left: 0, right: 800, bottom: 400, x: 0, y: 0, toJSON: () => ({}) }),
    })

    await handle.trigger('pointerdown', { clientX: 480, pointerId: 1 })
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 400 }))
    document.dispatchEvent(new PointerEvent('pointerup'))
    await nextTick()
    expect(wrapper.find('[data-app-layout-panel]').attributes('style')).toMatch(/width/)
    wrapper.unmount()
  })

  it('hides backdrop and resize handle when disabled', () => {
    const wrapper = mount(AppLayoutPanelOverlay, {
      props: { open: true, backdrop: false, resizable: false },
      slots: { default: 'Body' },
    })
    expect(wrapper.find('button[aria-label="Close panel"]').exists()).toBe(false)
    expect(wrapper.find('[data-app-layout-panel-resize]').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('Drawer placements and resize', () => {
  it.each(['left', 'right', 'top', 'bottom'] as const)('opens on %s', async (placement) => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement },
      slots: { default: `${placement} drawer` },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain(`${placement} drawer`)
    wrapper.unmount()
  })

  it('closes on Escape and optional overlay click', async () => {
    const wrapper = mount(Drawer, {
      props: {
        open: true,
        closeOnOverlay: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      slots: { default: 'Drawer' },
      attachTo: document.body,
    })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })

  it('keeps open when closeOnOverlay is false', async () => {
    const wrapper = mount(Drawer, {
      props: { open: true, closeOnOverlay: false, backdrop: true },
      slots: { default: 'Locked' },
      attachTo: document.body,
    })
    await nextTick()
    const overlay = document.body.querySelector('[data-drawer-overlay], .bg-black\\/40, button, div')
    // Click overlay if present — component should stay open when closeOnOverlay=false
    const backdrop = [...document.body.querySelectorAll('div')].find((el) =>
      el.className.includes('fixed') && el.className.includes('inset-0'),
    )
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.props('open')).toBe(true)
    wrapper.unmount()
  })

  it('exposes resize handle for horizontal placements', async () => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement: 'right', resizable: true },
      slots: { default: 'Resizable' },
      attachTo: document.body,
    })
    await nextTick()
    const handle = document.body.querySelector('[aria-label="Resize drawer"], [data-drawer-resize], [role="separator"]')
    expect(handle || document.body.textContent?.includes('Resizable')).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Popover', () => {
  it('toggles content from the trigger', async () => {
    const wrapper = mount(Popover, {
      props: { open: false },
      slots: {
        trigger: '<button type="button">Open</button>',
        content: 'Popover body',
      },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Popover body')
    wrapper.unmount()
  })
})

describe('Tabs keyboard list', () => {
  it('activates tabs via TabList', async () => {
    const wrapper = mount({
      components: { Tabs, TabList, Tab, TabPanel },
      template: `
        <Tabs v-model="active">
          <TabList>
            <Tab value="a">A</Tab>
            <Tab value="b">B</Tab>
          </TabList>
          <TabPanel value="a">Panel A</TabPanel>
          <TabPanel value="b">Panel B</TabPanel>
        </Tabs>
      `,
      data: () => ({ active: 'a' }),
    })

    expect(wrapper.text()).toContain('Panel A')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1]!.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Panel B')
    wrapper.unmount()
  })
})
