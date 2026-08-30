/** Icon set curated from lucide-vue-next (https://lucide.dev). */
import { defineAsyncComponent, type Component } from 'vue'
import { iconographyMeta, type IconographyName } from './iconography.meta'
import { iconLoaders } from './iconography.loaders'

export type { IconographyName }

/** Catalog metadata (name + label). SVG components load on demand via peers. */
export const iconography = iconographyMeta

export const iconographyNames = iconographyMeta.map((item) => item.name)

export function loadIcon(name: IconographyName): Promise<Component> {
  return iconLoaders[name]().then((module) => module.default)
}

export function resolveIcon(name: IconographyName): Component {
  return defineAsyncComponent(() => loadIcon(name))
}

const componentCache: Partial<Record<IconographyName, Component>> = {}

/** Lazy async Lucide components keyed by catalog name. */
export const iconographyComponents = new Proxy({} as Record<IconographyName, Component>, {
  get(_target, prop) {
    const name = prop as IconographyName
    if (!(name in iconLoaders)) return undefined
    if (!componentCache[name]) {
      componentCache[name] = resolveIcon(name)
    }
    return componentCache[name]
  },
})

export const iconographySelectOptions = [
  { label: 'None', value: '' },
  ...iconographyMeta.map((item) => ({ label: item.label, value: item.name })),
]

export type ButtonIconName = IconographyName

export const buttonIconNames = iconographyNames
export const buttonIcons = iconographyComponents
