## ADDED Requirements

### Requirement: Nesting-safe Table styles

The design system SHALL style `Table` row stripe, hover, and last-row border so that nested tables inside cells or expanded detail rows are not affected by the parent table’s row chrome.

#### Scenario: Nested table rows ignore parent stripe

- **WHEN** a `Table` with `striped` contains a nested `Table` inside a `TableCell`
- **THEN** the nested table’s body rows MUST NOT receive the parent’s even/odd stripe background

#### Scenario: Nested table rows ignore parent hover

- **WHEN** the user hovers a row inside a nested `Table`
- **THEN** only the nested row’s hover style applies (parent hover MUST NOT paint nested rows via descendant selectors)

### Requirement: Static nested table in a cell (pattern A)

The design system SHALL allow a static nested `Table` (primitives only) as content of a `TableCell`, including when that cell is rendered through a `DataTable` `#cell-{key}` slot.

#### Scenario: Cell hosts nested Table

- **WHEN** a consumer places a `Table` with head/body rows inside a `TableCell` (or a `DataTable` cell slot)
- **THEN** the nested table renders inside that cell without breaking parent column layout semantics

### Requirement: Expanded detail row primitive (pattern B composition)

The design system SHALL provide a `TableExpandedRow` (or equivalent) that renders a table row with a single cell spanning the parent column count and a default slot for static nested table content.

#### Scenario: Expanded row spans columns

- **WHEN** `TableExpandedRow` is used with a `colspan` equal to the parent column count
- **THEN** a single detail `<tr>`/`<td>` spans the full width and displays the slotted content
