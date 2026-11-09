<script setup lang="ts">
import { cn } from '@/lib/utils'
import { tableVisibilityClass, type TableColumnVisibility } from './tableVisibility'

export interface TableCellProps {
  colspan?: number
  /** Restrict cell to mobile or desktop; omit to show on both. */
  visibility?: TableColumnVisibility
  class?: string
}

const props = defineProps<TableCellProps>()
</script>

<template>
  <td
    :colspan="colspan"
    :class="
      cn(
        'p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0',
        tableVisibilityClass(props.visibility),
        props.class,
      )
    "
  >
    <slot />
  </td>
</template>
