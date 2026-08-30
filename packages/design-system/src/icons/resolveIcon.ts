import type { Component } from 'vue'
import type { IconographyName } from './iconography.meta'
import { iconRegistry } from './iconRegistry.bundle.js'

export type { IconographyName, IconographyName as ButtonIconName }

/** Returns the Lucide Vue component for a catalog icon name. */
export function resolveIcon(name: IconographyName): Component {
  const icon = iconRegistry[name]
  if (!icon) {
    throw new Error(`Unknown icon: ${name}`)
  }
  return icon
}

/** @deprecated Use `resolveIcon` — kept for backwards compatibility. */
export function loadIcon(name: IconographyName): Promise<Component> {
  return Promise.resolve(resolveIcon(name))
}
