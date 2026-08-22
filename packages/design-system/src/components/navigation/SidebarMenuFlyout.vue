<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import {
  SIDEBAR_MENU_INJECTION_KEY,
  type SidebarMenuContext,
} from './sidebarMenuContext'

const props = withDefaults(
  defineProps<{
    parentGroupId: string
    /**
     * Inline branch: register items under the parent group without forcing nested
     * groups into hover-flyout mode.
     */
    inline?: boolean
  }>(),
  {
    inline: false,
  },
)

const parent = inject(SIDEBAR_MENU_INJECTION_KEY)

if (!parent) {
  throw new Error('SidebarMenuFlyout must be used inside SidebarMenu')
}

const flyoutContext: SidebarMenuContext = {
  collapsed: computed(() => (props.inline ? parent.collapsed.value : false)),
  inFlyout: computed(() => !props.inline),
  showLabels: computed(() => (props.inline ? parent.showLabels.value : true)),
  submenuMode: parent.submenuMode,
  activeId: parent.activeId,
  openKeys: parent.openKeys,
  depth: parent.depth + 1,
  parentGroupId: props.parentGroupId,
  toggleOpen: parent.toggleOpen,
  isOpen: parent.isOpen,
  isActive: parent.isActive,
  isGroupActive: parent.isGroupActive,
  setActive: parent.setActive,
  registerMenuItem: parent.registerMenuItem,
  registerGroupItem: parent.registerGroupItem,
  registerFlyoutCloser: parent.registerFlyoutCloser,
  unregisterFlyoutCloser: parent.unregisterFlyoutCloser,
  closePeerFlyouts: parent.closePeerFlyouts,
  hasOpenDescendantFlyouts: parent.hasOpenDescendantFlyouts,
  closeAllFlyouts: parent.closeAllFlyouts,
}

provide(SIDEBAR_MENU_INJECTION_KEY, flyoutContext)
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <slot />
  </div>
</template>
