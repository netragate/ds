#!/usr/bin/env node
/**
 * Replace playground `from '@/index'` with direct component/composable imports
 * so dev does not evaluate the full design-system barrel.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgRoot = path.resolve(__dirname, '..')
const playgroundRoot = path.join(pkgRoot, 'playground')
const srcRoot = path.join(pkgRoot, 'src')

const symbolToPath = new Map()

function registerFromIndex(indexPath, prefix) {
  const source = fs.readFileSync(indexPath, 'utf8')
  const defaultRe = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*'([^']+)'/g
  let match
  while ((match = defaultRe.exec(source))) {
    const [, symbol, rel] = match
    const base = path.dirname(indexPath)
    const resolved = path.relative(srcRoot, path.resolve(base, rel)).replace(/\\/g, '/')
    symbolToPath.set(symbol, `@/${resolved}`)
  }
  const typeExportRe = /export\s+type\s+\{([^}]+)\}\s*from\s*'([^']+)'/g
  while ((match = typeExportRe.exec(source))) {
    const [, names, rel] = match
    const base = path.dirname(indexPath)
    const resolved = path.relative(srcRoot, path.resolve(base, rel)).replace(/\\/g, '/')
    for (const part of names.split(',')) {
      const symbol = part.trim()
      if (symbol) symbolToPath.set(symbol, `@/${resolved}`)
    }
  }
  const namedRe = /export\s*\{([^}]+)\}\s*from\s*'([^']+)'/g
  while ((match = namedRe.exec(source))) {
    const [, names, rel] = match
    if (/^\s*default\s+as\s/.test(names)) continue
    const base = path.dirname(indexPath)
    const resolved = path.relative(srcRoot, path.resolve(base, rel)).replace(/\\/g, '/')
    for (const part of names.split(',')) {
      const trimmed = part.trim()
      const typeMatch = trimmed.match(/^type\s+(\w+)(?:\s+as\s+(\w+))?$/)
      if (typeMatch) {
        const exportName = typeMatch[2] ?? typeMatch[1]
        symbolToPath.set(exportName, `@/${resolved}`)
        continue
      }
      const asMatch = trimmed.match(/^(\w+)(?:\s+as\s+(\w+))?$/)
      if (!asMatch) continue
      const exportName = asMatch[2] ?? asMatch[1]
      symbolToPath.set(exportName, `@/${resolved}`)
    }
  }
}

registerFromIndex(path.join(srcRoot, 'index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/form/index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/feedback/index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/data-display/index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/navigation/index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/layout/index.ts'), '')
registerFromIndex(path.join(srcRoot, 'components/overlay/index.ts'), '')

symbolToPath.set('Button', '@/components/button/Button.vue')
symbolToPath.set('IconButton', '@/components/button/IconButton.vue')
symbolToPath.set('Link', '@/components/link/Link.vue')
symbolToPath.set('useToast', '@/composables/useToast')
symbolToPath.set('DateInputModelValue', '@/lib/dateTimeTypes')
symbolToPath.set('DateRangeValue', '@/lib/dateTimeTypes')
symbolToPath.set('DateTimeRangeValue', '@/lib/dateTimeTypes')
symbolToPath.set('DateTimeValue', '@/lib/dateTimeTypes')
symbolToPath.set('TimeRangeValue', '@/lib/dateTimeTypes')
symbolToPath.set('PopoverAppearance', '@/components/overlay/overlayAppearance')
symbolToPath.set('TooltipAppearance', '@/components/overlay/overlayAppearance')

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.vue') || entry.name.endsWith('.ts')) transformFile(full)
  }
}

function transformFile(filePath) {
  let source = fs.readFileSync(filePath, 'utf8')
  if (!source.includes("@/index")) return

  source = source.replace(
    /^import\s+type\s+\{([^}]+)\}\s+from\s+'@\/index'\s*$/gm,
    (_, specifiers) => buildImport(specifiers, true),
  )
  source = source.replace(
    /^import\s+\{([^}]+)\}\s+from\s+'@\/index'\s*$/gm,
    (_, specifiers) => buildImport(specifiers, false),
  )

  fs.writeFileSync(filePath, source)
  console.log('updated', path.relative(pkgRoot, filePath))
}

function buildImport(specifiers, isTypeOnly) {
  const byPath = new Map()
  for (const raw of specifiers.split(',')) {
    const part = raw.trim()
    if (!part) continue
    const typeOnly = part.startsWith('type ')
    const cleaned = typeOnly ? part.slice(5).trim() : part
    const asMatch = cleaned.match(/^(\w+)\s+as\s+(\w+)$/)
    const symbol = asMatch ? asMatch[1] : cleaned
    const local = asMatch ? asMatch[2] : symbol
    const importPath = symbolToPath.get(symbol)
    if (!importPath) {
      throw new Error(`Unknown symbol "${symbol}" in ${specifiers}`)
    }
    const entry = { symbol, local, typeOnly: isTypeOnly || typeOnly }
    const list = byPath.get(importPath) ?? []
    list.push(entry)
    byPath.set(importPath, list)
  }

  return [...byPath.entries()]
    .map(([importPath, entries]) => {
      const onlyTypes = entries.every((e) => e.typeOnly)
      const prefix = onlyTypes ? 'import type' : 'import'
      const body = entries
        .map((e) => {
          if (e.typeOnly) return `type ${e.symbol}${e.local !== e.symbol ? ` as ${e.local}` : ''}`
          return e.local !== e.symbol ? `${e.symbol} as ${e.local}` : e.symbol
        })
        .join(', ')
      return `${prefix} { ${body} } from '${importPath}'`
    })
    .join('\n')
}

walk(playgroundRoot)
