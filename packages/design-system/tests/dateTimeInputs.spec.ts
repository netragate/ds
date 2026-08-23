import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'

describe('TimeInput', () => {
  it('emits HH:mm:ss for a single value', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          if (typeof value === 'string') {
            void wrapper.setProps({ modelValue: value })
          }
        },
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    const selects = wrapper.findAll('select')
    await selects[0]!.setValue('14')
    await selects[1]!.setValue('30')
    await selects[2]!.setValue('45')
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toBe('14:30:45')
    wrapper.unmount()
  })

  it('supports time range selection', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        range: true,
        modelValue: { from: '', to: '' },
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    const selects = wrapper.findAll('select')
    await selects[0]!.setValue('09')
    await selects[1]!.setValue('00')
    await selects[2]!.setValue('00')

    const endTab = wrapper.findAll('button').find((btn) => btn.text() === 'End' || btn.text() === 'Fim')
    await endTab!.trigger('click')
    const endSelects = wrapper.findAll('select')
    await endSelects[0]!.setValue('18')
    await endSelects[1]!.setValue('30')
    await endSelects[2]!.setValue('00')
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toEqual({ from: '09:00:00', to: '18:30:00' })
    wrapper.unmount()
  })
})

describe('DateInput', () => {
  it('selects a date range with two calendar clicks', async () => {
    const wrapper = mount(DateInput, {
      props: {
        range: true,
        modelValue: { from: '', to: '' },
        locale: 'en',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    const dayButtons = wrapper.findAll('div.grid.grid-cols-7.gap-1 button')
    const tenth = dayButtons.find((btn) => btn.text() === '10' && !btn.classes().join(' ').includes('muted'))
    const twelfth = dayButtons.find((btn) => btn.text() === '12' && !btn.classes().join(' ').includes('muted'))

    await tenth!.trigger('click')
    await twelfth!.trigger('click')
    await wrapper.vm.$nextTick()

    const value = wrapper.props('modelValue') as { from: string; to: string }
    expect(value.from <= value.to).toBe(true)
    expect(value.from).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(value.to).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    wrapper.unmount()
  })

  it('embeds TimeInput in range mode when showTime and range are set', async () => {
    const wrapper = mount(DateInput, {
      props: {
        range: true,
        showTime: true,
        modelValue: {
          from: { date: '2026-06-10', time: '09:00:00' },
          to: { date: '2026-06-12', time: '18:00:00' },
        },
        locale: 'en',
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    await wrapper.vm.$nextTick()

    const timeInput = wrapper.findComponent(TimeInput)
    expect(timeInput.exists()).toBe(true)
    expect(timeInput.props('range')).toBe(true)
    expect(timeInput.props('modelValue')).toEqual({ from: '09:00:00', to: '18:00:00' })
    wrapper.unmount()
  })

  it('keeps locale date formatting for single values', async () => {
    const wrapper = mount(DateInput, {
      props: {
        modelValue: '2026-06-15',
        locale: 'pt-BR',
      },
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('15/06/2026')
    wrapper.unmount()
  })
})
