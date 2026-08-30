import type { Component } from 'vue'

type LucideIconModule = { default: Component }
export type IconLoaderModule = { default: () => Promise<LucideIconModule> }

/** Loaded on demand — not bundled with Button/Badge until the first icon resolves. */
const loaderModules = import.meta.glob<IconLoaderModule>('./loaders/*.ts')

export default loaderModules
