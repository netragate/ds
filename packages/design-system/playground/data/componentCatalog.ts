import { playgroundDemoComponents } from '../designSystemMeta'
import { PACKAGE } from './componentCatalogConstants'
import {
  getComponentCatalogEntry,
  getComponentUsage as getCatalogUsage,
} from './catalog'
import { catalogComponentCount, catalogGroups, type CatalogGroup } from './catalogGroups'
import { resolvePlaygroundDemo } from './playgroundAliases'

export { PACKAGE, getComponentCatalogEntry, catalogGroups, catalogComponentCount }
export type { ComponentCatalogEntry } from './catalog'
export type { CatalogGroup }

const playgroundSet = new Set<string>(playgroundDemoComponents)

export function hasPlaygroundDemo(name: string): boolean {
  return playgroundSet.has(resolvePlaygroundDemo(name))
}

export function playgroundDemoName(name: string): string | null {
  const demo = resolvePlaygroundDemo(name)
  return playgroundSet.has(demo) ? demo : null
}

export function getComponentUsage(name: string): string {
  const usage = getCatalogUsage(name)
  if (usage) return usage
  return `<script setup lang="ts">
import { ${name} } from '${PACKAGE}'
<\/script>

<template>
  <${name} />
</template>`
}
