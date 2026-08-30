<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { resolveIcon, type IconographyName } from '@/icons/iconography'
import {
  badgeAppearanceStyles,
  badgeVariantToAppearance,
  badgeVariants,
  type BadgeAppearance,
  type BadgeVariants,
} from './badgeVariants'

export interface BadgeProps extends /* @vue-ignore */ BadgeVariants {
  size?: BadgeVariants['size']
  /** Numeric value — renders as text (99+ when above 99). */
  value?: number
  /**
   * Optional icon from the iconography registry (e.g. `bell`).
   * When set, the icon renders large outside the pill and the count
   * sits as a small badge at the bottom-right of the icon.
   */
  icon?: IconographyName
  /** Badge color variant. */
  variant?: keyof typeof badgeVariantToAppearance | BadgeAppearance
  /** @deprecated Use `variant` instead. */
  appearance?: BadgeAppearance
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  appearance: undefined,
  size: 'md',
})

const resolvedAppearance = computed((): BadgeAppearance => {
  if (props.appearance) return props.appearance
  return badgeVariantToAppearance[props.variant ?? 'default'] ?? 'default'
})

const palette = computed(() => badgeAppearanceStyles[resolvedAppearance.value])

const displayText = computed(() => {
  if (props.value === undefined) return undefined
  if (props.value > 99) return '99+'
  return String(props.value)
})

const IconComponent = computed(() => {
  if (!props.icon) return null
  return resolveIcon(props.icon)
})

const hasIcon = computed(() => IconComponent.value != null)

/** Larger standalone icon when `icon` is set. */
const iconPixelSize = computed(() => (props.size === 'sm' ? 16 : 18))

const pillSizeClass = computed(() =>
  props.size === 'sm'
    ? 'min-h-4 min-w-4 px-1 text-xs'
    : 'min-h-4.5 min-w-4.5 px-1 text-xs',
)

const wrapClasses = computed(() =>
  cn(
    hasIcon.value
      ? 'relative inline-flex items-center justify-center'
      : cn(badgeVariants({ size: props.size })),
    props.class,
  ),
)

const wrapStyle = computed(() => {
  if (hasIcon.value) {
    return { color: palette.value.color }
  }
  return {
    color: palette.value.color,
    backgroundColor: palette.value.bg,
    boxShadow: `0 0 18px ${palette.value.glow}, inset 0 0 10px ${palette.value.glow}`,
  }
})

const pillStyle = computed(() => ({
  color: palette.value.color,
  backgroundColor: palette.value.bg,
  boxShadow: `0 0 12px ${palette.value.glow}, inset 0 0 6px ${palette.value.glow}`,
}))
</script>

<template>
  <span v-if="hasIcon" :class="wrapClasses" :style="wrapStyle">
    <component
      :is="IconComponent"
      :size="iconPixelSize"
      class="shrink-0"
      aria-hidden="true"
    />
    <span
      v-if="displayText !== undefined || $slots.default"
      :class="
        cn(
          'absolute -bottom-0.5 -right-1 inline-flex items-center justify-center rounded-[var(--ds-radius-badge)] font-semibold tabular-nums leading-none',
          pillSizeClass,
        )
      "
      :style="pillStyle"
    >
      <slot>{{ displayText }}</slot>
    </span>
  </span>

  <span v-else :class="wrapClasses" :style="wrapStyle">
    <slot>{{ displayText }}</slot>
  </span>
</template>
