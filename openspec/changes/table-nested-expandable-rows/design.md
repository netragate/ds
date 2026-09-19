## Context

`Table` (`Table.vue` + Head/Body/Row/Cell) is a thin semantic wrapper with descendant CSS (`[&_tbody_tr:…]`) that styles nested tables incorrectly. `DataTable` composes those primitives into a closed flat grid: one `<tr>` per row, slots only `#toolbar` and `#cell-{key}`. There is no expand row, no nested-table API, and docs/playground only cover flat usage. Consumers need pattern **A** (static nested table in a cell) and pattern **B** (accordion expand → static nested table), with **eager** (children already on the row) vs **lazy** (fetch on expand, panel-local loading).

## Goals / Non-Goals

**Goals:**
- Nesting-safe `Table` styles so parent stripe/hover/border do not leak into nested tables
- First-class pattern **B** on `DataTable`: single `expandedKey`, eager/lazy modes, `#expanded-row` hosting a static nested `Table`
- Composition helper for expand detail rows on raw `Table` (same visual density)
- Pattern **A** documented and usable via cell slots / composition (no lazy for A)
- Docs: README Table + DataTable sections; catalog props/slots/events; playground demos with controls for expand + eager/lazy

**Non-Goals:**
- Full nested `DataTable` (search/sort/filter/pagination) inside expand or cells
- Multi-row expand or tree/hierarchical indentation modes
- Lazy/virtualize for pattern A cell previews
- Drawer/side panel as substitute for expand

## Decisions

1. **CSS isolation first** — Change parent stripe/hover/last-border selectors from descendant (`_`) to direct-child where possible, and/or wrap nested tables with a class (e.g. `ds-table-nested`) that resets inherited row chrome. Nested `Table` keeps its own `overflow-auto`; document that deep nesting should prefer expand (B) over fat cells (A).

2. **`TableExpandedRow` primitive** — New optional component exporting a `<tr>` with a single `<td :colspan>` and padded content slot for static nested `Table`. Used by apps composing `Table` and internally by `DataTable` expand panel. Avoids every consumer reinventing colspan + padding.

3. **`DataTable` expand API (accordion)** — Props/models:
   - `expandable?: boolean` (default `false`) — when true, prepend a narrow chevron column
   - `expandMode?: 'eager' | 'lazy'` (default `'eager'`)
   - `v-model:expanded-key` → `string | null` — at most one open row; opening another closes the previous
   - `expandLoading?: boolean` — panel-local loading for lazy fetches (does **not** set the whole-table `loading` overlay)
   - Event `expand` with `{ key, row }` when a row is opened (especially for lazy); closing may emit `collapse` or the same event with null — prefer `expand` only on open + `update:expandedKey` for all changes

4. **Eager vs lazy responsibility** — Eager: app puts child rows on the parent row (or resolves via slot); expand only toggles UI. Lazy: on open, DS shows Spinner in the expand panel while `expandLoading` is true; app listens to `expand`, fetches, then sets `expandLoading` false and provides children through the slot (or by mutating row data). Cache/refetch policy stays in the app (no forced refetch).

5. **Slot-first nested content** — `#expanded-row="{ row, key }"` receives the parent row; consumer renders static `Table` / `TableExpandedRow` content. No required `childColumns` in v1 (keeps API small); optional helper can follow later. Pattern A continues via existing `#cell-{key}`.

6. **Static child only** — Nested content MUST be `Table` primitives (or plain markup), not a second `DataTable`. Document this constraint in README and catalog.

7. **a11y** — Chevron control uses `aria-expanded` and an accessible label from `labels` (new keys e.g. `expandRow` / `collapseRow`). Expanded detail row is the next sibling `<tr>` in DOM order.

8. **Documentation surfaces** — Update (a) `README.md` Table + DataTable sections with A/B + eager/lazy examples; (b) playground catalog `entries.ts` / `usageSnippets.ts` / descriptions; (c) interactive playground demos (DataTable + Table) so props are toggleable and the live usage snippet reflects expand mode.

## Risks / Trade-offs

- **[nth-child + detail rows]** Expand inserts an extra `<tr>`; parent striping may skip/offset. Mitigate by marking detail rows (e.g. `data-expanded-detail`) and excluding them from stripe selectors.
- **[Lazy UX]** If the app never clears `expandLoading`, the panel spins forever — document the contract; consider a timeout only in demos, not in the component.
- **[Double scroll]** Nested `Table` inside expand still has `overflow-auto`; prefer compact child tables or a prop later to disable outer scroll on nested instances.
- **[Breaking CSS]** Tightening selectors may slightly change edge-case striping for unusual markup; cover with visual/unit tests on flat tables (no behavior change expected for current flat usage).
