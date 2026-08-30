<script setup lang="ts">
import { computed } from 'vue'
import { resolveIcon } from '@/icons/resolveIcon'
import type { IconographyName } from '@/icons/iconography.meta'

const props = defineProps<{
  name: IconographyName
  size: number
  color: string
}>()

const icon = computed(() => resolveIcon(props.name))
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :style="{ color }"
  />
</template>
