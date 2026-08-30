import { iconRegistry } from './iconRegistry.bundle.js'
import type { IconographyName } from './iconography.meta'

export type { IconographyName }

/** Lucide components keyed by catalog name (eager registry). */
export const iconographyComponents = iconRegistry

export const buttonIcons = iconRegistry
