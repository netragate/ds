import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select from '../src/components/form/Select.vue'

describe('Select creatable', () => {
  it('shows modelValue even when it is not in options', () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Finance', value: 'Finance' }],
        modelValue: 'Custom Category',
        creatable: true,
      },
    })
    expect(wrapper.text()).toContain('Custom Category')
    wrapper.unmount()
  })

  it('emits create when choosing Create option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Finance', value: 'Finance' }],
        searchable: true,
        creatable: true,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await wrapper.vm.$nextTick()

    const input = document.body.querySelector('input') as HTMLInputElement
    expect(input).toBeTruthy()
    input.value = 'Payments'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const createBtn = Array.from(document.body.querySelectorAll('button')).find((btn) =>
      btn.textContent?.includes('Create'),
    )
    expect(createBtn).toBeTruthy()
    createBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.at(-1)?.[0]).toBe('Payments')
    wrapper.unmount()
  })
})
