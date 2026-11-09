<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface TableExpandedRowProps {
  /** Number of columns to span in the parent table. */
  colspan: number
  class?: string
}

const props = defineProps<TableExpandedRowProps>()
</script>

<template>
  <tr
    data-expanded-detail=""
    :class="cn('border-b border-border bg-muted/30 hover:bg-muted/30', props.class)"
  >
    <td :colspan="colspan" class="w-full p-4 align-middle">
      <div class="w-full min-w-0">
        <slot />
      </div>
    </td>
  </tr>
</template>
