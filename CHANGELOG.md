# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.9.5] - 2026-08-29

### Added

- **`DataTable` column filter Apply** — when `serverSide` is true (default), column filters use a draft + **Apply** button instead of reloading on every keystroke. Override with `columnFilterApply`.
- **`DataTableLabels.filterApply`** — localized Apply button label (`Apply` / `Aplicar`).

### Changed

- **`DataTableColumnFilterMenu`** — `applyMode` prop with local draft state; Clear still removes applied filters immediately.

## [0.9.1] - 2026-08-23

### Added

- **`DateInput` `maxRangeDays`** — inclusive max length for `range` selection; out-of-limit calendar days are disabled after the first click.
- **`DateInput` range confirm** — footer shows Confirm (not Today); calendar closes only on Confirm after `from`/`to` are set.

### Changed

- **`DateInput` `range`** — dual-month calendar (current + next) side by side so ranges can span months; adjacent-month filler days are hidden (shown only on the other panel).
- **`DateInput` panel** — fixed positioning with viewport collision (flip above/below, shift left/right, clamp).
- **`dateUtils`** — `inclusiveDaySpan` / `isDateRangeWithinMaxDays` helpers.

## [0.9.0] - 2026-08-23

### Added

- **`TimeInput`** — `HH:mm:ss` (24h) with optional `range` (`{ from, to }`), `minuteStep` / `secondStep`, locale-aware labels.
- **`DateInput` `range`** — calendar start→end selection with range highlight; v-model `{ from, to }` (ISO dates).
- **`DateInput` `showTime`** — embeds `TimeInput`; when `range` is on, time is also a range. Composite models: `{ date, time }` / `{ from: { date, time }, to: { date, time } }`.
- Shared types: `DateRangeValue`, `TimeRangeValue`, `DateTimeValue`, `DateTimeRangeValue`.

### Changed

- **`dateUtils`** — range helpers and calendar cell flags (`isRangeStart` / `isRangeEnd` / `isInRange`).
- **Playground** — DateInput demo toggles for `range` / `showTime`; new TimeInput demo; catalog/README coverage.

## [0.8.0] - 2026-08-22

### Added

- **`SidebarMenu` / `AppLayout` `submenuMode`** — `'flyout' | 'inline'` (default `'flyout'`). Flyout keeps the hover panel; `inline` expands/collapses group children below the trigger on click. Collapsed rail and pinned settings footer groups always stay flyout.
- **Playground Layout demo** — control to switch `submenuMode` live and update the usage snippet.

### Changed

- **`SidebarMenuGroup`** — respects menu-level `submenuMode`; reuses `openKeys` / `defaultOpen` for inline expand; chevron rotates when inline-open; inline open/close animates height and opacity in parallel (~200ms CSS, no leave/enter wait).
- **`SidebarMenu` `openKeys`** — expanded only via group click (sibling accordion). Selecting a leaf or binding `activeId` (route) does **not** auto-expand groups; apps can seed `openKeys` from the route if they want the active path open on reload. Ids accept `.` or `/` hierarchy for active highlighting.
- **`AppLayout` menu** — scrollable nav region with design-system scrollbar (`.ds-scrollbar`); settings footer stays pinned to the bottom of the visible menu column.

## [0.7.13] - 2026-08-22

### Added

- **`Tooltip.flip`** — when the preferred placement would overflow the viewport, flip to the opposite side and clamp residual overflow (default `true`; set `:flip="false"` to keep the preferred side and only clamp).

### Changed

- **Typography tokens** — `--ds-font-xs` raised to **14px** (same readability target as the header locale `Select` / `text-sm`); `--ds-font-sm` stays **14px**. Larger steps bumped for hierarchy: `base` 17px, `md` 18px, `lg` 22px, `xl` 26px, `2xl` 33px, `display` 44px. ADS `--ds-font-size-*` aligned (`xsmall` 13px, `small`/`medium` 14px, `base` 17px, `large` 22px, `xlarge` 26px, `xxlarge` 34px). Root `html` font-size remains 16px.
- **Tailwind v4 `@theme` font sizes** — wire `--text-xs` … `--text-2xl` and `--text-display` to the design tokens so utilities like `text-xs` / `text-sm` actually use the scale. Previously only `--font-size-*` was defined (ignored by Tailwind v4), so most UI stayed at the default 12px while `Select` looked correct.
- **Playground chrome** — dense hardcoded sizes in `playground.css` (10–13px) raised to ~14px; docs headings to 16px. Arbitrary `text-[8px]`–`text-[11px]` in demos/cards replaced with `text-xs`. Locale Select left unchanged.
- **Home sections** — Purpose / Principles / Quick Nav titles and body copy stepped up (`text-base` / `text-sm`) so benefit cards match the new scale.
- **Component micro-type** — Badge overlay pill, Lozenge, Avatar `xs`, Sidebar group labels/shell, DataTable filter hints, DateInput weekday headers, and Tooltip shortcut `kbd` no longer use `text-[9px]`–`text-[11px]`; they use `text-xs` (token-driven).
- **Foundations typography table** — documented px values updated to the new ADS scale.
- **Package metadata** — version `0.7.13`; description notes 60+ components.

### Fixed

- **`Badge`** — removed HTML comments from the template that created a multi-root fragment; VTU/`wrapper.classes()` / inline styles now bind to the pill root as expected.
- **Iconography copy snippet tests** — expectations updated to the `iconographyComponents['…']` import snippet (no longer bare `<IconName />`).
- **`dateUtils` calendar test** — asserts `isToday` on the current month grid (June-only grid no longer includes “today” outside June).
- **Collapsed `SidebarMenuItem` Tooltip** — assertion tolerates `targetRef` resolving after mount while still requiring outline / right placement and no native `title`.

## [0.5.2] - 2026-06-29

### Added

- **vue-router integration** — playground navigation is now URL-driven: 4 routes (`/`, `/foundations`, `/catalog`, `/docs`) with `createWebHistory`; catalog component selection via `$route.hash`.
- **`HomePage.vue`** — dedicated route component extracted from `App.vue` shell.

### Changed

- **`App.vue`** — shell-only layout with `<router-view>` and `<router-link>` header nav; provides `openDrawer` via `provide`/`inject`.
- **`PlaygroundCategoryNav.vue`** — self-contained route navigation via `useRouter()`, no props/emits.
- **`HomeQuickNavSection.vue`** — uses `router.push()` instead of emitting `navigate`.
- **`ComponentsCatalogPage.vue`** — component selection uses `router.replace()` with hash, reactive via `$route.hash`.
- **`usePlaygroundGrid.ts`** — removed `activeCat` dependency.

## [0.5.1] - 2026-06-28

### Added

- **Playground locale switcher** — language selector in the header now works correctly; switching between English and Português (Brasil) updates all UI text reactively without a page reload.
- **`FoundationsPage` Iconography tab** — new tab with searchable icon grid, size selector, color picker, and click-to-copy `<ComponentName />` snippet.
- **`FoundationsPage` translations** — all tab labels, section headings, and hint texts are now fully translated via the i18n system (en / pt-BR).
- **`ComponentsCatalogPage` Showcases section** — sidebar nav group and mobile `<optgroup>` listing showcase demos (e.g. AI Chat) separately from library components; selecting a showcase renders `ChatPreviewCard` without API/Usage tables.
- **`FlagGroupDemo` `isDismissible` toggle** — live Switch control and reactive code snippet that conditionally includes `:is-dismissible="true"` on each `<Flag>`.
- **`foundationsPage` i18n keys** — `badge`, `title`, `subtitle`, `tabs.*`, and `sections.*` added to both `en.ts` and `pt-BR.ts`.
- **`HomeChangelogSection`** — reads real entries from `changelogData.ts`; date formatted according to active locale.

### Changed

- **`Select` / `Drawer` / `Modal` / `Tooltip` / `Popover` / `FlagGroup` / `ToastHost` / `DataTableColumnFilterMenu` / `DateInput`** — replaced `z-[--ds-z-*]` Tailwind arbitrary values with `z-[var(--ds-z-*)]`; Tailwind v4 was generating invalid `z-index: --ds-z-dropdown` (no `var()`) causing dropdowns and overlays to render behind the sticky header.
- **`FoundationsPage` header** — aligned with `ComponentsCatalogPage` and `DocumentationPage` style: `Layers` icon, `md:p-8` padding, `max-w-2xl` subtitle, `mb-4` badge row spacing.
- **`FoundationsPage` color tokens grid** — switched from `flex flex-wrap` to CSS grid (`minmax(180px, 1fr)`) so token names and resolved values are always fully visible without truncation.
- **`FoundationsPage` motion grid** — switched from `flex flex-wrap gap-8` to CSS grid (`minmax(160px, 1fr)`); all five easing buttons stay on one consistent row.
- **`ColorSwatch`** — width fills grid cell; token name and resolved value use `break-all` so long values like `color-mix(in srgb, ...)` wrap naturally instead of overflowing.
- **`ShadowCard`** — width fills grid cell; token name uses `break-all`; preview card scales to cell width.
- **`MotionDemo`** — changed from `inline-flex items-center` to `flex items-start`; button has `self-start`; label text left-aligned.
- **`HomeQuickStartSection` copy button** — replaced custom `.copy-btn` styles with `pg-usage-copy` class to match `UsageBlock` appearance on `DocumentationPage`.
- **`HomeChangelogSection`** — `changelogData.ts` rewritten with real versions from `CHANGELOG.md` (`0.2.7`, `0.2.6`, `0.1.8`, `0.1.0`) replacing placeholder i18n keys with inline `desc` strings.
- **`App.vue`** — GitHub link uses `<Github>` icon instead of `<ArrowUpRight>`; removed stable badge and version span from header.
- **`PlaygroundHero`** — removed version line and CTA buttons block; hero shows only logo, title, subtitle, and stat pills.
- **i18n** — removed residual `":appearance"` prop references in `en.ts`, `pt-BR.ts`, and `componentCatalogDescriptions.ts` for `Button`, `Flag`, and `SectionMessage`; replaced with `"variant"`.
- **`FormFieldDemo`** — `z-10` added to `<Mail>` icon to ensure visibility when `withIcon=true`; `inputPaddingClass` verified to return `pl-9`.

### Fixed

- **Dropdown/overlay z-index** — `z-[var(--ds-z-dropdown)]` (200) now resolves correctly in browser, fixing `PlaygroundLocaleSelect`, column filter menus, tooltips, and modals being hidden behind the sticky header (`z-40`).
- **`PlaygroundLocaleSelect`** — locale change now updates all translated text reactively; root cause was the invalid z-index preventing interaction with the dropdown panel.

## [0.2.7] - 2026-06-16

### Changed

- **`AppLayout` settings footer** — pin an explicit `SidebarMenuGroup` or lone `SidebarMenuItem` whose `id` matches `settingsMenuId` (default `settings`); removed `settingsMenuLabel` and automatic grouping by id prefix (`settings.*`).
- **Playground Layout demo** — settings use `SidebarMenuGroup id="settings"` with flyout children, or a single `SidebarMenuItem id="settings"` when toggled off.

## [0.2.6] - 2026-06-16

### Added

- **`AppLayout` composed menu** — single `#menu` slot with built-in chevron toggle; items matching `settingsMenuId.*` pin to the settings footer when `:settings-menu="true"`.
- **`AppLayout` settings footer** — `:settings-menu="true"` pins a gear-icon `SidebarMenuGroup` at the bottom of the sidebar (`settings-menu-label`, `settings-menu-id`).
- **`AppLayout` menu models** — `v-model:active-menu-id` and `v-model:open-menu-keys` for composed sidebar state.
- **`SidebarMenuGroup.flyoutPlacement`** — `'auto' | 'down' | 'up'`; settings group in `AppLayout` opens upward by default.

### Changed

- **`AppLayout`** — single `#menu` slot replaces `#menu-items` / `#settings-menu`; built-in collapse toggle; settings items identified by id prefix (`settings.*` by default).
- **`SidebarMenu`** — selects the first registered item when `activeId` is empty; top-level items no longer activate sibling groups that share an id prefix (e.g. `todos.all` vs group `todos`).
- **Playground Layout demo** — composed menu, settings toggle, default active item `dashboard`.
- **Package README** — `AppLayout` examples and sidebar id conventions aligned with the playground catalog.

### Fixed

- **`SidebarMenuGroup`** — icon/chevron active styles no longer treat all groups as selected on first paint.
- **`AppLayout`** — content region height, footer visibility, and settings submenu flyout direction near the viewport bottom.

## [0.1.8] - 2026-06-16

### Added

- **`DateInput`** — date field with calendar popover and locale-aware display (e.g. `dd/mm/aaaa` in pt-BR).
- **Playground Library** — catalog of 58 exported components with descriptions, usage snippets, and *Open playground* when a demo exists.
- **28 interactive drawer demos**, including `Input`, `DateInput`, `Switch`, `RadioGroup`, `FormField`, `Dialog`, `Drawer`, `Tooltip`, `Popover`, `Progress`, `Skeleton`, and `Layout Primitives` (Container, Stack, Grid).
- **Showcase section** — composite demos (e.g. AI Chat) separated from library component playgrounds.
- **Playground aliases** — subcomponents (e.g. `AppLayout`, `TabPanel`, `PageSizeSelect`) open the parent demo.
- **Playground i18n** — English and pt-BR for UI, DataTable labels, and component catalog descriptions.
- **Button shadow tokens** — `--primary-shadow`, `--destructive-shadow`, and hover variants for primary and danger appearances.
- **`playground/demos/`** registry for modular drawer demos.

### Changed

- **`DataTable`** — only one column filter open at a time; i18n labels; `locale` prop for date cell formatting; responsive pagination footer.
- **`Pagination`** — improved mobile/tablet layout.
- **Playground navigation** — hover states on category tabs (`.pg-nav-btn`).
- **Playground hero** — dynamic version from `package.json`; Playground button scrolls to the current category’s demo grid.
- **`FormField` playground** — example with leading/trailing icons via composition pattern.
- **README** (root and package) — updated for 58 components, playground structure, DateInput, Card slots, Switch vs Toggle.

### Fixed

- Column filter popovers using native `type="date"` replaced by `DateInput` for consistent pt-BR UX.
- Primary button hover feedback (symmetric glow shadow; playground `ds-glow-primary` no longer overrides hover).

## [0.1.0] - 2026-06-16
