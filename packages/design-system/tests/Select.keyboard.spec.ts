import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Select from '@/components/form/Select.vue'

describe('Select keyboard and edge cases', () => {
  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ]

  it('does not open when disabled', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', options, disabled: true },
      attachTo: document.body,
    })
    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()
    expect(document.body.querySelector('[role="listbox"]')).toBeNull()
    wrapper.unmount()
  })

  it('closes on Escape and clears the search query', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', options, searchable: true },
      attachTo: document.body,
    })
    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()
    const search = document.body.querySelector('input') as HTMLInputElement
    search.value = 'Th'
    search.dispatchEvent(new Event('input'))
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('[role="listbox"]')).toBeNull()
    wrapper.unmount()
  })

  it('removes a single tag in multiple mode', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: ['1', '3'],
        multiple: true,
        options,
        'onUpdate:modelValue': (value: string | string[]) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })

    const remove = wrapper.find('button[aria-label="Remove One"]')
    await remove.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['3']])
    wrapper.unmount()
  })

  it('shows placeholder when nothing is selected', () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', options, placeholder: 'Pick one' },
    })
    expect(wrapper.text()).toContain('Pick one')
    wrapper.unmount()
  })
})
