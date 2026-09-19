<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UsageBlock from '../components/UsageBlock.vue'
import DataTablePlaygroundControls from '../components/DataTablePlaygroundControls.vue'
import DataTablePlaygroundHints from '../components/DataTablePlaygroundHints.vue'
import {
  fetchUsers,
  mockUsers,
  type UserRow,
} from '../data/mockUsers'
import { useDataTableLabels, useStatusLabel, useUserTableColumns } from '../composables/useUserTableColumns'
import { usePlaygroundLocale } from '../composables/usePlaygroundLocale'
import { playgroundSnippetAttr, templateBooleanAttr, templateBoundAttr, templateStringAttr } from '../utils/propTemplateName'
import Badge from '@/components/feedback/Badge.vue'
import Button from '@/components/button/Button.vue'
import DataTable from '@/components/data-display/DataTable.vue'
import Lozenge from '@/components/data-display/Lozenge.vue'
import Table from '@/components/data-display/Table.vue'
import TableBody from '@/components/data-display/TableBody.vue'
import TableCell from '@/components/data-display/TableCell.vue'
import TableHead from '@/components/data-display/TableHead.vue'
import TableRow from '@/components/data-display/TableRow.vue'
import type {
  DataTableColumn,
  DataTableColumnFilters,
  DataTableExpandPayload,
  DataTableSortEntry,
} from '@/components/data-display/dataTableTypes'

const { locale, t } = usePlaygroundLocale()
const userTableColumns = useUserTableColumns()
const dataTableLabels = useDataTableLabels()
const { formatStatus } = useStatusLabel()

const search = ref('')
const page = ref(1)
const pageSize = ref(5)
const mode = ref<'client' | 'api'>('client')
const sortStack = ref<DataTableSortEntry[]>([])
const columnFilters = ref<DataTableColumnFilters>({})
const loading = ref(false)
const rows = ref<UserRow[]>([])
const total = ref(0)

const showSearch = ref(true)
const showSort = ref(true)
const showColumnFilter = ref(true)
const showTotalRecords = ref(true)
const showPageSize = ref(true)
const striped = ref(true)
const forceLoading = ref(false)
const showToolbar = ref(false)
const forceEmpty = ref(false)
const expandable = ref(true)
const expandMode = ref<'eager' | 'lazy'>('eager')
const expandedKey = ref<string | null>(null)
const expandLoading = ref(false)
const lazyProjects = ref<Record<string, UserRow['projects']>>({})
const pageSizePreset = ref<'default' | 'compact'>('default')
const columnFilterApplyMode = ref<'auto' | 'apply' | 'instant'>('auto')
const searchPlaceholder = ref('')
const emptyTitle = ref('')
const emptyDescription = ref('')

const pageSizeOptions = computed(() =>
  pageSizePreset.value === 'default' ? [5, 10, 25, 50] : [3, 5, 10],
)

const resolvedSearchPlaceholder = computed(
  () => searchPlaceholder.value || t('dataTable.searchPlaceholder'),
)

const resolvedEmptyTitle = computed(
  () => emptyTitle.value || dataTableLabels.value.emptyTitle,
)

const resolvedEmptyDescription = computed(
  () => emptyDescription.value || dataTableLabels.value.emptyDescription,
)

const resolvedColumnFilterApply = computed<boolean | null>(() => {
  if (columnFilterApplyMode.value === 'auto') return null
  if (columnFilterApplyMode.value === 'apply') return true
  return false
})

const tableColumns = computed<DataTableColumn[]>(() =>
  userTableColumns.value.map((column) => ({
    ...column,
    sortable: showSort.value ? column.sortable : false,
    filter: showColumnFilter.value ? column.filter : undefined,
    filterOptions: showColumnFilter.value ? column.filterOptions : undefined,
  })),
)

const tableRows = computed(() => {
  if (forceEmpty.value) return []
  return mode.value === 'client' ? mockUsers : rows.value
})

async function loadTable(): Promise<void> {
  loading.value = true
  try {
    const result = await fetchUsers({
      page: page.value,
      pageSize: pageSize.value,
      search: search.value,
      sortStack: sortStack.value,
      columnFilters: columnFilters.value,
      sortKey: sortStack.value[0]?.key ?? null,
      sortDirection: sortStack.value[0]?.direction ?? null,
    })
    rows.value = result.rows
    total.value = result.total
  } finally {
    loading.value = false
  }
}

watch([mode, page, pageSize, search, sortStack, columnFilters], () => {
  if (mode.value === 'api') void loadTable()
}, { immediate: true, deep: true })

watch(showSort, (enabled) => {
  if (!enabled) sortStack.value = []
})

watch(showColumnFilter, (enabled) => {
  if (!enabled) columnFilters.value = {}
})

watch(showSearch, (enabled) => {
  if (!enabled) search.value = ''
})

watch(expandable, (enabled) => {
  if (!enabled) {
    expandedKey.value = null
    expandLoading.value = false
  }
})

watch(pageSizePreset, () => {
  pageSize.value = pageSizeOptions.value[0] ?? 5
})

function setMode(next: 'client' | 'api'): void {
  if (mode.value === next) return
  mode.value = next
  search.value = ''
  page.value = 1
  sortStack.value = []
  columnFilters.value = {}
  columnFilterApplyMode.value = 'auto'
  expandedKey.value = null
  lazyProjects.value = {}
}

async function onExpand(payload: DataTableExpandPayload): Promise<void> {
  if (expandMode.value !== 'lazy') return
  const key = payload.key
  if (lazyProjects.value[key]) return
  expandLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  const source = mockUsers.find((user) => user.id === key)
  lazyProjects.value = {
    ...lazyProjects.value,
    [key]: source?.projects ?? [],
  }
  expandLoading.value = false
}

function projectsForRow(row: Record<string, unknown>): { name: string; role: string }[] {
  const key = String(row.id ?? '')
  if (expandMode.value === 'lazy') {
    return (lazyProjects.value[key] ?? []) as { name: string; role: string }[]
  }
  return ((row.projects as { name: string; role: string }[] | undefined) ?? [])
}

function columnSnippet(key: string, label: string, extras: string[]): string {
  const parts = [`key: '${key}'`, `label: '${label}'`, ...extras]
  return `  { ${parts.join(', ')} }`
}

const code = computed(() => {
  const columnLines = [
    columnSnippet('name', 'Name', [
      ...(showSort.value ? ['sortable: true'] : []),
      ...(showColumnFilter.value ? ["filter: 'text'"] : []),
    ]),
    columnSnippet('status', 'Status', [
      ...(showSort.value ? ['sortable: true'] : []),
      ...(showColumnFilter.value
        ? ["filter: 'enum'", 'filterOptions: [{ label: "Active", value: "active" }]']
        : []),
    ]),
  ]

  const props = [
    '  v-model:search="search"',
    '  v-model:current-page="page"',
    '  v-model:page-size="pageSize"',
    '  v-model:sort-stack="sortStack"',
    '  v-model:column-filters="columnFilters"',
    '  :columns="columns"',
    '  :rows="rows"',
    `  ${templateStringAttr('rowKey', 'id')}`,
    `  ${templateBoundAttr('pageSizeOptions', `[${pageSizeOptions.value.join(', ')}]`)}`,
    `  ${playgroundSnippetAttr('searchPlaceholder', resolvedSearchPlaceholder.value)}`,
    `  ${playgroundSnippetAttr('emptyTitle', resolvedEmptyTitle.value)}`,
    `  ${playgroundSnippetAttr('emptyDescription', resolvedEmptyDescription.value)}`,
    '  :labels="labels"',
    `  ${playgroundSnippetAttr('locale', locale.value)}`,
  ]

  if (!showSearch.value) props.push(`  ${templateBooleanAttr('searchable', false)}`)
  if (!showTotalRecords.value) props.push(`  ${templateBooleanAttr('showTotalRecords', false)}`)
  if (!showPageSize.value) props.push(`  ${templateBooleanAttr('showPageSize', false)}`)
  if (!striped.value) props.push(`  ${templateBooleanAttr('striped', false)}`)
  if (forceLoading.value) props.push(`  ${templateBooleanAttr('loading', true)}`)
  if (expandable.value) {
    props.push('  v-model:expanded-key="expandedKey"')
    props.push(`  ${templateBooleanAttr('expandable', true)}`)
    props.push(`  ${templateStringAttr('expandMode', expandMode.value)}`)
    if (expandMode.value === 'lazy') {
      props.push('  :expand-loading="expandLoading"')
      props.push('  @expand="onExpand"')
    }
  }
  if (mode.value === 'api') {
    props.push(
      `  ${templateBooleanAttr('serverSide', true)}`,
      '  :total="total"',
      '  :loading="loading"',
      '  @request="fetchRows"',
    )
    if (columnFilterApplyMode.value === 'apply') {
      props.push(`  ${templateBooleanAttr('columnFilterApply', true)}`)
    } else if (columnFilterApplyMode.value === 'instant') {
      props.push(`  ${templateBooleanAttr('columnFilterApply', false)}`)
    }
  }

  const lines = [
    'const columns = [',
    ...columnLines,
    ']',
    '',
    '<DataTable',
    ...props,
    '>',
  ]

  if (showToolbar.value) {
    lines.push('  <template #toolbar>')
    lines.push(`    <Button ${templateStringAttr('variant', 'outline')} ${templateStringAttr('size', 'sm')}>Export</Button>`)
    lines.push('  </template>')
  }

  lines.push('  <template #cell-status="{ value }">')
  lines.push('    <Lozenge :variant="value === \'active\' ? \'success\' : \'warning\'">')
  lines.push('      {{ value }}')
  lines.push('    </Lozenge>')
  lines.push('  </template>')
  if (expandable.value) {
    lines.push('  <template #expanded-row="{ row }">')
    lines.push('    <Table :nested="true">…projects…</Table>')
    lines.push('  </template>')
  }
  lines.push('</DataTable>')

  return lines.join('\n')
})
</script>

<template>
  <div>
    <p class="mb-4 font-mono text-xs uppercase tracking-wider text-[#4D6A87]">{{ t('drawer.livePlayground') }}</p>
    <div class="pg-playground-panel mb-6 space-y-4 rounded-xl p-4">
      <DataTablePlaygroundHints
        v-if="showSort || showColumnFilter"
        :sort-stack="sortStack"
        :column-filters="columnFilters"
      />

      <div
        class="inline-flex rounded-lg p-0.5"
        style="background: var(--pg-nav-active-bg); border: 1px solid var(--pg-card-border)"
      >
        <button
          type="button"
          class="rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors"
          :style="
            mode === 'client'
              ? { background: '#2979FF22', color: '#2979FF' }
              : { color: 'var(--pg-text-muted)' }
          "
          @click="setMode('client')"
        >
          {{ t('dataTable.modeClient') }}
        </button>
        <button
          type="button"
          class="rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors"
          :style="
            mode === 'api'
              ? { background: '#2979FF22', color: '#2979FF' }
              : { color: 'var(--pg-text-muted)' }
          "
          @click="setMode('api')"
        >
          {{ t('dataTable.modeApi') }}
        </button>
      </div>

      <DataTable
        v-model:search="search"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        v-model:sort-stack="sortStack"
        v-model:column-filters="columnFilters"
        v-model:expanded-key="expandedKey"
        :columns="tableColumns"
        :rows="tableRows"
        :server-side="mode === 'api'"
        :column-filter-apply="resolvedColumnFilterApply"
        :total="mode === 'api' ? total : undefined"
        :loading="forceLoading || (mode === 'api' && loading)"
        :searchable="showSearch"
        :show-total-records="showTotalRecords"
        :show-page-size="showPageSize"
        :striped="striped"
        :expandable="expandable"
        :expand-mode="expandMode"
        :expand-loading="expandLoading"
        :page-size-options="pageSizeOptions"
        row-key="id"
        :search-placeholder="resolvedSearchPlaceholder"
        :empty-title="resolvedEmptyTitle"
        :empty-description="resolvedEmptyDescription"
        :labels="dataTableLabels"
        :locale="locale"
        @request="loadTable"
        @expand="onExpand"
      >
        <template v-if="showToolbar" #toolbar>
          <Badge variant="primary" :value="tableRows.length" />
          <Button variant="outline" size="sm">Export</Button>
        </template>
        <template #cell-status="{ value }">
          <Lozenge
            :variant="
              value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'default'
            "
          >
            {{ formatStatus(value as UserRow['status']) }}
          </Lozenge>
        </template>
        <template v-if="expandable" #expanded-row="{ row }">
          <Table nested>
            <TableHead>
              <TableRow>
                <TableCell>{{ t('dataTable.projectCol') }}</TableCell>
                <TableCell>{{ t('dataTable.roleCol') }}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow v-for="project in projectsForRow(row)" :key="project.name">
                <TableCell>{{ project.name }}</TableCell>
                <TableCell>{{ project.role }}</TableCell>
              </TableRow>
              <TableRow v-if="projectsForRow(row).length === 0">
                <TableCell :colspan="2" class="text-muted-foreground">
                  {{ t('dataTable.noProjects') }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </template>
      </DataTable>

      <DataTablePlaygroundControls
        v-model:show-search="showSearch"
        v-model:show-sort="showSort"
        v-model:show-column-filter="showColumnFilter"
        v-model:show-total-records="showTotalRecords"
        v-model:show-page-size="showPageSize"
        v-model:striped="striped"
        v-model:force-loading="forceLoading"
        v-model:show-toolbar="showToolbar"
        v-model:force-empty="forceEmpty"
        v-model:expandable="expandable"
        v-model:expand-mode="expandMode"
        v-model:page-size-preset="pageSizePreset"
        v-model:column-filter-apply-mode="columnFilterApplyMode"
        v-model:search-placeholder="searchPlaceholder"
        v-model:empty-title="emptyTitle"
        v-model:empty-description="emptyDescription"
      />
    </div>
    <UsageBlock :code="code" />
  </div>
</template>
