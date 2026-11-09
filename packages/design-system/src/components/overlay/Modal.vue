<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  MODAL_WIDTH_DEFAULT,
  modalWidthPanelClasses,
  modalWidthShellClass,
  type ModalWidth,
} from './modalWidth'

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(
  defineProps<{
    closeOnOverlay?: boolean
    width?: ModalWidth
    titleId?: string
    class?: string
  }>(),
  {
    closeOnOverlay: true,
    width: MODAL_WIDTH_DEFAULT,
  },
)

const panelRef = ref<HTMLElement | null>(null)

function close(): void {
  open.value = false
}

function onOverlayClick(): void {
  if (props.closeOnOverlay) {
    close()
  }
}

function onKeydown(event: KeyboardEvent): void {
  // When overlay dismiss is locked (e.g. request in flight), Escape must not close either.
  if (event.key === 'Escape' && open.value && props.closeOnOverlay) {
    event.preventDefault()
    close()
  }
}

watch(
  () => open.value,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      await nextTick()
      panelRef.value?.focus()
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  // Restore scroll in case the component is destroyed while open
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[var(--ds-z-modal)]">
      <div
        class="fixed inset-0 bg-black/60"
        aria-hidden="true"
        @click="onOverlayClick"
      />
      <div
        :class="
          cn(
            'pointer-events-none fixed inset-0 flex items-center justify-center',
            modalWidthShellClass(props.width),
          )
        "
      >
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-labelledby="props.titleId || undefined"
          :class="
            cn(
              'pointer-events-auto relative w-full rounded-lg border border-border bg-card p-6 text-card-foreground shadow-[var(--ds-shadow-modal)] outline-none',
              modalWidthPanelClasses[props.width],
              props.class,
            )
          "
        >
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
