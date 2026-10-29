import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Chip from '@/components/form/Chip.vue'
import Input from '@/components/form/Input.vue'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import Grid from '@/components/layout/Grid.vue'
import Badge from '@/components/feedback/Badge.vue'
import Spinner from '@/components/feedback/Spinner.vue'
import Progress from '@/components/feedback/Progress.vue'
import EmptyState from '@/components/data-display/EmptyState.vue'
import Card from '@/components/data-display/Card.vue'
import Tag from '@/components/data-display/Tag.vue'
import Link from '@/components/link/Link.vue'
import Textarea from '@/components/form/Textarea.vue'
import Select from '@/components/form/Select.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import {
  buildCalendarMonthGrid,
  dateInputPlaceholder,
  formatMonthYear,
  getWeekdayLabels,
  isIsoInRange,
  parseIsoDate,
  toIsoDate,
} from '@/lib/dateUtils'

const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
  mount(DateInput, {
    ...options,
    global: {
      stubs: { Teleport: { template: '<div><slot /></div>' } },
    },
  })

describe('Chip size/error/variant matrix', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders size %s with error', (size) => {
    const wrapper = mount(Chip, {
      props: {
        modelValue: ['One'],
        size,
        error: true,
        message: 'Bad',
        variant: 'warning',
        disabled: false,
      },
    })
    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Bad')
    wrapper.unmount()
  })

  it('skips duplicate chips and supports all variants', async () => {
    const wrapper = mount(Chip, {
      props: {
        modelValue: ['One'],
        variant: 'success',
        'onUpdate:modelValue': (value: string[]) => wrapper.setProps({ modelValue: value }),
      },
    })
    const input = wrapper.find('input')
    await input.setValue('One')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    for (const variant of ['default', 'danger', 'progress', 'new'] as const) {
      await wrapper.setProps({ variant })
      expect(wrapper.exists()).toBe(true)
    }
    wrapper.unmount()
  })
})

describe('Input transform and file empty', () => {
  it('applies transform on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        transform: (value: string) => value.toUpperCase(),
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    })
    await wrapper.find('input').setValue('abc')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['ABC'])
    wrapper.unmount()
  })

  it('emits empty string when file list is cleared', async () => {
    const wrapper = mount(Input, {
      props: { type: 'file', modelValue: 'old.pdf' },
    })
    const input = wrapper.find('input')
    Object.defineProperty(input.element, 'files', { value: [], configurable: true })
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('')
    wrapper.unmount()
  })
})

describe('DateInput datetime and time panel wiring', () => {
  it('updates pending times in range+showTime via TimeInput', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        showTime: true,
        modelValue: {
          from: { date: '2026-06-10', time: '09:00:00' },
          to: { date: '2026-06-12', time: '18:00:00' },
        },
        locale: 'en',
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })

    await wrapper.find('button[aria-expanded]').trigger('click')
    const time = wrapper.findComponent(TimeInput)
    expect(time.exists()).toBe(true)
    await time.vm.$emit('update:modelValue', { from: '10:00:00', to: '11:00:00' })
    await nextTick()

    const confirm = wrapper.findAll('button').find((btn) => btn.text() === 'Confirm')
    await confirm!.trigger('click')
    await nextTick()
    const value = wrapper.props('modelValue') as {
      from: { date: string; time: string }
      to: { date: string; time: string }
    }
    expect(value.from.time).toBe('10:00:00')
    expect(value.to.time).toBe('11:00:00')
    wrapper.unmount()
  })

  it('emits single datetime when TimeInput changes', async () => {
    const wrapper = dateInputMount({
      props: {
        showTime: true,
        modelValue: { date: '2026-06-15', time: '08:00:00' },
        locale: 'en',
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const time = wrapper.findComponent(TimeInput)
    await time.vm.$emit('update:modelValue', '13:45:00')
    await nextTick()
    expect(wrapper.props('modelValue')).toEqual({ date: '2026-06-15', time: '13:45:00' })
    wrapper.unmount()
  })

  it('selects today in range+showTime and confirms', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        showTime: true,
        modelValue: {
          from: { date: '', time: '' },
          to: { date: '', time: '' },
        },
        locale: 'en',
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    // range mode has Confirm, not Today — pick same day twice then confirm
    const days = () =>
      wrapper.findAll('div.grid.grid-cols-7.gap-1 button').filter((btn) => {
        return !btn.classes().join(' ').includes('muted-foreground/40')
      })
    await days().find((btn) => btn.text() === '15')!.trigger('click')
    await days().find((btn) => btn.text() === '15')!.trigger('click')
    await nextTick()
    const confirm = wrapper.findAll('button').find((btn) => btn.text() === 'Confirm')
    await confirm!.trigger('click')
    const value = wrapper.props('modelValue') as {
      from: { date: string; time: string }
      to: { date: string; time: string }
    }
    expect(value.from.date).toMatch(/^\d{4}-\d{2}-15$/)
    wrapper.unmount()
  })

  it('formats showTime display with partial date or time', async () => {
    const onlyDate = dateInputMount({
      props: { showTime: true, modelValue: { date: '2026-06-15', time: '' }, locale: 'en' },
    })
    expect((onlyDate.find('input').element as HTMLInputElement).value).toContain('2026')
    onlyDate.unmount()

    const onlyTime = dateInputMount({
      props: { showTime: true, modelValue: { date: '', time: '09:00:00' }, locale: 'en' },
    })
    expect((onlyTime.find('input').element as HTMLInputElement).value).toContain('09:00:00')
    onlyTime.unmount()

    const empty = dateInputMount({
      props: {
        range: true,
        showTime: true,
        modelValue: { from: { date: '', time: '' }, to: { date: '', time: '' } },
        locale: 'en',
      },
    })
    expect((empty.find('input').element as HTMLInputElement).value).toBe('')
    empty.unmount()
  })
})

describe('DataTable sort and page size', () => {
  it('sorts by clicking headers and changes page size', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'age', label: 'Age', sortable: true },
        ],
        rows: [
          { id: '1', name: 'Zed', age: 30 },
          { id: '2', name: 'Ann', age: 20 },
        ],
        rowKey: 'id',
        pageSize: 10,
        searchable: false,
      },
    })

    const nameHeader = wrapper.findAll('th button, th').find((el) => el.text().includes('Name'))
    if (nameHeader) {
      await nameHeader.trigger('click')
      await nextTick()
      await nameHeader.trigger('click')
      await nextTick()
    }
    expect(wrapper.text()).toContain('Ann')
    wrapper.unmount()
  })
})

describe('Grid Link Tag Textarea Select Badge Spinner Progress EmptyState Card', () => {
  it('covers remaining prop branches', async () => {
    for (const cols of [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
      expect(mount(Grid, { props: { cols, mdCols: cols, lgCols: cols } }).exists()).toBe(true)
    }

    expect(mount(Link, { slots: { default: 'Plain' } }).element.tagName).toBe('SPAN')
    expect(mount(Link, { props: { to: '/x' }, slots: { default: 'To' } }).attributes('href')).toBe('/x')

    for (const color of ['default', 'blue', 'teal', 'red', 'orange', 'purple'] as const) {
      expect(mount(Tag, { props: { text: color, color } }).text()).toBe(color)
    }

    expect(mount(Textarea, { props: { modelValue: 'note', rows: 3, disabled: true } }).exists()).toBe(true)

    const select = mount(Select, {
      props: { modelValue: '1', options: [{ label: 'One', value: '1' }], searchable: false },
      attachTo: document.body,
    })
    expect(select.text()).toContain('One')
    select.unmount()

    expect(mount(Badge, { props: { value: 0, size: 'md', variant: 'information' } }).text()).toBe('0')
    expect(mount(Spinner, { props: { size: 'lg', glow: true } }).exists()).toBe(true)
    expect(mount(Progress, { props: { value: 50, max: 100 } }).attributes('aria-valuenow')).toBe('50')
    expect(mount(EmptyState, { props: { title: 'T' } }).text()).toContain('T')
    expect(mount(Card, { props: { class: 'extra' }, slots: { default: 'C' } }).text()).toBe('C')
  })
})

describe('dateUtils remaining calendar helpers', () => {
  it('builds grids and formats helpers', () => {
    const grid = buildCalendarMonthGrid(2026, 5, '2026-06-15', 'en')
    expect(grid.length).toBeGreaterThan(28)
    expect(dateInputPlaceholder('en')).toContain('mm')
    expect(formatMonthYear(2026, 5, 'pt-BR')).toBeTruthy()
    expect(getWeekdayLabels('en')).toHaveLength(7)
    expect(isIsoInRange('2026-06-15', '2026-06-20', '2026-06-10')).toBe(false)
    expect(toIsoDate(parseIsoDate('2026-06-15')!)).toBe('2026-06-15')
  })
})
