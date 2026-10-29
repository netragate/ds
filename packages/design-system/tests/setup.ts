/**
 * Node 26 exposes a global localStorage getter that returns undefined unless
 * --localstorage-file is set. That shadows happy-dom's Storage and breaks
 * playground tests that call localStorage.*. Install an in-memory store.
 */
function createMemoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear() {
      map.clear()
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    key(index: number) {
      return [...map.keys()][index] ?? null
    },
    removeItem(key: string) {
      map.delete(key)
    },
    setItem(key: string, value: string) {
      map.set(String(key), String(value))
    },
  }
}

const storage = createMemoryStorage()
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  enumerable: true,
  get: () => storage,
})
