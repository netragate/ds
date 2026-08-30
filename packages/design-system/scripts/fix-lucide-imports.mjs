#!/usr/bin/env node
/**
 * Replace barrel `from '@lucide/vue'` with per-icon ESM paths so Vite
 * does not load lucide-vue.mjs (which re-exports every icon).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgRoot = path.resolve(__dirname, '..')

function resolveLucideMain() {
  const candidates = [
    path.join(pkgRoot, 'node_modules/@lucide/vue/dist/esm/lucide-vue.mjs'),
    path.resolve(pkgRoot, '../../node_modules/@lucide/vue/dist/esm/lucide-vue.mjs'),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error('@lucide/vue not found. Run npm install first.')
}

function buildNameToFile(lucideMainSource) {
  const lineRe = /export\s*\{([^}]+)\}\s*from\s*'\.\/icons\/([^']+)\.mjs'/g
  const nameToFile = new Map()
  let match
  while ((match = lineRe.exec(lucideMainSource))) {
    const file = match[2]
    const nameRe = /default as (\w+)/g
    let nameMatch
    while ((nameMatch = nameRe.exec(match[1]))) {
      if (!nameToFile.has(nameMatch[1])) {
        nameToFile.set(nameMatch[1], file)
      }
    }
  }
  return nameToFile
}

const nameToFile = buildNameToFile(fs.readFileSync(resolveLucideMain(), 'utf8'))

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
      walk(full, out)
    } else if (entry.isFile() && /\.(vue|ts)$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

function transformFile(filePath) {
  let source = fs.readFileSync(filePath, 'utf8')
  if (!source.includes("@lucide/vue'") && !source.includes('@lucide/vue"')) return false

  const importRe = /import\s*\{([^}]*)\}\s*from\s*['"]@lucide\/vue['"]\s*;?/g
  let changed = false

  source = source.replace(importRe, (_, specifiers) => {
    const symbols = specifiers
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)

    const lines = symbols.map((symbol) => {
      const file = nameToFile.get(symbol)
      if (!file) {
        throw new Error(`Unknown lucide icon "${symbol}" in ${filePath}`)
      }
      return `import ${symbol} from '@lucide/vue/dist/esm/icons/${file}.mjs'`
    })

    changed = true
    return `${lines.join('\n')}\n`
  })

  if (changed) {
    fs.writeFileSync(filePath, source)
    console.log('updated', path.relative(pkgRoot, filePath))
  }
  return changed
}

const roots = [
  path.join(pkgRoot, 'src'),
  path.join(pkgRoot, 'playground'),
]

let count = 0
for (const root of roots) {
  if (!fs.existsSync(root)) continue
  for (const file of walk(root)) {
    if (transformFile(file)) count++
  }
}

console.log(`Done — ${count} file(s) updated.`)
