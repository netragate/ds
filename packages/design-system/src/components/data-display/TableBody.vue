<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface TableBodyProps {
  class?: string
}

const props = defineProps<TableBodyProps>()
</script>

<template>
  <tbody :class="cn('[&>tr:last-child]:border-0', props.class)">
    <slot />
  </tbody>
</template>
