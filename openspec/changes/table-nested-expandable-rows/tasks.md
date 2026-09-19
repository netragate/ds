## 1. Nesting-safe Table CSS (TDD)

- [x] 1.1 Add failing tests that a striped/hover parent `Table` does not style rows inside a nested `Table` in a cell
- [x] 1.2 Fix `Table` / `TableBody` selectors (and detail-row exclusions) so nesting is safe; confirm flat-table stripe/hover tests still pass
- [x] 1.3 Export a nested marker class or document the convention used by nested instances

## 2. TableExpandedRow primitive (TDD)

- [x] 2.1 Add failing tests for `TableExpandedRow` (`colspan`, slotted content, detail-row marker)
- [x] 2.2 Implement `TableExpandedRow.vue` and export it from data-display / package index
- [x] 2.3 Add a small Table playground / demo snippet composing expand + static nested `Table` (pattern B on primitives)

## 3. DataTable expandable API (TDD)

- [x] 3.1 Extend `dataTableTypes` / labels with expand label keys; add failing tests for accordion `expanded-key`, chevron column, and `aria-expanded`
- [x] 3.2 Implement `expandable`, `v-model:expanded-key`, expand column UI, and `#expanded-row` detail via `TableExpandedRow`
- [x] 3.3 Add failing tests for `expandMode: 'eager'` (immediate slot content, no panel spinner required)
- [x] 3.4 Add failing tests for `expandMode: 'lazy'` (`expand` event, `expandLoading` panel spinner without whole-table loading row)
- [x] 3.5 Implement eager/lazy behavior and wire `expandLoading` to the expand panel only
- [x] 3.6 Run DataTable / data-display test suite and fix regressions

## 4. Documentation (README + catalog + playground)

- [x] 4.1 Update `packages/design-system/README.md` Table section: nesting-safe behavior + pattern A (nested table in cell)
- [x] 4.2 Update `packages/design-system/README.md` DataTable section: expandable accordion, eager vs lazy, `#expanded-row` static `Table` only, example snippets
- [x] 4.3 Update playground catalog `entries.ts` (and related i18n descriptions if needed) for new Table/`TableExpandedRow` and DataTable props, models, slots, and events
- [x] 4.4 Update `usageSnippets.ts` for Table nested / expanded and DataTable expand examples
- [x] 4.5 Extend `DataTableDemo.vue` (and Table demo if separate) with interactive controls: nested cell example, expandable on/off, eager/lazy toggle, simulated lazy load; ensure live usage snippet updates
- [x] 4.6 Verify component catalog page and playground demos render the new docs/controls without console errors

## 5. Verify and knowledge graph

- [x] 5.1 Run targeted + full relevant unit tests; fix any failures
- [x] 5.2 Manually smoke-check playground Table + DataTable for A/B and eager/lazy
- [x] 5.3 Run `graphify update .` to refresh the architectural knowledge graph
