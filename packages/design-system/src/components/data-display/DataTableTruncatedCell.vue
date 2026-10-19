<script setup lang="ts">
import { ref } from 'vue'
import Tooltip from '@/components/overlay/Tooltip.vue'

defineProps<{
  text: string
}>()

const el = ref<HTMLElement | null>(null)

function canShow(): boolean {
  const node = el.value
  if (!node) return false
  return node.scrollWidth > node.clientWidth + 1
}
</script>

<template>
  <Tooltip
    :content="text"
    :can-show="canShow"
    trigger-class="block min-w-0 max-w-full"
  >
    <span ref="el" class="block truncate" data-testid="datatable-cell-text">
      <slot>{{ text }}</slot>
    </span>
  </Tooltip>
</template>
