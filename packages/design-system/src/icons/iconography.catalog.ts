/** Catalog metadata only — safe to import without pulling icon loaders. */
import { iconographyMeta, type IconographyName } from './iconography.meta'

export type { IconographyName }

export const iconography = iconographyMeta
export const iconographyNames = iconographyMeta.map((item) => item.name)

export const iconographySelectOptions = [
  { label: 'None', value: '' },
  ...iconographyMeta.map((item) => ({ label: item.label, value: item.name })),
]

export type ButtonIconName = IconographyName
export const buttonIconNames = iconographyNames
