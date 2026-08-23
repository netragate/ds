<script setup lang="ts">
import { computed, inject, onBeforeMount, onUnmounted, ref, toValue, watch } from 'vue'
import type { Component } from 'vue'
import { cn } from '@/lib/utils'
import Tooltip from '../overlay/Tooltip.vue'
import {
  APP_LAYOUT_MENU_INJECTION_KEY,
  isPinnedSettingsSingleId,
} from '../layout/appLayoutMenuContext'
import { SIDEBAR_MENU_INJECTION_KEY } from './sidebarMenuContext'
import {
  sidebarMenuIconClass,
  sidebarMenuIconStateClass,
  sidebarMenuLabelClass,
  sidebarMenuStateClass,
  sidebarMenuTriggerClass,
} from './sidebarMenuStyles'

const props = defineProps<{
  id: string
  label: string
  icon?: Component
}>()

const emit = defineEmits<{
  (e: 'click', id: string): void
  (e: 'select', id: string): void
}>()

const iconRef = ref<HTMLElement | null>(null)
const injectedMenu = inject(SIDEBAR_MENU_INJECTION_KEY)

if (!injectedMenu) {
  throw new Error('SidebarMenuItem must be used inside SidebarMenu')
}

const layoutMenu = inject(APP_LAYOUT_MENU_INJECTION_KEY, null)
const menu = injectedMenu
const active = computed(() => menu.isActive(props.id))

const isPinnedSettingsSingle = computed(() =>
  layoutMenu
    ? layoutMenu.settingsMenu.value
      && isPinnedSettingsSingleId(props.id, layoutMenu.settingsMenuId.value, menu.parentGroupId)
    : false,
)

const settingsTeleportTarget = computed(() => layoutMenu?.settingsSingleTarget.value ?? null)

const renderInSettingsFooter = computed(
  () => isPinnedSettingsSingle.value && settingsTeleportTarget.value instanceof HTMLElement,
)

const renderInMain = computed(() => !isPinnedSettingsSingle.value)

const classes = computed(() =>
  cn(sidebarMenuTriggerClass(), sidebarMenuStateClass(active.value)),
)

const iconClasses = computed(() =>
  cn(
    sidebarMenuIconClass(),
    sidebarMenuIconStateClass(active.value, toValue(menu.collapsed)),
  ),
)

let registeredAsPinnedSettings = false

function syncPinnedSettingsRegistration(): void {
  if (!layoutMenu || menu.parentGroupId) {
    return
  }

  if (isPinnedSettingsSingle.value) {
    layoutMenu.registerSettingsSingle()
    registeredAsPinnedSettings = true
    return
  }

  if (registeredAsPinnedSettings) {
    layoutMenu.unregisterSettingsSingle()
    registeredAsPinnedSettings = false
  }
}

onBeforeMount(() => {
  syncPinnedSettingsRegistration()

  const isTopLevel = !menu.parentGroupId
  menu.registerMenuItem(props.id, isTopLevel)

  if (menu.parentGroupId) {
    menu.registerGroupItem(menu.parentGroupId, props.id)
  }
})

onUnmounted(() => {
  if (registeredAsPinnedSettings) {
    layoutMenu?.unregisterSettingsSingle()
    registeredAsPinnedSettings = false
  }
})

watch(
  () => [isPinnedSettingsSingle.value, layoutMenu?.settingsMenuId.value] as const,
  () => {
    syncPinnedSettingsRegistration()
  },
)
</script>

<template>
  <Teleport
    :disabled="!renderInSettingsFooter"
    :to="settingsTeleportTarget ?? 'body'"
  >
    <Tooltip
      v-if="menu.collapsed.value && (renderInMain || renderInSettingsFooter)"
      :content="label"
      placement="right"
      variant="outline"
      :target-ref="iconRef"
    >
      <button
        type="button"
        :class="classes"
        :aria-current="active ? 'page' : undefined"
        @click.stop="menu.setActive(id); emit('click', id); emit('select', id)"
      >
        <span ref="iconRef" :class="iconClasses">
          <component :is="icon" v-if="icon" :size="16" class="shrink-0" />
        </span>
        <span :class="sidebarMenuLabelClass()">{{ label }}</span>
      </button>
    </Tooltip>

    <button
      v-else-if="renderInMain || renderInSettingsFooter"
      type="button"
      :class="classes"
      :aria-current="active ? 'page' : undefined"
      @click.stop="menu.setActive(id); emit('click', id); emit('select', id)"
    >
      <span ref="iconRef" :class="iconClasses">
        <component :is="icon" v-if="icon" :size="16" class="shrink-0" />
      </span>
      <span :class="sidebarMenuLabelClass()">{{ label }}</span>
    </button>
  </Teleport>
</template>
