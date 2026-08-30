import { defineAsyncComponent, type Component } from 'vue'
import type { IconographyName } from './iconography.meta'

export type { IconographyName, IconographyName as ButtonIconName }

type LucideIconModule = { default: Component }
type IconLoaderModule = { default: () => Promise<LucideIconModule> }

/**
 * Loads a single Lucide icon by catalog name.
 * The loader registry and Lucide chunk load only when this runs.
 */
export async function loadIcon(name: IconographyName): Promise<Component> {
  const { default: loaderModules } = (await import(
    './iconLoaderRegistry.js'
  )) as { default: Record<string, () => Promise<IconLoaderModule>> }
  const key = `./loaders/${name}.ts`
  const load = loaderModules[key]
  if (!load) {
    throw new Error(`Unknown icon: ${name}`)
  }
  const mod = await load()
  const loaded = await mod.default()
  return loaded.default
}

/** Async Vue component for `<component :is="resolveIcon('settings')" />`. */
export function resolveIcon(name: IconographyName): Component {
  return defineAsyncComponent(() => loadIcon(name))
}
