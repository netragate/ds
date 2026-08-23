import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'

/** Keep calendar panel in-tree for queries (avoids Teleport → body). */
const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
  mount(DateInput, {
    ...options,
    global: {
      ...options.global,
      stubs: {
        Teleport: { template: '<div><slot /></div>' },
        ...options.global?.stubs,
      },
    },
  })

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
  it('shows two month panels in range mode', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        modelValue: { from: '2026-06-10', to: '2026-07-05' },
        locale: 'en',
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toMatch(/June 2026/i)
    expect(wrapper.text()).toMatch(/July 2026/i)
    const dayGrids = wrapper.findAll('div.grid.grid-cols-7.gap-1').filter((el) =>
      el.findAll('button').length > 0,
    )
    expect(dayGrids.length).toBeGreaterThanOrEqual(2)
    wrapper.unmount()
  })

  it('selects a date range with two calendar clicks', async () => {
    const wrapper = dateInputMount({
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

  it('rejects a second click beyond maxRangeDays', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        maxRangeDays: 3,
        modelValue: { from: '2026-06-15', to: '' },
        locale: 'en',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    await wrapper.vm.$nextTick()

    const dayButtons = () =>
      wrapper.findAll('div.grid.grid-cols-7.gap-1 button').filter((btn) => {
        const cls = btn.classes().join(' ')
        return !cls.includes('muted-foreground/40')
      })

    const start = dayButtons().find((btn) => btn.text() === '10')
    expect(start).toBeTruthy()
    await start!.trigger('click')
    await wrapper.vm.$nextTick()

    const beyond = dayButtons().find((btn) => btn.text() === '20')
    expect(beyond!.attributes('disabled')).toBeDefined()
    await beyond!.trigger('click')
    await wrapper.vm.$nextTick()
    // Draft kept; model unchanged until a valid end is chosen.
    expect(wrapper.props('modelValue')).toEqual({ from: '2026-06-15', to: '' })

    const within = dayButtons().find((btn) => btn.text() === '12' && !btn.attributes('disabled'))
    await within!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toEqual({ from: '2026-06-10', to: '2026-06-12' })
    wrapper.unmount()
  })

  it('embeds TimeInput in range mode when showTime and range are set', async () => {
    const wrapper = dateInputMount({
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

  it('keeps the range calendar open until Confirm', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        modelValue: { from: '2026-06-10', to: '2026-06-12' },
        locale: 'en',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    await wrapper.vm.$nextTick()

    const dayButtons = () =>
      wrapper.findAll('div.grid.grid-cols-7.gap-1 button').filter((btn) => {
        const cls = btn.classes().join(' ')
        return !cls.includes('muted-foreground/40')
      })

    await dayButtons().find((btn) => btn.text() === '10')!.trigger('click')
    await dayButtons().find((btn) => btn.text() === '12')!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toEqual({ from: '2026-06-10', to: '2026-06-12' })
    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('true')

    const confirm = wrapper.findAll('button').find((btn) => btn.text() === 'Confirm')
    expect(confirm).toBeTruthy()
    expect(confirm!.attributes('disabled')).toBeUndefined()
    await confirm!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button[aria-expanded]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('keeps locale date formatting for single values', async () => {
    const wrapper = dateInputMount({
      props: {
        modelValue: '2026-06-15',
        locale: 'pt-BR',
      },
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('15/06/2026')
    wrapper.unmount()
  })
})
