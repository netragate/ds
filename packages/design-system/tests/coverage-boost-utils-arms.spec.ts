import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import DateInput from '@/components/form/DateInput.vue'
import TimeInput from '@/components/form/TimeInput.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import Input from '@/components/form/Input.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import {
  applyColumnFilters,
  formatCellValue,
  isColumnFilterActive,
  resolveRowKey,
  sortDataTableRowsMulti,
} from '@/components/data-display/dataTableUtils'
import {
  buildCalendarMonthGrid,
  compareIsoDate,
  formatDateRangeForLocale,
  isDateRangeWithinMaxDays,
  isIsoInRange,
  normalizeDateRange,
  parseLocaleDateInput,
} from '@/lib/dateUtils'

function setupState(wrapper: { vm: unknown }): Record<string, any> {
  return ((wrapper.vm as any).$?.setupState ?? wrapper.vm) as Record<string, any>
}

describe('dateUtils remaining arms', () => {
  it('hits iso range edges and calendar out-of-month', () => {
    expect(isIsoInRange('bad', '2026-01-01', '2026-01-31')).toBe(false)
    expect(isIsoInRange('2026-01-15', '', '')).toBe(false)
    expect(isIsoInRange('2026-01-15', '2026-01-20', '')).toBe(false)
    expect(isIsoInRange('2026-01-15', '', '2026-01-10')).toBe(false)
    expect(isIsoInRange('2026-01-15', '2026-01-01', '2026-01-31')).toBe(true)
    expect(normalizeDateRange('', '2026-01-02')).toEqual({ from: '', to: '2026-01-02' })
    expect(normalizeDateRange('2026-01-02', '')).toEqual({ from: '2026-01-02', to: '' })
    expect(isDateRangeWithinMaxDays('bad', '2026-01-02', 3)).toBe(false)
    expect(compareIsoDate('2026-01-01', '2026-01-01')).toBe(0)
    expect(formatDateRangeForLocale('', '', 'en')).toBe('')
    expect(formatDateRangeForLocale('2026-01-01', '', 'en')).toMatch(/–$/)
    expect(formatDateRangeForLocale('', '2026-01-02', 'en')).toMatch(/^–/)
    expect(formatDateRangeForLocale('2026-01-01', '2026-01-02', 'en')).toContain('–')
    expect(parseLocaleDateInput('13/01/2026', 'en')).toBeNull()
    expect(parseLocaleDateInput('02/31/2026', 'en')).toBeNull()
    expect(parseLocaleDateInput('01/15/26', 'en')).toBe('2026-01-15')
    const grid = buildCalendarMonthGrid(2026, 0, undefined, 'en')
    expect(grid.some((d) => !d.inMonth)).toBe(true)
    expect(buildCalendarMonthGrid(2026, 0, '', 'en').length).toBeGreaterThan(0)
    expect(
      buildCalendarMonthGrid(2026, 0, { from: '2026-01-05', to: '2026-01-10' }, 'en').some(
        (d) => d.isInRange,
      ),
    ).toBe(true)
  })
})

describe('dataTableUtils remaining arms', () => {
  it('covers date filter bounds and inactive columns', () => {
    const columns = [
      { key: 'joined', label: 'Joined', filter: 'date' as const },
      { key: 'name', label: 'Name', filter: 'text' as const },
      { key: 'status', label: 'Status', filter: 'enum' as const },
    ]
    const rows = [
      { name: 'Ana', joined: '2026-06-10', status: 'active' },
      { name: 'Bob', joined: '2026-07-01', status: 'pending' },
    ]

    expect(
      applyColumnFilters(rows, columns, {
        joined: { from: '2026-06-15', to: '2026-06-30' },
      }),
    ).toEqual([])
    expect(
      applyColumnFilters(rows, columns, {
        joined: { from: '', to: '2026-06-15' },
      }).map((r) => r.name),
    ).toEqual(['Ana'])
    expect(isColumnFilterActive(columns[0]!, { from: 'a', to: '' })).toBe(true)
    expect(formatCellValue([1, 2])).toBe('[1,2]')
    expect(resolveRowKey({ id: null }, 4, 'id')).toBe('4')
    expect(
      sortDataTableRowsMulti(
        [
          { a: null, b: null },
          { a: null, b: 1 },
        ],
        [{ key: 'a', direction: 'desc' }],
      ),
    ).toHaveLength(2)
  })
})

describe('DateInput timeModel get/set arms', () => {
  it('reads and writes timeModel for single and range', async () => {
    const single = mount(DateInput, {
      props: {
        showTime: true,
        modelValue: { date: '2026-06-15', time: '11:00:00' },
        'onUpdate:modelValue': (value: unknown) => single.setProps({ modelValue: value as never }),
      },
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
    })
    const s = setupState(single)
    expect(s.timeModel).toBe('11:00:00')
    s.timeModel = '12:30:00'
    await nextTick()
    expect(single.props('modelValue')).toEqual({ date: '2026-06-15', time: '12:30:00' })
    s.timeModel = { from: 'x', to: 'y' } // string branch uses ''
    single.unmount()

    const range = mount(DateInput, {
      props: {
        range: true,
        showTime: true,
        modelValue: { from: '', to: '' } as never,
        'onUpdate:modelValue': (value: unknown) => range.setProps({ modelValue: value as never }),
      },
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
    })
    const r = setupState(range)
    expect(r.timeModel).toEqual({ from: '', to: '' })
    r.pendingRange = null
    r.timeModel = { from: '08:00:00', to: '09:00:00' }
    expect(r.pendingTimes).toEqual({ from: '08:00:00', to: '09:00:00' })
    r.timeModel = 'ignored'
    range.unmount()
  })

  it('emitDateOnly and emitDateRange via selectDay paths', async () => {
    const wrapper = mount(DateInput, {
      props: {
        showTime: true,
        modelValue: { date: '', time: '07:00:00' },
        'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value as never }),
      },
      global: { stubs: { Teleport: { template: '<div><slot /></div>' } } },
      attachTo: document.body,
    })
    const state = setupState(wrapper)
    state.open = true
    state.selectDay('2026-06-18')
    await nextTick()
    expect(wrapper.props('modelValue')).toEqual({ date: '2026-06-18', time: '07:00:00' })
    await wrapper.setProps({ disabled: true })
    await nextTick()
    expect(state.open).toBe(false)
    wrapper.unmount()
  })
})

describe('TimeInput more setupState arms', () => {
  it('covers single invalid commit and disabled close', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '10:00:00',
        'onUpdate:modelValue': (value: string | { from: string; to: string }) => {
          void wrapper.setProps({ modelValue: value })
        },
      },
    })
    const state = setupState(wrapper)
    state.open = true
    state.draftFrom = 'xx:yy:zz'
    state.commitDraft()
    state.displayValue = 'nope'
    state.commitDisplayValue()
    await wrapper.setProps({ disabled: true })
    await nextTick()
    expect(state.open).toBe(false)
    wrapper.unmount()
  })
})

describe('DataTable Input AppLayout leftover', () => {
  it('covers resizable false width style and layout defaults', async () => {
    const table = mount(DataTable, {
      props: {
        columns: [{ key: 'name', label: 'Name', width: '8rem', sortable: true }],
        rows: [{ id: '1', name: 'Ana' }],
        rowKey: 'id',
        resizable: false,
        searchable: false,
      },
    })
    const state = setupState(table)
    expect(state.columnWidthStyle?.({ key: 'name', label: 'Name', width: '8rem' })).toEqual({
      width: '8rem',
    })
    table.unmount()

    const input = mount(Input, {
      props: { type: 'file', modelValue: '' },
    })
    await input.find('input').trigger('input')
    input.unmount()

    const layout = mount(AppLayout, {
      props: {
        showMenu: true,
        menuCollapsible: false,
        settingsMenu: true,
        submenuMode: 'inline',
        footerWidth: 'content',
      },
      slots: {
        header: 'H',
        menu: 'M',
        default: 'C',
        footer: 'F',
      },
    })
    expect(layout.text()).toContain('C')
    layout.unmount()
  })
})
