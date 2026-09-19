## ADDED Requirements

### Requirement: Accordion expandable rows

When `expandable` is true, `DataTable` SHALL prepend an expand control column and allow at most one row to be expanded via `v-model:expanded-key` (`string | null`). Opening a different row MUST close the previously expanded row.

#### Scenario: Expand one row

- **WHEN** the user activates the expand control on a row whose key is `A` and `expanded-key` was `null`
- **THEN** `expanded-key` becomes `A` and a detail row appears below that data row

#### Scenario: Accordion closes previous

- **WHEN** row `A` is expanded and the user expands row `B`
- **THEN** `expanded-key` becomes `B` and row `A`’s detail row is removed

#### Scenario: Collapse

- **WHEN** the user activates the expand control on the currently expanded row
- **THEN** `expanded-key` becomes `null` and the detail row is removed

### Requirement: Eager expand mode

When `expandMode` is `eager` (default), `DataTable` SHALL show the `#expanded-row` slot content immediately on expand without requiring a fetch cycle driven by the component.

#### Scenario: Eager shows slotted static table

- **WHEN** `expandMode` is `eager`, a row is expanded, and `#expanded-row` renders a static nested `Table`
- **THEN** the nested table is visible in the detail panel without the expand panel loading state

### Requirement: Lazy expand mode with panel loading

When `expandMode` is `lazy`, `DataTable` SHALL emit an `expand` event with `{ key, row }` when a row is opened and SHALL show a loading indicator in the expand panel while `expandLoading` is true. Whole-table `loading` MUST NOT be required for lazy child fetches.

#### Scenario: Lazy open emits expand

- **WHEN** `expandMode` is `lazy` and the user opens a row
- **THEN** the component emits `expand` with that row’s key and row data

#### Scenario: Lazy panel loading

- **WHEN** `expandMode` is `lazy`, a row is expanded, and `expandLoading` is true
- **THEN** the expand panel shows a loading indicator and MUST NOT replace the entire table with the global loading row

#### Scenario: Lazy content after load

- **WHEN** `expandLoading` becomes false while a row remains expanded
- **THEN** the `#expanded-row` slot content (static nested `Table`) is shown in the detail panel

### Requirement: Static nested table only in expand panel

The expand panel content contract SHALL be a static nested `Table` (or equivalent non-DataTable markup) provided via `#expanded-row`. `DataTable` MUST NOT nest another full `DataTable` as the built-in expand content.

#### Scenario: Expanded slot renders consumer table

- **WHEN** `#expanded-row` supplies a nested `Table` with columns and rows
- **THEN** that table appears inside the expanded detail row beneath the parent row

### Requirement: Expand accessibility labels

Expand controls SHALL expose `aria-expanded` reflecting open state and use configurable labels from `DataTableLabels` for accessible names (expand/collapse).

#### Scenario: aria-expanded reflects state

- **WHEN** a row is expanded
- **THEN** its expand control has `aria-expanded="true"`

#### Scenario: aria-expanded when collapsed

- **WHEN** a row is not expanded
- **THEN** its expand control has `aria-expanded="false"`

### Requirement: Documentation for Table and DataTable nesting

Package README, component catalog entries, and playground demos SHALL document pattern A (nested table in cell) and pattern B (expand + static nested table), including `expandMode` eager vs lazy for `DataTable`.

#### Scenario: README covers both patterns

- **WHEN** a consumer reads the Table and DataTable sections of the package README
- **THEN** both nested-in-cell and expandable-row usage are described with examples

#### Scenario: Catalog lists expand API

- **WHEN** a consumer views the DataTable catalog API
- **THEN** `expandable`, `expandMode`, `expandedKey`, `expandLoading`, `#expanded-row`, and `expand` are listed

#### Scenario: Playground demonstrates expand modes

- **WHEN** a consumer opens the DataTable (and Table) playground demos
- **THEN** they can exercise nested cell and expandable row examples, including toggling eager vs lazy behavior
