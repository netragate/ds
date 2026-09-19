import {
  filterDataTableRowsPipeline,
  paginateDataTableRows,
  sortDataTableRowsMulti,
} from '@/components/data-display/dataTableUtils'
import type {
  DataTableColumnFilters,
  DataTableSortEntry,
  SortDirection,
} from '@/components/data-display/dataTableTypes'
import type { UserTableColumnMessages } from '../i18n/types'

export interface UserProject {
  name: string
  role: string
}

export interface UserRow {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  projects?: UserProject[]
  [key: string]: unknown
}

export const mockUsers: UserRow[] = [
  {
    id: '1',
    name: 'Ana Martins',
    email: 'ana@acme.io',
    role: 'Designer',
    status: 'active',
    lastLogin: '2026-06-15',
    projects: [
      { name: 'Design System', role: 'Lead' },
      { name: 'Marketing site', role: 'Contributor' },
    ],
  },
  {
    id: '2',
    name: 'Bruno Costa',
    email: 'bruno@acme.io',
    role: 'Engineer',
    status: 'active',
    lastLogin: '2026-06-14',
    projects: [{ name: 'API Gateway', role: 'Owner' }],
  },
  { id: '3', name: 'Carla Dias', email: 'carla@acme.io', role: 'Product', status: 'pending', lastLogin: '2026-06-10', projects: [{ name: 'Roadmap', role: 'PM' }] },
  { id: '4', name: 'Diego Lima', email: 'diego@acme.io', role: 'Engineer', status: 'inactive', lastLogin: '2026-05-28', projects: [] },
  { id: '5', name: 'Elena Souza', email: 'elena@acme.io', role: 'Design Lead', status: 'active', lastLogin: '2026-06-16', projects: [{ name: 'Icon set', role: 'Lead' }, { name: 'Design System', role: 'Reviewer' }] },
  { id: '6', name: 'Felipe Rocha', email: 'felipe@acme.io', role: 'QA', status: 'active', lastLogin: '2026-06-13', projects: [{ name: 'E2E suite', role: 'Owner' }] },
  { id: '7', name: 'Gabriela Nunes', email: 'gabi@acme.io', role: 'Engineer', status: 'pending', lastLogin: '2026-06-12', projects: [{ name: 'Billing', role: 'Contributor' }] },
  { id: '8', name: 'Henrique Alves', email: 'henrique@acme.io', role: 'DevOps', status: 'active', lastLogin: '2026-06-16', projects: [{ name: 'CI pipelines', role: 'Owner' }] },
  { id: '9', name: 'Isabela Ferreira', email: 'isa@acme.io', role: 'Designer', status: 'inactive', lastLogin: '2026-04-20', projects: [] },
  { id: '10', name: 'João Pereira', email: 'joao@acme.io', role: 'Engineer', status: 'active', lastLogin: '2026-06-15', projects: [{ name: 'Search', role: 'Owner' }] },
  { id: '11', name: 'Karina Lopes', email: 'karina@acme.io', role: 'Product', status: 'active', lastLogin: '2026-06-11', projects: [{ name: 'Onboarding', role: 'PM' }] },
  { id: '12', name: 'Leo Martins', email: 'leo@acme.io', role: 'Engineer', status: 'active', lastLogin: '2026-06-16', projects: [{ name: 'Mobile app', role: 'Contributor' }] },
  { id: '13', name: 'Marina Teixeira', email: 'marina@acme.io', role: 'Support', status: 'pending', lastLogin: '2026-06-09', projects: [{ name: 'Help center', role: 'Owner' }] },
  { id: '14', name: 'Nicolas Barros', email: 'nicolas@acme.io', role: 'Engineer', status: 'inactive', lastLogin: '2026-05-01', projects: [] },
  { id: '15', name: 'Olivia Campos', email: 'olivia@acme.io', role: 'Designer', status: 'active', lastLogin: '2026-06-14', projects: [{ name: 'Illustrations', role: 'Lead' }] },
  { id: '16', name: 'Paulo Mendes', email: 'paulo@acme.io', role: 'Engineer', status: 'active', lastLogin: '2026-06-12', projects: [{ name: 'Auth', role: 'Owner' }] },
  { id: '17', name: 'Quintino Silva', email: 'quintino@acme.io', role: 'Security', status: 'active', lastLogin: '2026-06-16', projects: [{ name: 'Threat model', role: 'Owner' }] },
  { id: '18', name: 'Rita Oliveira', email: 'rita@acme.io', role: 'Product', status: 'inactive', lastLogin: '2026-03-18', projects: [] },
  { id: '19', name: 'Samuel Araujo', email: 'samuel@acme.io', role: 'Engineer', status: 'pending', lastLogin: '2026-06-08', projects: [{ name: 'Notifications', role: 'Contributor' }] },
  { id: '20', name: 'Tatiana Ribeiro', email: 'tati@acme.io', role: 'Design Lead', status: 'active', lastLogin: '2026-06-15', projects: [{ name: 'Brand refresh', role: 'Lead' }] },
  { id: '21', name: 'Ulisses Pinto', email: 'ulisses@acme.io', role: 'Engineer', status: 'active', lastLogin: '2026-06-13', projects: [{ name: 'Data pipeline', role: 'Owner' }] },
  { id: '22', name: 'Valentina Cruz', email: 'valentina@acme.io', role: 'QA', status: 'active', lastLogin: '2026-06-16', projects: [{ name: 'Regression pack', role: 'Owner' }] },
  { id: '23', name: 'William Santos', email: 'will@acme.io', role: 'Engineer', status: 'inactive', lastLogin: '2026-02-10', projects: [] },
  { id: '24', name: 'Xavier Monteiro', email: 'xavier@acme.io', role: 'DevOps', status: 'active', lastLogin: '2026-06-14', projects: [{ name: 'Observability', role: 'Owner' }] },
  { id: '25', name: 'Yasmin Freitas', email: 'yasmin@acme.io', role: 'Designer', status: 'pending', lastLogin: '2026-06-07', projects: [{ name: 'Motion kit', role: 'Contributor' }] },
]

const userColumns = [
  { key: 'name', label: 'Name', sortable: true, filter: 'text' as const },
  { key: 'email', label: 'Email', sortable: true, filter: 'text' as const },
  { key: 'role', label: 'Role', sortable: true, filter: 'text' as const },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    filter: 'enum' as const,
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  },
  { key: 'lastLogin', label: 'Last login', sortable: true, filter: 'date' as const },
]

export function createUserTableColumns(columns: UserTableColumnMessages) {
  return [
    { key: 'name', label: columns.name, sortable: true, filter: 'text' as const },
    { key: 'email', label: columns.email, sortable: true, filter: 'text' as const },
    { key: 'role', label: columns.role, sortable: true, filter: 'text' as const },
    {
      key: 'status',
      label: columns.status,
      sortable: true,
      filter: 'enum' as const,
      filterOptions: [
        { label: columns.statusActive, value: 'active' },
        { label: columns.statusInactive, value: 'inactive' },
        { label: columns.statusPending, value: 'pending' },
      ],
    },
    { key: 'lastLogin', label: columns.lastLogin, sortable: true, filter: 'date' as const },
  ]
}

export const userTableColumns = userColumns

export interface FetchUsersParams {
  page: number
  pageSize: number
  search: string
  sortStack: DataTableSortEntry[]
  columnFilters: DataTableColumnFilters
  sortKey: string | null
  sortDirection: SortDirection
}

export interface FetchUsersResult {
  rows: UserRow[]
  total: number
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Simulates a paginated API with search, column filters, and multi-sort. */
export async function fetchUsers(params: FetchUsersParams): Promise<FetchUsersResult> {
  await delay(450)

  const filtered = filterDataTableRowsPipeline(
    mockUsers,
    params.search,
    userColumns,
    params.columnFilters,
  )
  const sorted = sortDataTableRowsMulti(filtered, params.sortStack)
  const rows = paginateDataTableRows(sorted, params.page, params.pageSize)

  return {
    rows,
    total: filtered.length,
  }
}
