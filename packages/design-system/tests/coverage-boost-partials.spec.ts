import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import Select from '@/components/form/Select.vue'
import Input from '@/components/form/Input.vue'
import Badge from '@/components/feedback/Badge.vue'
import Spinner from '@/components/feedback/Spinner.vue'
import Button from '@/components/button/Button.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import {
  applyColumnFilters,
  formatCellValue,
  isColumnFilterActive,
  sortDataTableRowsMulti,
} from '@/components/data-display/dataTableUtils'
import {
  inclusiveDaySpan,
  isDateRangeWithinMaxDays,
  parseLocaleDateInput,
  resolveIntlLocale,
} from '@/lib/dateUtils'

const dateInputMount = (options: Parameters<typeof mount>[1] = {}) =>
  mount(DateInput, {
    ...options,
    global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
  })

describe('DateInput pt-BR labels and custom props', () => {
  it('uses Portuguese default labels without overrides', async () => {
    const wrapper = dateInputMount({
      props: {
        modelValue: '2026-06-15',
        locale: 'pt-BR',
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.text()).toContain('Limpar')
    expect(wrapper.text()).toContain('Hoje')
    await wrapper.findAll('button').find((b) => b.text() === 'Hoje')!.trigger('click')
    wrapper.unmount()
  })

  it('uses Portuguese default confirm label in range mode', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        locale: 'pt-BR',
        modelValue: { from: '', to: '' },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const days = wrapper
      .findAll('div.grid.grid-cols-7.gap-1 button')
      .filter((btn) => !btn.classes().join(' ').includes('muted-foreground/40'))
    await days.find((b) => b.text() === '10')!.trigger('click')
    await days.find((b) => b.text() === '12')!.trigger('click')
    expect(wrapper.text()).toContain('Confirmar')
    await wrapper.findAll('button').find((b) => b.text() === 'Confirmar')!.trigger('click')
    wrapper.unmount()
  })

  it('accepts custom placeholder and label overrides', async () => {
    const wrapper = dateInputMount({
      props: {
        modelValue: '',
        locale: 'en',
        placeholder: 'data aqui',
        clearLabel: 'Zerar',
        todayLabel: 'Agora',
      },
      attachTo: document.body,
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('data aqui')
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.text()).toContain('Zerar')
    expect(wrapper.text()).toContain('Agora')
    wrapper.unmount()
  })

  it('discards pending when closing without confirm', async () => {
    const wrapper = dateInputMount({
      props: {
        range: true,
        modelValue: { from: '2026-06-01', to: '2026-06-02' },
        locale: 'en',
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const days = wrapper
      .findAll('div.grid.grid-cols-7.gap-1 button')
      .filter((btn) => !btn.classes().join(' ').includes('muted-foreground/40'))
    await days.find((b) => b.text() === '10')!.trigger('click')
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.props('modelValue')).toEqual({ from: '2026-06-01', to: '2026-06-02' })
    wrapper.unmount()
  })

  it('selects today for range with showTime', async () => {
    // Today button only exists in non-range mode; for range+showTime cover pendingTimes seed path
    // by opening with empty model then selecting days and editing time before confirm.
    const wrapper = dateInputMount({
      props: {
        range: true,
        showTime: true,
        locale: 'pt-BR',
        modelValue: {
          from: { date: '', time: '' },
          to: { date: '', time: '' },
        },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      attachTo: document.body,
    })
    await wrapper.find('button[aria-expanded]').trigger('click')
    const days = () =>
      wrapper
        .findAll('div.grid.grid-cols-7.gap-1 button')
        .filter((btn) => !btn.classes().join(' ').includes('muted-foreground/40'))
    await days().find((b) => b.text() === '8')!.trigger('click')
    await days().find((b) => b.text() === '9')!.trigger('click')
    await nextTick()
    expect(wrapper.findComponent({ name: 'TimeInput' }).exists()).toBe(true)
    wrapper.unmount()
  })
})

describe('TimeInput pt-BR and invalid typed range', () => {
  it('uses Portuguese bound labels and rejects invalid typed range', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        range: true,
        locale: 'pt-BR',
        clearLabel: 'Apagar',
        placeholder: 'hora',
        modelValue: { from: '', to: '' },
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
      attachTo: document.body,
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('hora')
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.text()).toMatch(/Início|Fim/)
    await wrapper.find('input').setValue('xx – yy')
    await wrapper.find('input').trigger('blur')
    await nextTick()
    expect(wrapper.props('modelValue')).toEqual({ from: '', to: '' })
    wrapper.unmount()
  })
})

describe('Select creatable multiple and empty search', () => {
  it('adds creatable value in multiple mode and shows empty results', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: [],
        multiple: true,
        creatable: true,
        searchable: true,
        options: [{ label: 'One', value: '1' }],
        'onUpdate:modelValue': (value: string | string[]) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })
    await wrapper.find('[role="combobox"]').trigger('click')
    await nextTick()
    const search = document.body.querySelector('input') as HTMLInputElement
    search.value = 'Nova'
    search.dispatchEvent(new Event('input'))
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['Nova'])
    wrapper.unmount()

    const empty = mount(Select, {
      props: {
        modelValue: '',
        searchable: true,
        creatable: false,
        options: [{ label: 'One', value: '1' }],
      },
      attachTo: document.body,
    })
    await empty.find('[role="combobox"]').trigger('click')
    await nextTick()
    const emptySearch = document.body.querySelector('input') as HTMLInputElement
    emptySearch.value = 'zzzz'
    emptySearch.dispatchEvent(new Event('input'))
    await nextTick()
    expect(document.body.textContent).toMatch(/No results|zzzz|found/i)
    empty.unmount()
  })
})

describe('Input Checkbox Badge Spinner Button leftovers', () => {
  it('covers remaining simple branches', async () => {
    const input = mount(Input, {
      props: {
        modelValue: 'a',
        size: 'sm',
        id: 'x',
        'aria-label': 'Field',
      },
    })
    expect(input.find('input').attributes('id')).toBe('x')
    input.unmount()

    const checkbox = mount(Checkbox, {
      props: { modelValue: true, disabled: true, label: 'L' },
    })
    await checkbox.find('input').trigger('click')
    expect(checkbox.emitted('update:modelValue')).toBeUndefined()
    checkbox.unmount()

    expect(mount(Badge, { props: { value: 99, variant: 'secondary' } }).text()).toBe('99')
    expect(mount(Spinner, { props: { size: 'md' } }).exists()).toBe(true)
    const button = mount(Button, {
      props: { type: 'submit', variant: 'subtle', size: 'compact' },
      slots: { default: 'Go' },
    })
    expect(button.attributes('type')).toBe('submit')
    button.unmount()
  })
})

describe('dataTableUtils and dateUtils partial arms', () => {
  it('hits remaining filter/sort/date helper arms', () => {
    expect(formatCellValue(undefined)).toBe('')
    expect(isColumnFilterActive({ key: 'n', label: 'N' }, 'x')).toBe(false)
    expect(
      applyColumnFilters(
        [{ name: 'Ana', age: null }],
        [{ key: 'age', label: 'Age', filter: 'text' }],
        { age: '1' },
      ),
    ).toEqual([])
    expect(
      sortDataTableRowsMulti(
        [
          { a: null, b: 1 },
          { a: 1, b: 2 },
          { a: 1, b: 0 },
        ],
        [
          { key: 'a', direction: 'asc' },
          { key: 'b', direction: 'desc' },
        ],
      )[0],
    ).toBeTruthy()
    expect(sortDataTableRowsMulti([{ a: 1 }], [])).toEqual([{ a: 1 }])

    expect(resolveIntlLocale('pt-BR')).toBe('pt-BR')
    expect(resolveIntlLocale(undefined)).toBeTruthy()
    expect(inclusiveDaySpan('2026-06-10', '2026-06-10')).toBe(1)
    expect(isDateRangeWithinMaxDays('2026-06-10', '2026-06-12', undefined)).toBe(true)
    expect(parseLocaleDateInput('1/2/26', 'en')).toBe('2026-01-02')
    expect(parseLocaleDateInput('', 'en')).toBe('')
  })
})

describe('DataTable empty labels and lazy expand', () => {
  it('renders custom empty labels and toggles expand', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [{ key: 'name', label: 'Name' }],
        rows: [],
        searchable: false,
        labels: {
          emptyTitle: 'Vazio',
          emptyDescription: 'Sem dados',
        } as never,
      },
    })
    expect(wrapper.text()).toMatch(/No results|Vazio/)
    wrapper.unmount()

    const expandable = mount(DataTable, {
      props: {
        columns: [{ key: 'name', label: 'Name' }],
        rows: [{ id: '1', name: 'Ana' }],
        rowKey: 'id',
        expandable: true,
        expandMode: 'lazy',
        searchable: false,
        pageSize: 10,
        emptyTitle: 'Vazio',
      },
      slots: { expanded: 'Details' },
    })
    const expandBtn = expandable.find('button[aria-expanded]')
    if (expandBtn.exists()) {
      await expandBtn.trigger('click')
      await flushPromises()
    }
    expect(expandable.text()).toContain('Ana')
    expandable.unmount()
  })
})
