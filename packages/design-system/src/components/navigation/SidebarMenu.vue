<script setup lang="ts">
import { computed, nextTick, provide } from 'vue'
import { cn } from '@/lib/utils'
import {
  accordionOpenKeys,
  menuIdsEqual,
  normalizeMenuId,
} from './sidebarMenuOpenKeys'
import {
  SIDEBAR_MENU_INJECTION_KEY,
  type SidebarMenuContext,
  type SidebarSubmenuMode,
} from './sidebarMenuContext'

const props = withDefaults(
  defineProps<{
    collapsed?: boolean
    /**
     * How group children open: `flyout` (hover panel, default) or `inline` (click to expand below).
     * Collapsed rail always uses flyout.
     */
    submenuMode?: SidebarSubmenuMode
    class?: string
  }>(),
  {
    collapsed: false,
    submenuMode: 'flyout',
  },
)

const activeId = defineModel<string>('activeId', { default: '' })
const openKeys = defineModel<string[]>('openKeys', { default: () => [] })

interface FlyoutRegistration {
  depth: number
  close: () => void
  isOpen: () => boolean
}

const flyoutRegistry = new Map<string, FlyoutRegistration>()
const groupItemIds = new Map<string, Set<string>>()
const topLevelItemIds = new Set<string>()
let firstRegisteredItemId: string | null = null

function toggleOpen(key: string): void {
  openKeys.value = accordionOpenKeys(openKeys.value, key)
}

function isOpen(key: string): boolean {
  const normalized = normalizeMenuId(key)

  return openKeys.value.some((item) => menuIdsEqual(item, normalized))
}

function isActive(id: string): boolean {
  if (!activeId.value) {
    return false
  }

  return menuIdsEqual(activeId.value, id)
}

function isGroupActive(id: string): boolean {
  if (!activeId.value) {
    return false
  }

  const normalizedId = normalizeMenuId(id)
  const normalizedActive = normalizeMenuId(activeId.value)

  if (normalizedActive === normalizedId) {
    return true
  }

  const directMembers = groupItemIds.get(id) ?? groupItemIds.get(normalizedId)
  if (directMembers) {
    for (const member of directMembers) {
      if (menuIdsEqual(member, activeId.value)) {
        return true
      }
    }
  }

  for (const [groupId, members] of groupItemIds) {
    const normalizedGroupId = normalizeMenuId(groupId)

    if (
      normalizedGroupId === normalizedId
      || !normalizedGroupId.startsWith(`${normalizedId}.`)
    ) {
      continue
    }

    for (const member of members) {
      if (menuIdsEqual(member, activeId.value)) {
        return true
      }
    }
  }

  const prefix = `${normalizedId}.`
  if (
    normalizedActive.startsWith(prefix)
    && ![...topLevelItemIds].some((item) => menuIdsEqual(item, activeId.value))
  ) {
    return true
  }

  return false
}

function registerMenuItem(id: string, isTopLevel = true): void {
  if (isTopLevel) {
    topLevelItemIds.add(id)
  }

  if (firstRegisteredItemId === null) {
    firstRegisteredItemId = id
  }

  if (firstRegisteredItemId === id) {
    // Double nextTick: give the parent a chance to bind activeId from the route
    // before falling back to the first registered item.
    nextTick(() => {
      nextTick(() => {
        if (!activeId.value) {
          activeId.value = id
        }
      })
    })
  }
}

function registerGroupItem(groupId: string, itemId: string): void {
  const members = groupItemIds.get(groupId) ?? new Set<string>()
  members.add(itemId)
  groupItemIds.set(groupId, members)
}

function registerFlyoutCloser(
  id: string,
  depth: number,
  close: () => void,
  isOpen: () => boolean,
): void {
  flyoutRegistry.set(id, { depth, close, isOpen })
}

function unregisterFlyoutCloser(id: string): void {
  flyoutRegistry.delete(id)
}

function closePeerFlyouts(depth: number, exceptId: string): void {
  flyoutRegistry.forEach(({ close, depth: entryDepth }, id) => {
    if (entryDepth === depth && id !== exceptId) {
      close()
    }
  })
}

function closeAllFlyouts(): void {
  flyoutRegistry.forEach(({ close }) => close())
}

function hasOpenDescendantFlyouts(depth: number): boolean {
  for (const { depth: entryDepth, isOpen } of flyoutRegistry.values()) {
    if (entryDepth > depth && isOpen()) {
      return true
    }
  }

  return false
}

function setActive(id: string): void {
  activeId.value = id
  closeAllFlyouts()
}

const context: SidebarMenuContext = {
  collapsed: computed(() => props.collapsed),
  inFlyout: computed(() => false),
  showLabels: computed(() => !props.collapsed),
  submenuMode: computed(() => props.submenuMode),
  activeId,
  openKeys,
  depth: 0,
  toggleOpen,
  isOpen,
  isActive,
  isGroupActive,
  setActive,
  registerMenuItem,
  registerGroupItem,
  registerFlyoutCloser,
  unregisterFlyoutCloser,
  closePeerFlyouts,
  hasOpenDescendantFlyouts,
  closeAllFlyouts,
}

provide(SIDEBAR_MENU_INJECTION_KEY, context)
</script>

<template>
  <nav :class="cn('flex w-full min-w-0 flex-col gap-0.5', props.class)">
    <slot />
  </nav>
</template>
