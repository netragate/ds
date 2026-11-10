<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface TableRowProps {
  class?: string
  tabindex?: number | string
}

const props = defineProps<TableRowProps>()

defineEmits<{
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}>()
</script>

<template>
  <tr
    :tabindex="tabindex"
    :class="
      cn(
        'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        props.class,
      )
    "
    @click="$emit('click', $event)"
    @keydown="$emit('keydown', $event)"
  >
    <slot />
  </tr>
</template>
