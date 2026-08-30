<script setup lang="ts">
import { iconographyComponents } from '@/icons/iconography'
import type { IconographyName } from '@/icons/iconography.meta'

defineProps<{
  name: IconographyName
  size: number
  color: string
}>()
</script>

<template>
  <Suspense>
    <component
      :is="iconographyComponents[name]"
      :size="size"
      :style="{ color }"
    />
    <template #fallback>
      <span
        class="inline-block shrink-0 rounded-sm bg-border/30"
        :style="{ width: `${size}px`, height: `${size}px` }"
        aria-hidden="true"
      />
    </template>
  </Suspense>
</template>
