/** Treat `/` like `.` so route paths can drive menu ids. */
export function normalizeMenuId(id: string): string {
  return id.replace(/\/+/g, '.').replace(/^\.+|\.+$/g, '')
}

export function menuIdsEqual(a: string, b: string): boolean {
  return normalizeMenuId(a) === normalizeMenuId(b)
}

export function parentMenuKey(id: string): string | null {
  const normalized = normalizeMenuId(id)
  const lastDot = normalized.lastIndexOf('.')

  return lastDot === -1 ? null : normalized.slice(0, lastDot)
}

export function isDescendantMenuKey(key: string, ancestor: string): boolean {
  const normalizedKey = normalizeMenuId(key)
  const normalizedAncestor = normalizeMenuId(ancestor)

  return (
    normalizedKey !== normalizedAncestor
    && normalizedKey.startsWith(`${normalizedAncestor}.`)
  )
}

/** Group ids that must be open to reveal `activeId` (excludes leaf ids). */
export function ancestorMenuKeys(activeId: string): string[] {
  if (!activeId) {
    return []
  }

  const keys: string[] = []
  let current = normalizeMenuId(activeId)

  while (true) {
    const parent = parentMenuKey(current)

    if (!parent) {
      break
    }

    keys.unshift(parent)
    current = parent
  }

  return keys
}

export function openKeysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((key, index) => menuIdsEqual(key, b[index]!))
}

/**
 * On reload / first bind: openKeys become exactly the active page ancestors.
 */
export function replaceOpenKeysForActiveId(activeId: string): string[] {
  return ancestorMenuKeys(activeId)
}

/**
 * When selecting a page: ensure ancestor groups are open without collapsing
 * unrelated expansions. Opening a missing ancestor still runs sibling accordion.
 */
export function ensureOpenKeysForActiveId(
  currentOpenKeys: string[],
  activeId: string,
): string[] {
  const ancestors = ancestorMenuKeys(activeId)

  if (ancestors.length === 0) {
    return currentOpenKeys
  }

  let next = [...currentOpenKeys]

  for (const ancestor of ancestors) {
    if (!next.some((key) => menuIdsEqual(key, ancestor))) {
      next = accordionOpenKeys(next, ancestor)
    }
  }

  return next
}

export function accordionOpenKeys(currentOpenKeys: string[], key: string): string[] {
  const normalizedKey = normalizeMenuId(key)

  if (currentOpenKeys.some((item) => menuIdsEqual(item, normalizedKey))) {
    return currentOpenKeys.filter(
      (item) =>
        !menuIdsEqual(item, normalizedKey) && !isDescendantMenuKey(item, normalizedKey),
    )
  }

  const targetParent = parentMenuKey(normalizedKey)
  const siblingsToClose = currentOpenKeys.filter(
    (item) => parentMenuKey(item) === targetParent && !menuIdsEqual(item, normalizedKey),
  )
  const keysToRemove = new Set<string>()

  for (const sibling of siblingsToClose) {
    keysToRemove.add(sibling)

    for (const item of currentOpenKeys) {
      if (isDescendantMenuKey(item, sibling)) {
        keysToRemove.add(item)
      }
    }
  }

  return [
    ...currentOpenKeys.filter((item) => !keysToRemove.has(item)),
    normalizedKey,
  ]
}
