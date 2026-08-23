import { describe, expect, it } from 'vitest'
import {
  accordionOpenKeys,
  ancestorMenuKeys,
  ensureOpenKeysForActiveId,
  isDescendantMenuKey,
  menuIdsEqual,
  normalizeMenuId,
  parentMenuKey,
} from '@/components/navigation/sidebarMenuOpenKeys'

describe('sidebarMenuOpenKeys', () => {
  it('derives parent and ancestor keys from dotted ids', () => {
    expect(parentMenuKey('dashboard')).toBeNull()
    expect(parentMenuKey('components.forms.input')).toBe('components.forms')
    expect(ancestorMenuKeys('components.forms.input')).toEqual(['components', 'components.forms'])
    expect(ancestorMenuKeys('dashboard')).toEqual([])
  })

  it('treats route-style slash paths as hierarchy', () => {
    expect(normalizeMenuId('components/forms/input')).toBe('components.forms.input')
    expect(menuIdsEqual('components/forms/input', 'components.forms.input')).toBe(true)
    expect(ancestorMenuKeys('components/forms/input')).toEqual(['components', 'components.forms'])
  })

  it('detects descendant keys', () => {
    expect(isDescendantMenuKey('components.forms', 'components')).toBe(true)
    expect(isDescendantMenuKey('components', 'components.forms')).toBe(false)
  })

  it('closes siblings and their branches when opening a group', () => {
    expect(
      accordionOpenKeys(['components', 'components.forms'], 'foundations'),
    ).toEqual(['foundations'])

    expect(
      accordionOpenKeys(['components', 'components.forms'], 'components.feedback'),
    ).toEqual(['components', 'components.feedback'])
  })

  it('closes a group and its descendants when toggled shut', () => {
    expect(
      accordionOpenKeys(['components', 'components.forms'], 'components'),
    ).toEqual([])
  })

  it('ensureOpenKeysForActiveId opens missing ancestors without dropping others', () => {
    expect(
      ensureOpenKeysForActiveId(['components', 'components.forms'], 'components.overview'),
    ).toEqual(['components', 'components.forms'])

    expect(
      ensureOpenKeysForActiveId(['components'], 'foundations.colors'),
    ).toEqual(['foundations'])
  })
})
