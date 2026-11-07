<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { resolveIcon } from '@/icons/resolveIcon'
import AppLayoutPanelOverlay from './AppLayoutPanelOverlay.vue'
import AppLayoutSidebarMenu from './AppLayoutSidebarMenu.vue'

const MOBILE_MEDIA_QUERY = '(max-width: 1023px)'
const MenuIcon = resolveIcon('menu')

export interface AppLayoutProps {
  menuWidth?: string
  menuCollapsedWidth?: string
  menuLabel?: string
  defaultMenuCollapsed?: boolean
  menuCollapsible?: boolean
  panelWidth?: string
  panelMinWidth?: string
  panelMaxWidth?: string
  panelResizable?: boolean
  panelBackdrop?: boolean
  showHeader?: boolean
  showMenu?: boolean
  showFooter?: boolean
  /** Pin a settings SidebarMenuGroup or SidebarMenuItem (matching settingsMenuId) to the menu footer. */
  settingsMenu?: boolean
  /** Id of the pinned settings SidebarMenuGroup or lone SidebarMenuItem (default `settings`). */
  settingsMenuId?: string
  /**
   * How menu group children open: `flyout` (hover panel, default) or `inline` (click to expand below).
   * Collapsed rail and pinned settings groups always use flyout.
   */
  submenuMode?: 'flyout' | 'inline'
  /** `full` spans header/menu/content; `content` keeps footer under main content only. */
  footerWidth?: 'full' | 'content'
  /**
   * Force the mobile shell (hamburger + drawer) regardless of viewport width.
   * Used by the playground mobile preview.
   */
  forceMobile?: boolean
  class?: string
}

const props = withDefaults(defineProps<AppLayoutProps>(), {
  menuWidth: '12rem',
  menuCollapsedWidth: '3rem',
  menuLabel: 'Menu',
  defaultMenuCollapsed: false,
  menuCollapsible: true,
  panelWidth: 'min(24rem, 50%)',
  panelMinWidth: '12rem',
  panelMaxWidth: '75%',
  panelResizable: true,
  panelBackdrop: true,
  showHeader: true,
  showMenu: true,
  showFooter: true,
  settingsMenu: false,
  settingsMenuId: 'settings',
  submenuMode: 'flyout',
  footerWidth: 'full',
  forceMobile: false,
})

const menuCollapsed = defineModel<boolean>('menuCollapsed', { default: false })
const panelOpen = defineModel<boolean>('panelOpen', { default: false })
const activeMenuId = defineModel<string>('activeMenuId', { default: '' })
const openMenuKeys = defineModel<string[]>('openMenuKeys', { default: () => [] })
const menuDrawerOpen = defineModel<boolean>('menuDrawerOpen', { default: false })

const mediaMobile = ref(false)
let mobileMediaQuery: MediaQueryList | null = null

function syncMobileMedia(): void {
  mediaMobile.value = mobileMediaQuery?.matches ?? false
}

onMounted(() => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return
  }

  mobileMediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
  syncMobileMedia()
  mobileMediaQuery.addEventListener('change', syncMobileMedia)
})

onUnmounted(() => {
  mobileMediaQuery?.removeEventListener('change', syncMobileMedia)
  mobileMediaQuery = null
  document.removeEventListener('keydown', onEscape)
})

const isMobile = computed(() => props.forceMobile || mediaMobile.value)

const showMobileMenuButton = computed(() => isMobile.value && props.showMenu && props.showHeader)

const activeMenuWidth = computed(() =>
  menuCollapsed.value ? props.menuCollapsedWidth : props.menuWidth,
)

const menuCollapsedForShell = computed(() => (isMobile.value ? false : menuCollapsed.value))
const menuCollapsibleForShell = computed(() => (isMobile.value ? false : props.menuCollapsible))
const submenuModeForShell = computed(() => (isMobile.value ? 'inline' : props.submenuMode))

const usesGridFooter = computed(
  () => props.showFooter && !(props.footerWidth === 'content' && props.showMenu),
)

const usesContentFooter = computed(
  () => props.showFooter && props.footerWidth === 'content' && props.showMenu,
)

const gridStyle = computed(() => {
  if (props.showMenu) {
    return {
      gridTemplateAreas: props.showHeader && usesGridFooter.value
        ? '"header header" "shell shell" "footer footer"'
        : props.showHeader
          ? '"header header" "shell shell"'
          : usesGridFooter.value
            ? '"shell shell" "footer footer"'
            : '"shell shell"',
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: [
        props.showHeader ? 'auto' : null,
        'minmax(0, 1fr)',
        usesGridFooter.value ? 'auto' : null,
      ]
        .filter(Boolean)
        .join(' '),
    }
  }

  return {
    gridTemplateAreas: props.showHeader && usesGridFooter.value
      ? '"header" "content" "footer"'
      : props.showHeader
        ? '"header" "content"'
        : usesGridFooter.value
          ? '"content" "footer"'
          : '"content"',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: [
      props.showHeader ? 'auto' : null,
      'minmax(0, 1fr)',
      usesGridFooter.value ? 'auto' : null,
    ]
      .filter(Boolean)
      .join(' '),
  }
})

const shellStyle = computed(() => ({
  gridArea: 'shell',
  gridTemplateColumns: isMobile.value ? 'minmax(0, 1fr)' : 'auto minmax(0, 1fr)',
  gridTemplateRows: 'minmax(0, 1fr)',
}))

function toggleMenu(): void {
  if (!props.menuCollapsible || isMobile.value) {
    return
  }

  menuCollapsed.value = !menuCollapsed.value
}

function closePanel(): void {
  panelOpen.value = false
}

function closeMenuDrawer(): void {
  menuDrawerOpen.value = false
}

function toggleMenuDrawer(): void {
  menuDrawerOpen.value = !menuDrawerOpen.value
}

function onEscape(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return

  if (menuDrawerOpen.value) {
    closeMenuDrawer()
    return
  }

  if (panelOpen.value) {
    closePanel()
  }
}

onBeforeMount(() => {
  if (props.defaultMenuCollapsed) {
    menuCollapsed.value = true
  }
})

watch(
  () => props.menuCollapsible,
  (collapsible) => {
    if (!collapsible && menuCollapsed.value) {
      menuCollapsed.value = false
    }
  },
)

watch(isMobile, (mobile) => {
  if (!mobile) {
    menuDrawerOpen.value = false
  }
})

watch(
  [panelOpen, menuDrawerOpen],
  ([panel, menu]) => {
    if (panel || menu) {
      document.addEventListener('keydown', onEscape)
      return
    }

    document.removeEventListener('keydown', onEscape)
  },
  { immediate: true },
)
</script>

<template>
  <div
    :class="cn('grid h-full min-h-0 overflow-hidden rounded-lg border border-border bg-background', props.class)"
    :style="gridStyle"
    :data-mobile="isMobile ? 'true' : 'false'"
  >
    <header
      v-if="showHeader"
      class="relative border-b border-border bg-card"
      style="grid-area: header"
    >
      <button
        v-if="showMobileMenuButton"
        type="button"
        class="absolute inset-y-0 left-0 z-10 flex appearance-none items-center justify-center border-0 bg-transparent p-0 px-3 text-muted-foreground shadow-none outline-none ring-0 transition-colors hover:bg-transparent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        :aria-label="menuDrawerOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuDrawerOpen"
        @click="toggleMenuDrawer"
      >
        <component :is="MenuIcon" :size="18" class="size-[1.125rem] shrink-0" aria-hidden="true" />
      </button>
      <div
        class="min-w-0"
        :class="{ 'ds-app-layout-header-with-menu': showMobileMenuButton }"
      >
        <slot name="header" />
      </div>
    </header>

    <div
      v-if="showMenu"
      class="relative grid min-h-0 min-w-0 overflow-hidden bg-background"
      :style="shellStyle"
    >
      <aside
        v-if="!isMobile"
        :class="
          cn(
            'flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r border-border bg-card/60 px-0 py-0 transition-[width] duration-300 ease-in-out',
          )
        "
        :style="{ width: activeMenuWidth }"
        :data-menu-collapsed="menuCollapsed ? 'true' : 'false'"
      >
        <div class="flex h-full min-h-0 w-full flex-1 flex-col">
          <AppLayoutSidebarMenu
            v-model:active-id="activeMenuId"
            v-model:open-keys="openMenuKeys"
            :collapsed="menuCollapsedForShell"
            :menu-label="menuLabel"
            :menu-width="menuWidth"
            :menu-collapsed-width="menuCollapsedWidth"
            :menu-collapsible="menuCollapsibleForShell"
            :toggle-menu="toggleMenu"
            :settings-menu="settingsMenu"
            :settings-menu-id="settingsMenuId"
            :submenu-mode="submenuModeForShell"
          >
            <slot name="menu" />
          </AppLayoutSidebarMenu>
        </div>
      </aside>

      <div class="relative flex min-h-0 min-w-0 flex-col overflow-hidden">
        <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <main class="flex h-full min-h-0 flex-1 flex-col overflow-y-auto">
            <div class="flex h-full min-h-0 flex-1 flex-col">
              <slot />
            </div>
          </main>

          <AppLayoutPanelOverlay
            v-model:open="panelOpen"
            :backdrop="panelBackdrop"
            :initial-width="panelWidth"
            :min-width="panelMinWidth"
            :max-width="panelMaxWidth"
            :resizable="panelResizable"
          >
            <template #default="panelSlot">
              <slot name="panel" v-bind="panelSlot" />
            </template>
          </AppLayoutPanelOverlay>

          <!-- Mobile menu: contained in AppLayout shell (not teleported to viewport) -->
          <Transition
            enter-active-class="transition-opacity duration-300 ease-in-out"
            leave-active-class="transition-opacity duration-300 ease-in-out"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <button
              v-if="isMobile && menuDrawerOpen"
              type="button"
              class="absolute inset-0 z-30 bg-background/50"
              aria-label="Close menu"
              @click="closeMenuDrawer"
            />
          </Transition>

          <Transition
            enter-active-class="transition-transform duration-300 ease-in-out"
            leave-active-class="transition-transform duration-300 ease-in-out"
            enter-from-class="-translate-x-full"
            leave-to-class="-translate-x-full"
          >
            <aside
              v-if="isMobile && menuDrawerOpen"
              data-app-layout-menu-drawer
              class="absolute inset-y-0 left-0 z-40 flex min-h-0 max-w-[85%] flex-col overflow-hidden border-r border-border bg-card shadow-xl"
              :style="{ width: menuWidth }"
            >
              <AppLayoutSidebarMenu
                v-model:active-id="activeMenuId"
                v-model:open-keys="openMenuKeys"
                :collapsed="false"
                :menu-label="menuLabel"
                :menu-width="menuWidth"
                :menu-collapsed-width="menuCollapsedWidth"
                :menu-collapsible="false"
                :toggle-menu="toggleMenu"
                :settings-menu="settingsMenu"
                :settings-menu-id="settingsMenuId"
                :submenu-mode="submenuModeForShell"
                :on-navigate="closeMenuDrawer"
              >
                <slot name="menu" />
              </AppLayoutSidebarMenu>
            </aside>
          </Transition>
        </div>

        <footer
          v-if="usesContentFooter"
          class="shrink-0 border-t border-border bg-card"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>

    <div
      v-else
      class="relative flex h-full min-h-0 flex-col overflow-hidden bg-background"
      style="grid-area: content"
    >
      <main class="flex h-full min-h-0 flex-1 flex-col overflow-y-auto">
        <div class="flex h-full min-h-0 flex-1 flex-col">
          <slot />
        </div>
      </main>

      <AppLayoutPanelOverlay
        v-model:open="panelOpen"
        :backdrop="panelBackdrop"
        :initial-width="panelWidth"
        :min-width="panelMinWidth"
        :max-width="panelMaxWidth"
        :resizable="panelResizable"
      >
        <template #default="panelSlot">
          <slot name="panel" v-bind="panelSlot" />
        </template>
      </AppLayoutPanelOverlay>
    </div>

    <footer
      v-if="usesGridFooter"
      class="border-t border-border bg-card"
      style="grid-area: footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
/* Pad the header slot child so its background spans under the hamburger. */
.ds-app-layout-header-with-menu > :deep(*) {
  box-sizing: border-box;
  padding-left: 2.5rem;
}
</style>
