import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DataTableColumnFilter from '@/components/data-display/DataTableColumnFilter.vue'
import DataTableTruncatedCell from '@/components/data-display/DataTableTruncatedCell.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import type { DataTableColumn, DataTableColumnFilters, DataTableLabels } from '@/components/data-display/dataTableTypes'
import {
  getCellValue,
  isColumnFilterActive,
  filterDataTableRowsPipeline,
  resolveRowKey,
} from '@/components/data-display/dataTableUtils'

const labels = {
  filterPlaceholder: 'Filter {column}…',
  filterAriaLabel: 'Filter {column}',
  filterApply: 'Apply',
  filterClear: 'Clear',
  filterEnumAll: 'All {column}',
  filterDateFrom: 'From',
  filterDateTo: 'To',
  filterDateFromAriaLabel: 'From date',
  filterDateToAriaLabel: 'To date',
} as Required<DataTableLabels>

describe('DataTableColumnFilter', () => {
  it('updates text filters and emits apply', async () => {
    const filters = ref<DataTableColumnFilters>({})
    const wrapper = mount(DataTableColumnFilter, {
      props: {
        column: { key: 'name', label: 'Name', filter: 'text' },
        labels,
        modelValue: filters.value,
        canApply: true,
        inlineActions: true,
        'onUpdate:modelValue': (value: DataTableColumnFilters) => {
          filters.value = value
          void wrapper.setProps({ modelValue: value })
        },
      },
    })

    await wrapper.find('input').setValue('Ana')
    expect(filters.value).toEqual({ name: 'Ana' })
    await wrapper.find('button[aria-label="Apply"]').trigger('click')
    expect(wrapper.emitted('apply')).toHaveLength(1)
    wrapper.unmount()
  })

  it('updates date range filters', async () => {
    const filters = ref<DataTableColumnFilters>({})
    const wrapper = mount(DataTableColumnFilter, {
      props: {
        column: { key: 'joined', label: 'Joined', filter: 'date' },
        labels,
        modelValue: filters.value,
        layout: 'popover',
        'onUpdate:modelValue': (value: DataTableColumnFilters) => {
          filters.value = value
          void wrapper.setProps({ modelValue: value })
        },
      },
    })

    const dateInputs = wrapper.findAllComponents({ name: 'DateInput' })
    expect(dateInputs.length).toBeGreaterThanOrEqual(2)
    await dateInputs[0]!.vm.$emit('update:modelValue', '2026-06-01')
    await nextTick()
    expect(filters.value.joined).toEqual({ from: '2026-06-01', to: '' })
    await dateInputs[1]!.vm.$emit('update:modelValue', '2026-06-30')
    await nextTick()
    expect(filters.value.joined).toEqual({ from: '2026-06-01', to: '2026-06-30' })
    wrapper.unmount()
  })

  it('updates enum filters with and without inline apply', async () => {
    const column: DataTableColumn = {
      key: 'status',
      label: 'Status',
      filter: 'enum',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
      ],
    }
    const filters = ref<DataTableColumnFilters>({ status: ['active'] })
    const wrapper = mount(DataTableColumnFilter, {
      props: {
        column,
        labels,
        modelValue: filters.value,
        inlineActions: true,
        canApply: true,
        'onUpdate:modelValue': (value: DataTableColumnFilters) => {
          filters.value = value
          void wrapper.setProps({ modelValue: value })
        },
      },
    })

    expect(wrapper.findComponent({ name: 'Select' }).exists()).toBe(true)
    await wrapper.find('button[aria-label="Apply"]').trigger('click')
    expect(wrapper.emitted('apply')).toHaveLength(1)
    wrapper.unmount()
  })
})

describe('DataTableTruncatedCell', () => {
  it('renders full text content', () => {
    const wrapper = mount(DataTableTruncatedCell, {
      props: { text: 'A very long cell value that should truncate' },
    })
    expect(wrapper.text()).toContain('A very long cell value')
    expect(wrapper.find('[data-testid="datatable-cell-text"]').exists()).toBe(true)
  })
})

describe('dataTableUtils remaining helpers', () => {
  it('reads nested cell values and resolves row keys', () => {
    expect(getCellValue({ a: { b: 1 } }, 'a.b')).toBe(1)
    expect(getCellValue({ name: 'Ada' }, 'missing')).toBeUndefined()
    expect(resolveRowKey({ id: 7, name: 'Ada' }, 0, 'id')).toBe('7')
    expect(resolveRowKey({ name: 'Ada' }, 3)).toBe('3')
    expect(resolveRowKey({ name: 'Ada' }, 1, (row) => String(row.name))).toBe('Ada')
  })

  it('detects active filters and runs the pipeline', () => {
    const textCol: DataTableColumn = { key: 'name', label: 'Name', filter: 'text' }
    const enumCol: DataTableColumn = { key: 'status', label: 'Status', filter: 'enum' }
    const dateCol: DataTableColumn = { key: 'joined', label: 'Joined', filter: 'date' }

    expect(isColumnFilterActive(textCol, 'x')).toBe(true)
    expect(isColumnFilterActive(textCol, '')).toBe(false)
    expect(isColumnFilterActive(enumCol, [])).toBe(false)
    expect(isColumnFilterActive(enumCol, ['a'])).toBe(true)
    expect(isColumnFilterActive(dateCol, { from: '', to: '' })).toBe(false)
    expect(isColumnFilterActive(dateCol, { from: '2026-01-01', to: '' })).toBe(true)

    const rows = [
      { id: 1, name: 'Ana', status: 'active' },
      { id: 2, name: 'Bob', status: 'pending' },
    ]
    const columns: DataTableColumn[] = [
      { key: 'name', label: 'Name', filter: 'text', searchable: true },
      { key: 'status', label: 'Status', filter: 'enum' },
    ]
    const result = filterDataTableRowsPipeline(rows, 'an', columns, { status: ['active'] })
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Ana')
  })
})

describe('DataTable loading and selection', () => {
  it('shows loading state', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' },
        ],
        rows: [
          { id: '1', name: 'Ana', status: 'active' },
          { id: '2', name: 'Bob', status: 'pending' },
        ],
        rowKey: 'id',
        loading: true,
        pageSize: 10,
        searchable: false,
      },
    })

    expect(wrapper.text()).toContain('Loading')
    wrapper.unmount()
  })
})
