<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DS_TABLE_NESTED_CLASS } from './tableConstants'

export interface TableProps {
  striped?: boolean
  /** Marks this table as nested inside another table (cell or expand panel). */
  nested?: boolean
  class?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  striped: false,
  nested: false,
})

const classes = computed(() =>
  cn(
    'w-full caption-bottom text-sm',
    props.nested && DS_TABLE_NESTED_CLASS,
    // Nested header chrome — distinct from body cells (TableCell is often used in thead).
    props.nested &&
      [
        '[&>thead>tr]:border-b [&>thead>tr]:border-border',
        '[&>thead>tr]:hover:bg-transparent',
        '[&>thead>tr>th]:bg-muted/70 [&>thead>tr>td]:bg-muted/70',
        '[&>thead>tr>th]:text-xs [&>thead>tr>td]:text-xs',
        '[&>thead>tr>th]:font-semibold [&>thead>tr>td]:font-semibold',
        '[&>thead>tr>th]:uppercase [&>thead>tr>td]:uppercase',
        '[&>thead>tr>th]:tracking-wide [&>thead>tr>td]:tracking-wide',
        '[&>thead>tr>th]:text-muted-foreground [&>thead>tr>td]:text-muted-foreground',
        '[&>thead>tr>th]:py-2.5 [&>thead>tr>td]:py-2.5',
      ].join(' '),
    // Direct-child selectors keep stripe/hover off nested tables inside cells.
    // Exclude expanded detail rows so accordion panels do not steal stripe/hover.
    props.striped &&
      '[&>tbody>tr:not([data-expanded-detail]):nth-child(even)]:bg-muted/50',
    '[&>tbody>tr:not([data-expanded-detail])]:transition-colors [&>tbody>tr:not([data-expanded-detail]):hover]:bg-muted/50',
    props.class,
  ),
)
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="classes">
      <slot />
    </table>
  </div>
</template>
