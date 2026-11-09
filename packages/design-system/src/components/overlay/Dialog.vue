<script setup lang="ts">
import { cn } from '@/lib/utils'
import Modal from './Modal.vue'
import { MODAL_WIDTH_DEFAULT, type ModalWidth } from './modalWidth'

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(
  defineProps<{
    closeOnOverlay?: boolean
    width?: ModalWidth
    class?: string
  }>(),
  {
    closeOnOverlay: true,
    width: MODAL_WIDTH_DEFAULT,
  },
)
</script>

<template>
  <Modal
    v-model:open="open"
    :close-on-overlay="props.closeOnOverlay"
    :width="props.width"
    :class="props.class"
  >
    <header v-if="$slots.title || $slots.description" class="mb-4 space-y-1">
      <h2 v-if="$slots.title" class="text-lg font-semibold leading-none">
        <slot name="title" />
      </h2>
      <p v-if="$slots.description" class="text-sm text-muted-foreground">
        <slot name="description" />
      </p>
    </header>

    <div :class="cn($slots.footer ? 'mb-4' : undefined)">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="flex justify-end gap-2">
      <slot name="footer" />
    </footer>
  </Modal>
</template>
