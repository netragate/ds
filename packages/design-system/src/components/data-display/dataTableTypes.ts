import type { DateRangeValue } from '@/lib/dateTimeTypes'
import type { TableColumnVisibility } from './tableVisibility'

export type SortDirection = 'asc' | 'desc' | null

export type DataTableFilterType = 'text' | 'date' | 'enum'

export type DataTableExpandMode = 'eager' | 'lazy'

export interface DataTableFilterOption {
  label: string
  value: string
}

/** @deprecated Prefer `DateRangeValue` from the design-system package root. */
export type DataTableDateRangeFilter = DateRangeValue

export type DataTableColumnFilterValue =
  | string
  | string[]
  | DataTableDateRangeFilter

export type DataTableColumnFilters = Record<string, DataTableColumnFilterValue | undefined>

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string
  label: string
  sortable?: boolean
  searchable?: boolean
  filter?: DataTableFilterType
  filterOptions?: DataTableFilterOption[]
  align?: 'left' | 'center' | 'right'
  width?: string
  /** Restrict column to mobile or desktop; omit to show on both. */
  visibility?: TableColumnVisibility
}

export interface DataTableSortEntry {
  key: string
  direction: Exclude<SortDirection, null>
}

export interface DataTableSortState {
  key: string | null
  direction: SortDirection
}

export interface DataTableRequestParams {
  page: number
  pageSize: number
  search: string
  sortStack: DataTableSortEntry[]
  columnFilters: DataTableColumnFilters
  sortKey: string | null
  sortDirection: SortDirection
}

export interface DataTableExpandPayload {
  key: string
  row: Record<string, unknown>
}

export interface DataTableRowClickPayload {
  key: string
  row: Record<string, unknown>
  index: number
}

export type DataTableRowKey<T> = keyof T & string | ((row: T, index: number) => string)

export interface DataTableLabels {
  record?: string
  records?: string
  page?: string
  pages?: string
  pageSize?: string
  searchAriaLabel?: string
  loadingAriaLabel?: string
  loadingText?: string
  filterTitle?: string
  filterPlaceholder?: string
  filterAriaLabel?: string
  filterClear?: string
  filterApply?: string
  filterDateFrom?: string
  filterDateTo?: string
  filterDateFromAriaLabel?: string
  filterDateToAriaLabel?: string
  filterEnumAll?: string
  expandRow?: string
  collapseRow?: string
  expandLoadingText?: string
}
