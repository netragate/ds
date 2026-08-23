<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import {
  computed,
  inject,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  toValue,
  watch,
} from 'vue'
import type { Component } from 'vue'
import { cn } from '@/lib/utils'
import {
  APP_LAYOUT_MENU_INJECTION_KEY,
  isPinnedSettingsGroupId,
} from '../layout/appLayoutMenuContext'
import {
  sidebarMenuChevronClass,
  sidebarMenuIconClass,
  sidebarMenuIconStateClass,
  sidebarMenuLabelClass,
  sidebarMenuStateClass,
  sidebarMenuTriggerClass,
} from './sidebarMenuStyles'
import SidebarMenuFlyout from './SidebarMenuFlyout.vue'
import {
  SIDEBAR_MENU_INJECTION_KEY,
  type SidebarMenuContext,
} from './sidebarMenuContext'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    icon?: Component
    defaultOpen?: boolean
    /** Flyout vertical alignment relative to the group trigger. `auto` opens upward when near the viewport bottom. */
    flyoutPlacement?: 'auto' | 'down' | 'up'
    /** IDs of child menu items — used to mark group as active even when flyout is closed. */
    childIds?: string[]
  }>(),
  {
    defaultOpen: false,
    flyoutPlacement: 'auto',
    childIds: () => [],
  },
)

const emit = defineEmits<{
  (e: 'click', id: string): void
  (e: 'select', id: string): void
}>()

const injectedMenu = inject(SIDEBAR_MENU_INJECTION_KEY)

if (!injectedMenu) {
  throw new Error('SidebarMenuGroup must be used inside SidebarMenu')
}

const sidebarMenu: SidebarMenuContext = injectedMenu
const layoutMenu = inject(APP_LAYOUT_MENU_INJECTION_KEY, null)

// Register child IDs synchronously so isGroupActive works on first render
for (const childId of props.childIds) {
  sidebarMenu.registerGroupItem(props.id, childId)
}

const isPinnedSettingsGroup = computed(
  () =>
    Boolean(
      layoutMenu?.settingsMenu.value
        && isPinnedSettingsGroupId(props.id, layoutMenu.settingsMenuId.value),
    ),
)

/**
 * Inline expand only when the menu asks for it and the rail can show labels.
 * Collapsed rail, flyout nesting, and pinned settings footer always stay flyout.
 */
const useInlineSubmenu = computed(
  () =>
    sidebarMenu.submenuMode?.value === 'inline'
    && !sidebarMenu.collapsed.value
    && !sidebarMenu.inFlyout.value
    && !isPinnedSettingsGroup.value,
)

const inlineOpen = computed(() => sidebarMenu.isOpen(props.id))

const settingsTeleportTarget = computed(() => layoutMenu?.settingsGroupTarget.value ?? null)

const renderInSettingsFooter = computed(
  () => isPinnedSettingsGroup.value && settingsTeleportTarget.value instanceof HTMLElement,
)

const renderInMain = computed(() => !isPinnedSettingsGroup.value)

const rootRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)
const flyoutRef = ref<HTMLElement | null>(null)
const flyoutOpen = ref(false)
const flyoutCoords = ref({ top: 0, left: 0 })
const flyoutAlign = ref<'down' | 'up'>('down')
let hideTimer: ReturnType<typeof setTimeout> | undefined
let scrollTarget: HTMLElement | Window | null = null
let registeredAsPinnedSettings = false

const FLYOUT_MARGIN = 8

function syncPinnedSettingsRegistration(): void {
  if (!layoutMenu) {
    return
  }

  if (isPinnedSettingsGroup.value) {
    layoutMenu.registerSettingsGroup()
    registeredAsPinnedSettings = true
    return
  }

  if (registeredAsPinnedSettings) {
    layoutMenu.unregisterSettingsGroup()
    registeredAsPinnedSettings = false
  }
}

onBeforeMount(() => {
  syncPinnedSettingsRegistration()
})

onMounted(() => {
  sidebarMenu.registerFlyoutCloser(
    props.id,
    sidebarMenu.depth,
    hideFlyout,
    () => flyoutOpen.value,
  )

  if (props.defaultOpen && !sidebarMenu.isOpen(props.id)) {
    sidebarMenu.toggleOpen(props.id)
  }
})

onUnmounted(() => {
  clearTimeout(hideTimer)
  sidebarMenu.unregisterFlyoutCloser(props.id)
  removePositionListeners()
  if (registeredAsPinnedSettings) {
    layoutMenu?.unregisterSettingsGroup()
    registeredAsPinnedSettings = false
  }
})

watch(
  () => [isPinnedSettingsGroup.value, layoutMenu?.settingsMenuId.value] as const,
  () => {
    syncPinnedSettingsRegistration()
  },
)

watch(useInlineSubmenu, (inline) => {
  if (inline) {
    hideFlyout()
  }
})

const showFlyoutHeader = computed(
  () => sidebarMenu.collapsed.value && !sidebarMenu.inFlyout.value,
)

const groupActive = computed(() => sidebarMenu.isGroupActive(props.id))

const triggerClasses = computed(() =>
  cn(sidebarMenuTriggerClass(), sidebarMenuStateClass(groupActive.value)),
)

const iconClasses = computed(() =>
  cn(
    sidebarMenuIconClass(),
    sidebarMenuIconStateClass(groupActive.value, toValue(sidebarMenu.collapsed)),
  ),
)

const chevronClasses = computed(() =>
  cn(
    sidebarMenuChevronClass(),
    groupActive.value && '!text-primary',
    useInlineSubmenu.value && inlineOpen.value && 'rotate-90',
  ),
)

const ariaExpanded = computed(() =>
  useInlineSubmenu.value ? inlineOpen.value : flyoutOpen.value,
)

function findScrollParent(element: HTMLElement | null): HTMLElement | Window {
  let node = element?.parentElement ?? null

  while (node) {
    const style = getComputedStyle(node)

    if (/(auto|scroll)/.test(style.overflowY)) {
      return node
    }

    node = node.parentElement
  }

  return window
}

function removePositionListeners(): void {
  if (scrollTarget) {
    scrollTarget.removeEventListener('scroll', updateFlyoutPosition)
    scrollTarget = null
  }

  window.removeEventListener('resize', updateFlyoutPosition)
}

function addPositionListeners(): void {
  removePositionListeners()
  scrollTarget = findScrollParent(rootRef.value)
  scrollTarget.addEventListener('scroll', updateFlyoutPosition, { passive: true })
  window.addEventListener('resize', updateFlyoutPosition, { passive: true })
}

function getViewportBounds(): { top: number; bottom: number } {
  if (scrollTarget instanceof HTMLElement) {
    const rect = scrollTarget.getBoundingClientRect()
    return { top: rect.top, bottom: rect.bottom }
  }

  return { top: 0, bottom: window.innerHeight }
}

function shouldOpenFlyoutUpward(rect: DOMRect, flyoutHeight: number): boolean {
  if (props.flyoutPlacement === 'up') {
    return true
  }

  if (props.flyoutPlacement === 'down') {
    return false
  }

  if (flyoutHeight <= 0) {
    return false
  }

  const bounds = getViewportBounds()
  const spaceBelow = bounds.bottom - rect.bottom - FLYOUT_MARGIN
  const spaceAbove = rect.top - bounds.top - FLYOUT_MARGIN

  if (spaceBelow >= flyoutHeight) {
    return false
  }

  if (spaceAbove >= flyoutHeight) {
    return true
  }

  return spaceAbove > spaceBelow
}

function applyFlyoutPosition(rect: DOMRect, flyoutHeight: number): void {
  const bounds = getViewportBounds()
  const openUpward = shouldOpenFlyoutUpward(rect, flyoutHeight)
  flyoutAlign.value = openUpward ? 'up' : 'down'

  let top = openUpward ? rect.bottom - flyoutHeight : rect.top
  const maxTop = bounds.bottom - flyoutHeight - FLYOUT_MARGIN
  top = Math.max(bounds.top + FLYOUT_MARGIN, Math.min(top, maxTop))

  flyoutCoords.value = {
    top,
    left: rect.right - 6,
  }
}

async function updateFlyoutPosition(): Promise<void> {
  await nextTick()

  const button = buttonRef.value
  const icon = iconRef.value

  if (!button) {
    return
  }

  const anchor =
    sidebarMenu.collapsed.value && !sidebarMenu.inFlyout.value && icon
      ? icon
      : button
  const rect = anchor.getBoundingClientRect()

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const flyoutHeight = flyoutRef.value?.offsetHeight ?? 0
    applyFlyoutPosition(rect, flyoutHeight)

    if (flyoutHeight > 0 || props.flyoutPlacement !== 'auto') {
      break
    }

    await nextTick()
  }
}

function showFlyout(): void {
  if (useInlineSubmenu.value) {
    return
  }

  clearTimeout(hideTimer)
  sidebarMenu.closePeerFlyouts(sidebarMenu.depth, props.id)
  flyoutOpen.value = true
}

function hideFlyout(): void {
  flyoutOpen.value = false
}

function isMovingToDeeperFlyout(related: Node | null): boolean {
  if (!(related instanceof Element)) {
    return false
  }

  const targetFlyout = related.closest('[data-sidebar-flyout]')

  if (!(targetFlyout instanceof HTMLElement)) {
    return false
  }

  const targetDepth = Number(targetFlyout.dataset.sidebarDepth ?? -1)

  return targetDepth > sidebarMenu.depth
}

function scheduleHideFlyout(event?: MouseEvent): void {
  if (useInlineSubmenu.value) {
    return
  }

  const related = event?.relatedTarget ?? null

  if (related instanceof Node) {
    if (rootRef.value?.contains(related)) {
      return
    }

    if (flyoutRef.value?.contains(related)) {
      return
    }

    if (isMovingToDeeperFlyout(related)) {
      return
    }
  }

  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (sidebarMenu.hasOpenDescendantFlyouts(sidebarMenu.depth)) {
      return
    }

    hideFlyout()
  }, 200)
}

function onTriggerClick(): void {
  if (useInlineSubmenu.value) {
    sidebarMenu.toggleOpen(props.id)
  } else {
    sidebarMenu.setActive(props.id)
  }

  emit('click', props.id)
  emit('select', props.id)
}

watch(flyoutOpen, (visible) => {
  if (visible) {
    updateFlyoutPosition()
    addPositionListeners()
    return
  }

  removePositionListeners()
})

watch(
  () => sidebarMenu.collapsed.value,
  () => {
    if (flyoutOpen.value) {
      updateFlyoutPosition()
    }
  },
)
</script>

<template>
  <Teleport
    :disabled="!renderInSettingsFooter"
    :to="settingsTeleportTarget ?? 'body'"
  >
    <div
      v-if="renderInMain || renderInSettingsFooter"
      ref="rootRef"
      class="flex w-full flex-col"
      @mouseenter="showFlyout"
      @mouseleave="scheduleHideFlyout($event)"
    >
      <button
        ref="buttonRef"
        type="button"
        :class="triggerClasses"
        :aria-expanded="ariaExpanded"
        @click="onTriggerClick"
        @mouseenter="showFlyout"
        @mouseleave="scheduleHideFlyout($event)"
      >
        <span ref="iconRef" :class="iconClasses">
          <component :is="icon" v-if="icon" :size="16" class="shrink-0" />
        </span>
        <span :class="sidebarMenuLabelClass()">{{ label }}</span>
        <ChevronRight :class="chevronClasses" />
      </button>

      <!-- Inline expand: keep mounted so open/close animate in parallel (accordion). -->
      <div
        v-if="useInlineSubmenu"
        class="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
        :class="
          inlineOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0'
        "
        data-sidebar-inline-submenu
        :data-open="inlineOpen ? 'true' : 'false'"
        :aria-hidden="!inlineOpen"
      >
        <div class="min-h-0 overflow-hidden">
          <div class="ml-3 flex flex-col gap-0.5 border-l border-border/60 py-0.5 pl-2">
            <SidebarMenuFlyout :parent-group-id="id" inline>
              <slot />
            </SidebarMenuFlyout>
          </div>
        </div>
      </div>

      <!-- Flyout panel (default / collapsed / settings) -->
      <Teleport to="body">
        <div
          v-if="flyoutOpen && !useInlineSubmenu"
          ref="flyoutRef"
          data-sidebar-flyout
          :data-sidebar-depth="sidebarMenu.depth"
          :data-flyout-placement="flyoutAlign"
          class="fixed min-w-[11rem] rounded-lg border border-border bg-popover py-1.5 pl-2.5 pr-1.5 shadow-[var(--ds-shadow-dropdown)]"
          :style="{
            top: `${flyoutCoords.top}px`,
            left: `${flyoutCoords.left}px`,
            zIndex: 200 + sidebarMenu.depth * 10,
          }"
          @mouseenter="showFlyout"
          @mouseleave="scheduleHideFlyout($event)"
        >
          <p
            v-if="showFlyoutHeader"
            class="mb-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {{ label }}
          </p>
          <SidebarMenuFlyout :parent-group-id="id">
            <slot />
          </SidebarMenuFlyout>
        </div>
      </Teleport>
    </div>
  </Teleport>
</template>
