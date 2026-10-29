import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Text from '@/components/typography/Text.vue'
import Heading from '@/components/typography/Heading.vue'

describe('Text', () => {
  it('renders as span by default with medium size', () => {
    const wrapper = mount(Text, { slots: { default: 'Hello' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('Hello')
    expect((wrapper.element as HTMLElement).style.fontSize).toContain('--ds-font-size-medium')
  })

  it('renders as paragraph with block display', () => {
    const wrapper = mount(Text, {
      props: { as: 'p', size: 'large', weight: 'bold', color: 'danger' },
      slots: { default: 'Paragraph' },
    })
    expect(wrapper.element.tagName).toBe('P')
    const style = (wrapper.element as HTMLElement).style
    expect(style.display).toBe('block')
    expect(style.fontSize).toContain('--ds-font-size-base')
    expect(style.fontWeight).toContain('--ds-font-weight-bold')
    expect(style.color).toContain('--ds-color-text-danger')
  })

  it('applies subtle and small variants', () => {
    const wrapper = mount(Text, {
      props: { size: 'xsmall', weight: 'semibold', color: 'subtle' },
      slots: { default: 'Hint' },
    })
    const style = (wrapper.element as HTMLElement).style
    expect(style.fontSize).toContain('--ds-font-size-xsmall')
    expect(style.color).toContain('--ds-color-text-subtle')
    expect(style.fontWeight).toContain('--ds-font-weight-semibold')
  })
})

describe('Heading smoke', () => {
  it('renders level 2', () => {
    const wrapper = mount(Heading, {
      props: { level: 2 },
      slots: { default: 'Section' },
    })
    expect(wrapper.element.tagName).toBe('H2')
  })
})
