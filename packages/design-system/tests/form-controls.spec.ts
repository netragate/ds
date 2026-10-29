import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Checkbox from '@/components/form/Checkbox.vue'
import RadioGroup from '@/components/form/RadioGroup.vue'
import Radio from '@/components/form/Radio.vue'
import Switch from '@/components/form/Switch.vue'
import Select from '@/components/form/Select.vue'
import FormField from '@/components/form/FormField.vue'
import Input from '@/components/form/Input.vue'
import Chip from '@/components/form/Chip.vue'
import Label from '@/components/form/Label.vue'
import Toggle from '@/components/form/Toggle.vue'

describe('Checkbox', () => {
  it('toggles value', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('cycles indeterminate to checked to unchecked', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, indeterminate: true },
    })

    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted('update:indeterminate')?.[0]).toEqual([false])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    await wrapper.setProps({ modelValue: true, indeterminate: false })
    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('returns to indeterminate when cycleIndeterminate is enabled', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true, indeterminate: false, cycleIndeterminate: true },
    })

    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('update:indeterminate')?.[0]).toEqual([true])
  })

  it('renders indeterminate dash', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, indeterminate: true, label: 'Partial' },
    })
    expect(wrapper.text()).toContain('Partial')
    expect(wrapper.find('rect').exists()).toBe(true)
    expect(wrapper.find('path').exists()).toBe(false)
  })
})

describe('RadioGroup', () => {
  it('renders radio inputs', () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: 'a', name: 'group' },
      slots: { default: '<input type="radio" />' },
    })
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
  })

  it('updates model through Radio children', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'a',
        name: 'choice',
        'onUpdate:modelValue': (value: string | number) => wrapper.setProps({ modelValue: value }),
      },
      slots: {
        default: `
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        `,
      },
      global: { components: { Radio } },
    })

    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios).toHaveLength(2)
    await radios[1]!.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})

describe('Radio', () => {
  it('emits update when used standalone', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'x', value: 'y', name: 'solo' },
      slots: { default: 'Y' },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['y'])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'x', value: 'y', disabled: true },
    })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('Label', () => {
  it('associates with a control via for', () => {
    const wrapper = mount(Label, {
      props: { for: 'email' },
      slots: { default: 'Email' },
    })
    expect(wrapper.attributes('for')).toBe('email')
    expect(wrapper.text()).toBe('Email')
  })
})

describe('Toggle', () => {
  it('toggles boolean model through Switch', async () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Notifications',
        'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
      },
    })
    expect(wrapper.text()).toContain('Notifications')
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('respects disabled', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false, disabled: true },
      slots: { default: 'Off' },
    })
    expect(wrapper.find('[role="switch"]').attributes('disabled')).toBeDefined()
  })
})

describe('Switch', () => {
  it('has switch role', () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
  })
})

describe('Select', () => {
  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ]

  it('opens custom dropdown and selects option', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', options },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()

    expect(document.body.querySelector('[role="listbox"]')).toBeTruthy()

    const optionButtons = document.body.querySelectorAll('[role="option"]')
    expect(optionButtons).toHaveLength(2)
    ;(optionButtons[0] as HTMLButtonElement).click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    wrapper.unmount()
  })

  it('filters options when searching', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', options },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()

    const search = document.body.querySelector('input[placeholder="Search..."]') as HTMLInputElement
    search.value = 'Two'
    search.dispatchEvent(new Event('input'))
    await nextTick()

    expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(1)
    expect(document.body.querySelector('[role="option"]')?.textContent).toContain('Two')
    wrapper.unmount()
  })

  it('supports multiple selection with tags', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: ['1'],
        multiple: true,
        options,
      },
      attachTo: document.body,
    })

    expect(wrapper.text()).toContain('One')

    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()

    const optionsEls = document.body.querySelectorAll('[role="option"]')
    expect(optionsEls).toHaveLength(2)
    ;(optionsEls[1] as HTMLButtonElement).click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1', '2']])

    wrapper.unmount()
  })

  it('clears all selected tags in multi mode', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: ['1', '2'],
        multiple: true,
        options,
      },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()

    const clearButton = Array.from(document.body.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === 'Clear all',
    )
    expect(clearButton).toBeTruthy()
    clearButton!.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])

    wrapper.unmount()
  })
})

describe('FormField', () => {
  it('renders label text', () => {
    const wrapper = mount(FormField, {
      props: { label: 'Email', helper: 'Required field' },
      slots: { default: '<input />' },
    })
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Required field')
  })
})

describe('Chip', () => {
  it('adds chip on enter key', async () => {
    const wrapper = mount(Chip, { props: { modelValue: [] } })
    const input = wrapper.find('input')
    
    await input.setValue('React')
    await input.trigger('keyup.enter')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['React']])
  })

  it('removes chip on button click', async () => {
    const wrapper = mount(Chip, { props: { modelValue: ['Vue', 'React'] } })
    const buttons = wrapper.findAll('button')
    
    await buttons[0].trigger('click')
    
    const emitted = wrapper.emitted('update:modelValue')?.[0]
    expect(emitted).toEqual([['React']])
  })

  it('removes last chip on backspace with empty input', async () => {
    const wrapper = mount(Chip, { props: { modelValue: ['Vue'] } })
    const input = wrapper.find('input')
    
    await input.trigger('keydown', { key: 'Backspace' })
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })
})
