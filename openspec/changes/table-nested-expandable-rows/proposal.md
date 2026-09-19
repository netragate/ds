## Why

Apps need master–detail and preview-in-cell patterns inside tables, but `DataTable` only renders flat rows (`#toolbar` / `#cell-{key}`) and `Table` CSS uses descendant selectors that break nested tables (stripe/hover leak). Without a first-class expand API and nesting-safe styles, consumers hack incomplete solutions or leave the design system.

## What Changes

- Make `Table` nesting-safe (stripe/hover/border scoped so nested tables are not styled by the parent)
- Add a `Table` expanded-row primitive / pattern for pattern **B** (detail `<tr>` with `colspan`)
- Document and support pattern **A** (static nested `Table` inside a cell) on `Table` and via `DataTable` cell slots
- Extend `DataTable` with accordion expand (`v-model:expanded-key`), `expandMode` `eager` | `lazy`, local panel loading for lazy/server fetches, and an `#expanded-row` slot that hosts a **static** nested `Table` (not a second full `DataTable`)
- Update package README (Table + DataTable), component catalog API docs, usage snippets, and playground demos for A/B + eager/lazy

## Non-Goals

- Nested full `DataTable` (search/sort/filter/pagination) inside expand or cells
- Multi-expand / tree-hierarchy rows (only one expanded key at a time)
- Virtualization or lazy-mount for pattern A cell previews
- Replacing expand with Drawer/side-panel as the primary solution

## Capabilities

### New Capabilities
- `table-nested-display`: Nesting-safe `Table` primitives, static nested table in cells (A), and expanded detail row helper for composition (B)
- `datatable-row-expand`: Accordion expandable rows on `DataTable` with eager/lazy child data and static nested table in the expand panel

### Modified Capabilities
- *(none — no capabilities under `openspec/specs/` yet; Table/DataTable lived only under archived figma change)*

## Impact

- `packages/design-system/src/components/data-display/Table*.vue`, `DataTable.vue`, `dataTableTypes.ts` (+ possible `TableExpandedRow.vue`)
- Tests under `packages/design-system/tests/` (data-display / DataTable)
- Docs: `packages/design-system/README.md` (Table + DataTable sections)
- Catalog: `playground/data/catalog/entries.ts`, `usageSnippets.ts`, i18n copy if needed
- Playground: `DataTableDemo.vue` / Table demos + controls for expand mode
- Exports from `data-display/index.ts` / package root if a new primitive is added
