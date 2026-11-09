export type TableColumnVisibility = 'mobile' | 'desktop'

/** Same mobile cutoff as AppLayout (`lg` / 1024px). */
export const TABLE_MOBILE_MEDIA_QUERY = '(max-width: 1023px)'

/** Responsive show/hide classes for compositional `TableCell`. Omit for both viewports. */
export function tableVisibilityClass(
  visibility?: TableColumnVisibility,
): string | undefined {
  if (visibility === 'desktop') return 'hidden lg:table-cell'
  if (visibility === 'mobile') return 'table-cell lg:hidden'
  return undefined
}

/** Whether a column should render for the current viewport. */
export function isColumnVisible(
  visibility: TableColumnVisibility | undefined,
  isMobile: boolean,
): boolean {
  if (!visibility) return true
  if (visibility === 'mobile') return isMobile
  return !isMobile
}

/** Columns to render for the current viewport (used by DataTable). */
export function filterVisibleColumns<T extends { visibility?: TableColumnVisibility }>(
  columns: readonly T[],
  isMobile: boolean,
): T[] {
  return columns.filter((column) => isColumnVisible(column.visibility, isMobile))
}
