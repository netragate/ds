import { describe, expect, it } from 'vitest'
import { catalogComponentCount, catalogGroups } from '../playground/data/catalogGroups'
import {
  designSystemLibraryComponentCount,
  playgroundDemoComponentCount,
  playgroundDemoComponents,
} from '../playground/designSystemMeta'

describe('playground counts', () => {
  it('Library component count matches catalogGroups (TimeInput included)', () => {
    expect(catalogGroups.some((g) => g.items.includes('TimeInput'))).toBe(true)
    expect(catalogComponentCount).toBe(63)
    expect(designSystemLibraryComponentCount).toBe(catalogComponentCount)
  })

  it('interactive demo count includes TimeInput', () => {
    expect(playgroundDemoComponents).toContain('TimeInput')
    expect(playgroundDemoComponentCount).toBe(38)
    expect(playgroundDemoComponentCount).toBe(playgroundDemoComponents.length)
  })
})
