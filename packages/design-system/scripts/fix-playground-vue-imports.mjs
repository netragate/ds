#!/usr/bin/env node
/** Fix `import { Foo } from '@/components/.../*.vue'` → default imports. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const playgroundRoot = path.join(path.resolve(__dirname, '..'), 'playground')

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name.endsWith('.vue') || entry.name.endsWith('.ts')) out.push(full)
  }
  return out
}

function transform(source) {
  return source.replace(
    /^import\s+\{([^}]+)\}\s+from\s+'(@\/components\/[^']+\.vue)'\s*$/gm,
    (_, specifiers, importPath) => {
      const parts = specifiers.split(',').map((part) => part.trim()).filter(Boolean)
      const valueImports = []
      const typeImports = []

      for (const part of parts) {
        if (part.startsWith('type ')) {
          typeImports.push(part.slice(5).trim())
        } else {
          valueImports.push(part)
        }
      }

      const lines = []
      for (const symbol of valueImports) {
        lines.push(`import ${symbol} from '${importPath}'`)
      }
      if (typeImports.length > 0) {
        lines.push(`import type { ${typeImports.join(', ')} } from '${importPath}'`)
      }
      return lines.join('\n')
    },
  )
}

let count = 0
for (const file of walk(playgroundRoot)) {
  const source = fs.readFileSync(file, 'utf8')
  const next = transform(source)
  if (next !== source) {
    fs.writeFileSync(file, next)
    count++
    console.log('updated', path.relative(playgroundRoot, file))
  }
}

console.log(`Done — ${count} file(s) updated.`)
