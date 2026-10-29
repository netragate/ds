import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TagGroup from '@/components/data-display/TagGroup.vue'
import Tag from '@/components/data-display/Tag.vue'
import List from '@/components/data-display/List.vue'
import ListItem from '@/components/data-display/ListItem.vue'
import AvatarGroup from '@/components/data-display/AvatarGroup.vue'
import ButtonGroup from '@/components/button/ButtonGroup.vue'
import Button from '@/components/button/Button.vue'

describe('TagGroup', () => {
  it('renders tags and forwards remove events', async () => {
    const wrapper = mount(TagGroup, {
      props: {
        label: 'Skills',
        tags: [
          { text: 'Vue', isRemovable: true },
          { text: 'TS', color: 'blue' },
        ],
      },
    })

    expect(wrapper.attributes('role')).toBe('list')
    expect(wrapper.attributes('aria-label')).toBe('Skills')
    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.text()).toContain('TS')

    const removable = wrapper.findAllComponents(Tag).find((tag) => tag.props('text') === 'Vue')
    expect(removable?.attributes('role')).toBe('listitem')
    await removable!.find('button').trigger('click')
    expect(wrapper.emitted('remove')?.[0]).toEqual(['Vue'])
  })
})

describe('List', () => {
  it('renders nested list items', () => {
    const wrapper = mount(List, {
      slots: {
        default: `
          <li class="item">One</li>
        `,
      },
    })
    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.text()).toContain('One')
  })

  it('ListItem renders content', () => {
    const wrapper = mount(ListItem, { slots: { default: 'Row' } })
    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.text()).toBe('Row')
  })
})

describe('AvatarGroup', () => {
  it('shows overflow when members exceed max', () => {
    const wrapper = mount(AvatarGroup, {
      props: {
        max: 2,
        size: 'sm',
        members: [{ name: 'Ada' }, { name: 'Grace' }, { name: 'Alan' }],
      },
    })
    expect(wrapper.text()).toContain('+1')
  })

  it('hides overflow when within max', () => {
    const wrapper = mount(AvatarGroup, {
      props: {
        members: [{ name: 'Ada' }, { name: 'Grace' }],
      },
    })
    expect(wrapper.text()).not.toMatch(/\+\d/)
  })
})

describe('ButtonGroup', () => {
  it('exposes accessible label and renders buttons', () => {
    const wrapper = mount(ButtonGroup, {
      props: { label: 'Actions' },
      slots: {
        default: '<button type="button">A</button><button type="button">B</button>',
      },
    })
    expect(wrapper.attributes('aria-label')).toBe('Actions')
    expect(wrapper.findAll('button')).toHaveLength(2)
  })

  it('works with Button children', () => {
    const wrapper = mount(ButtonGroup, {
      global: { components: { Button } },
      slots: { default: '<Button>Save</Button>' },
    })
    expect(wrapper.text()).toContain('Save')
  })
})
