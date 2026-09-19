import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '@/components/form/Input.vue'
import Textarea from '@/components/form/Textarea.vue'

describe('Input', () => {
  it('binds model value', async () => {
    const wrapper = mount(Input, { props: { modelValue: 'hello' } })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')
    await input.setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
  })

  it('shows error message', () => {
    const wrapper = mount(Input, {
      props: { error: true, message: 'Required' },
    })
    expect(wrapper.text()).toContain('Required')
  })

  it('renders type=file with design-system chrome and file attributes', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'file',
        accept: '.pdf,image/*',
        multiple: true,
      },
    })
    const input = wrapper.find('input')
    const el = input.element as HTMLInputElement
    expect(el.type).toBe('file')
    expect(el.accept).toBe('.pdf,image/*')
    expect(el.multiple).toBe(true)
    const className = input.attributes('class') ?? ''
    expect(className).toContain('bg-input-background')
    expect(className).toContain('border')
    expect(className).toContain('file:bg-muted')
    expect(className).toContain('file:border-border')
  })

  it('emits filename via update:modelValue and change on file selection', async () => {
    const wrapper = mount(Input, { props: { type: 'file', modelValue: '' } })
    const input = wrapper.find('input')
    const file = new File(['hello'], 'report.pdf', { type: 'application/pdf' })
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true,
    })
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('report.pdf')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})

describe('Textarea', () => {
  it('binds model value', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'note' } })
    const textarea = wrapper.find('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('note')
  })

  it('passes rows to the textarea element', () => {
    const wrapper = mount(Textarea, { props: { rows: 6 } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).getAttribute('rows')).toBe('6')
  })
})
