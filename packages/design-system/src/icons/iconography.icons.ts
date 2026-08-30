/** Lazy icon components — imports resolveIcon (loads registry on first icon only). */
import { type Component } from 'vue'
import { iconographyMeta, type IconographyName } from './iconography.meta'
import { resolveIcon } from './resolveIcon'

export type { IconographyName }

const componentCache: Partial<Record<IconographyName, Component>> = {}

/** Lazy async Lucide components keyed by catalog name. */
export const iconographyComponents = new Proxy({} as Record<IconographyName, Component>, {
  get(_target, prop) {
    const name = prop as IconographyName
    const known = iconographyMeta.some((item) => item.name === name)
    if (!known) return undefined
    if (!componentCache[name]) {
      componentCache[name] = resolveIcon(name)
    }
    return componentCache[name]
  },
})

export const buttonIcons = iconographyComponents
