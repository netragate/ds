import { describe, expect, it, vi } from 'vitest'
import { playgroundDemoLoaders, loadPlaygroundDemoComponent } from '../playground/demos/registry'
import { hasPlaygroundDemo, playgroundDemoName } from '../playground/data/componentCatalog'
import {
  DrawerPlayground,
  LayoutDemo,
  DataTableDemo,
  ModalDemo,
  PaginationDemo,
  mountDemo,
} from './helpers/playgroundMount'

describe('playground demos after Pagination', () => {
  it('registry resolves demos below Pagination in the index', () => {
    for (const name of [
      'Pagination',
      'DataTable',
      'Layout',
      'Layout Primitives',
      'Modal',
      'Dialog',
      'Drawer',
      'Tooltip',
      'Popover',
    ]) {
      expect(playgroundDemoLoaders[name], name).toBeDefined()
    }
  })

  it('catalog aliases below Pagination expose playground names', () => {
    for (const name of ['SidebarMenu', 'SidebarMenuItem', 'PageSizeSelect', 'AppLayout', 'Container']) {
      expect(hasPlaygroundDemo(name), name).toBe(true)
      expect(playgroundDemoName(name), name).toBeTruthy()
    }
  })

  it('mounts demos below Pagination without runtime errors', () => {
    for (const demo of [PaginationDemo, DataTableDemo, LayoutDemo, ModalDemo]) {
      const wrapper = mountDemo(demo)
      expect(wrapper.find('.pg-playground-panel').exists()).toBe(true)
      wrapper.unmount()
    }
  })

  it('DrawerPlayground renders external demos below Pagination', async () => {
    for (const name of ['Pagination', 'DataTable', 'Layout', 'Layout Primitives', 'Modal']) {
      const wrapper = mountDemo(DrawerPlayground, { name })
      await vi.waitFor(() => {
        expect(wrapper.find('.pg-playground-panel').exists()).toBe(true)
      })
      expect(wrapper.text()).not.toContain('previewFallback')
      wrapper.unmount()
    }
  })
})
