<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import SidebarMenu from '../navigation/SidebarMenu.vue'
import SidebarMenuShell from '../navigation/SidebarMenuShell.vue'
import AppLayoutMenuToggle from './AppLayoutMenuToggle.vue'
import {
  APP_LAYOUT_MENU_INJECTION_KEY,
  type SettingsFooterMode,
} from './appLayoutMenuContext'

const props = withDefaults(
  defineProps<{
    collapsed: boolean
    menuLabel?: string
    menuWidth: string
    menuCollapsedWidth?: string
    menuCollapsible?: boolean
    toggleMenu: () => void
    settingsMenu?: boolean
    settingsMenuId?: string
    submenuMode?: 'flyout' | 'inline'
  }>(),
  {
    menuCollapsible: true,
    settingsMenu: false,
    settingsMenuId: 'settings',
    submenuMode: 'flyout',
  },
)

const activeId = defineModel<string>('activeId', { default: '' })
const openKeys = defineModel<string[]>('openKeys', { default: () => [] })

const settingsFooterMode = ref<SettingsFooterMode>('none')
const settingsGroupTarget = ref<HTMLElement | null>(null)
const settingsSingleTarget = ref<HTMLElement | null>(null)

function registerSettingsGroup(): void {
  settingsFooterMode.value = 'group'
}

function registerSettingsSingle(): void {
  settingsFooterMode.value = 'single'
}

function unregisterSettingsGroup(): void {
  if (settingsFooterMode.value === 'group') {
    settingsFooterMode.value = 'none'
  }
}

function unregisterSettingsSingle(): void {
  if (settingsFooterMode.value === 'single') {
    settingsFooterMode.value = 'none'
  }
}

watch(
  () => props.settingsMenu,
  (enabled) => {
    if (!enabled) {
      settingsFooterMode.value = 'none'
    }
  },
)

const showSettingsFooter = computed(
  () => props.settingsMenu && settingsFooterMode.value !== 'none',
)

provide(APP_LAYOUT_MENU_INJECTION_KEY, {
  settingsMenu: computed(() => props.settingsMenu),
  settingsMenuId: computed(() => props.settingsMenuId),
  settingsFooterMode,
  settingsGroupTarget,
  settingsSingleTarget,
  registerSettingsGroup,
  registerSettingsSingle,
  unregisterSettingsGroup,
  unregisterSettingsSingle,
})
</script>

<template>
  <SidebarMenuShell
    class="h-full min-h-0"
    :collapsed="collapsed"
    :menu-label="menuLabel"
    :menu-width="menuWidth"
    :collapsed-width="menuCollapsedWidth ?? menuWidth"
    :show-toggle="menuCollapsible"
  >
    <template v-if="menuCollapsible" #toggle>
      <AppLayoutMenuToggle :collapsed="collapsed" :toggle-menu="toggleMenu" />
    </template>

    <SidebarMenu
      v-model:active-id="activeId"
      v-model:open-keys="openKeys"
      :collapsed="collapsed"
      :submenu-mode="submenuMode"
      class="flex h-full min-h-0 w-full flex-1 flex-col"
    >
      <div class="flex h-full min-h-0 w-full flex-1 flex-col">
        <div class="ds-scrollbar flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain">
          <slot />
        </div>

        <!--
          Keep both teleport hosts mounted and visible whenever settingsMenu is on.
          Do not v-show-hide the host — teleported nodes would disappear with it.
        -->
        <div
          v-if="settingsMenu"
          class="mt-auto shrink-0"
          :class="showSettingsFooter ? 'border-t border-border pt-2' : undefined"
          data-settings-footer-host
        >
          <div
            ref="settingsGroupTarget"
            class="flex w-full flex-col"
            data-settings-footer="group"
          />
          <div
            ref="settingsSingleTarget"
            class="flex flex-col gap-0.5"
            data-settings-footer="single"
          />
        </div>
      </div>
    </SidebarMenu>
  </SidebarMenuShell>
</template>
