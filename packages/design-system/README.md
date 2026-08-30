# @netragate/design-system

**Vue 3** component library with design tokens, Tailwind CSS 4, and **light/dark mode** support.

- **npm:** [`@netragate/design-system`](https://www.npmjs.com/package/@netragate/design-system)
- **Repository:** [github.com/netragate/ds](https://github.com/netragate/ds)
- **Playground:** [netragate.github.io/ds](https://netragate.github.io/ds/)

## Requirements

- **Vue** `^3.5.0` (peer dependency)
- **Node.js** 18+

## Installation

```bash
npm install @netragate/design-system vue
```

## Quick setup

### 1. Import styles

In your app entry point (e.g. `main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'
import '@netragate/design-system/styles.css'

createApp(App).mount('#app')
```

### 2. Use components

```vue
<script setup lang="ts">
import { Button, Input, FormField } from '@netragate/design-system'
</script>

<template>
  <FormField :label="'Email'">
    <Input v-model="email" :placeholder="'you@company.com'" />
  </FormField>

  <Button :variant="'primary'">Save</Button>
</template>
```

### 3. Dark mode (optional)

Add the `dark` class on `<html>` to use dark tokens:

```html
<html lang="en" class="dark">
```

Or toggle at runtime:

```ts
document.documentElement.classList.toggle('dark', isDark)
```

## Playground

The local playground (`npm run dev`) includes:

- **Home** — interactive cards by category (forms, layout, feedback, foundations)
- **Library** — catalog of **63 components** with description, usage snippet, and *Open playground* when a demo exists
- **Docs** — installation, toasts, DataTable, dark mode
- **38 drawer demos** — Button, IconButton, Link, Input, Textarea, Label, DateInput, TimeInput, FormField, DataTable, Layout, Dialog, etc.; controls update the **Usage** snippet in real time
- **Showcase** — composed demos (e.g. AI Chat), not exported as library components
- **i18n** — English and Portuguese (pt-BR)

Library subcomponents (e.g. `TabPanel`, `AppLayout`, `PageSizeSelect`) open the parent component demo via an internal alias map.

## Forms

### Input with icon (composition)

`Input` and `FormField` do **not** have an `icon` prop. Add icons via the `FormField` slot with a `relative` wrapper:

```vue
<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { FormField, Input } from '@netragate/design-system'
</script>

<template>
  <FormField :label="'Email'" :required="true">
    <template #default="{ id }">
      <div class="relative">
        <Mail
          :size="14"
          class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input :id="id" v-model="email" :type="'email'" class="pl-9" />
      </div>
    </template>
  </FormField>
</template>
```

### Switch vs Toggle

| Component | Use |
|-----------|-----|
| **`Switch`** | Pill on/off control (`role="switch"`), sizes `sm` / `md` |
| **`Toggle`** | Preference row: label + `Switch` (bordered setting row) |

`Input`, `Textarea`, `DateInput`, and `Badge` accept `:size` (`sm` / `md` / `lg` on inputs; `Badge` only `sm` | `md`).

### DateInput

Date field with calendar. **Display** follows `locale` (`en` → `mm/dd/yyyy`, `pt-BR` → `dd/mm/yyyy`); persisted value is ISO `YYYY-MM-DD`.

- `:range="true"` — start→end selection in the calendar (`{ from, to }`); opens **two months** side by side
- `:show-time="true"` — embeds `TimeInput` (`HH:mm:ss`); with `range`, time is also a range
- `:max-range-days="7"` — **inclusive** max day span for range (omit / `≤0` = no limit); out-of-range days are disabled after the first click
- In `range` mode, the footer uses **Confirm** (prop `confirmLabel`); the calendar closes only on confirm and `v-model` updates at that moment (selection and time stay pending until Confirm)

```vue
<DateInput v-model="date" :locale="'en'" />
<DateInput v-model="range" :range="true" :max-range-days="7" :locale="'en'" />
<DateInput v-model="dateTime" :show-time="true" :locale="'pt-BR'" />
```

### TimeInput

**`HH:mm:ss`** (24h) time field, with optional `:range` for `{ from, to }`. Labels follow `locale`; time format does not change by language.

```vue
<TimeInput v-model="time" />
<TimeInput v-model="timeRange" :range="true" />
```

## Card

Single `Card` component with slots — there are no separate `CardHeader` / `CardContent` / `CardFooter` components:

```vue
<Card :variant="'outlined'">
  <template #header>
    <h3 class="font-semibold">Title</h3>
  </template>

  Main content.

  <template #footer>
    <Button :variant="'primary'">Save</Button>
  </template>
</Card>
```

Variants: `elevated` | `outlined` | `flat`.

## DataTable

Full table with global search, **multi-sort** (Ctrl+click / ⌘+click), column filters, pagination, and rows-per-page selector.

### Columns

```ts
import type { DataTableColumn } from '@netragate/design-system'

const columns: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, filter: 'text' },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    filter: 'enum',
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  { key: 'createdAt', label: 'Created', sortable: true, filter: 'date' },
]
```

Filter types: `'text'` | `'date'` (from/to) | `'enum'` (multi-select). The filter icon in the header opens a popover per column.

### Client-side usage

```vue
<script setup lang="ts">
import { DataTable, Lozenge } from '@netragate/design-system'
import type { DataTableColumnFilters, DataTableSortEntry } from '@netragate/design-system'
import { ref } from 'vue'

const columns = [/* ... */]
const rows = ref([/* ... */])
const page = ref(1)
const pageSize = ref(10)
const sortStack = ref<DataTableSortEntry[]>([])
const columnFilters = ref<DataTableColumnFilters>({})
</script>

<template>
  <DataTable
    v-model:sort-stack="sortStack"
    v-model:column-filters="columnFilters"
    v-model:page-size="pageSize"
    v-model:current-page="page"
    :columns="columns"
    :rows="rows"
    :row-key="'id'"
  >
    <template #cell-status="{ value }">
      <Lozenge :variant="'success'">{{ value }}</Lozenge>
    </template>
  </DataTable>
</template>
```

- **Click** header: sort one column (`asc` → `desc` → clear)
- **Ctrl+click** (⌘+click on Mac): add column to multi-sort (no limit)
- **Filter:** button beside sort on columns with `filter` defined

### Server-side usage

```vue
<DataTable
  v-model:search="search"
  v-model:current-page="page"
  v-model:page-size="pageSize"
  v-model:sort-stack="sortStack"
  v-model:column-filters="columnFilters"
  :columns="columns"
  :rows="rows"
  :total="total"
  :loading="loading"
  :server-side="true"
  :row-key="'id'"
  @request="loadFromApi"
/>
```

The `@request` event sends `DataTableRequestParams` (`page`, `pageSize`, `search`, `sortStack`, `columnFilters`).

With `server-side` enabled, column filters use an **Apply** button by default (`columnFilterApply` follows `serverSide`). Type in the popover and click Apply to fire `@request` — avoids reloading on every keystroke and losing input focus. For instant API filtering, pass `:column-filter-apply="false"`.

## Toasts

Mount `ToastHost` once in the root layout and trigger toasts via the composable:

```vue
<script setup lang="ts">
import { ToastHost, useToast } from '@netragate/design-system'

const toast = useToast()

function onSave() {
  toast.success('Changes saved.')
}
</script>

<template>
  <ToastHost />
  <Button :variant="'primary'" @click="onSave">Save</Button>
</template>
```

Available positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.

```ts
toast.error('Failed to save.', {
  position: 'bottom-center',
  dismissible: true,
})
```

Variants: `success` | `error` | `info` | `warning` — opaque semantic background with matching border.

## Overlay

### Popover and Tooltip

Both use `:variant` (not `appearance`):

| Variant | Look |
|---------|------|
| `outline` | Solid background (`bg-popover`) with neutral border — **default** |
| `primary` | Solid neutral background, no border |
| `ghost` | Translucent background with `backdrop-blur` |
| `danger` | Translucent destructive tint, light text |

```vue
<script setup lang="ts">
import { Button, Popover, Tooltip } from '@netragate/design-system'
</script>

<template>
  <Popover :variant="'outline'">
    <template #trigger>
      <Button :variant="'outline'">Open</Button>
    </template>
    <template #content>
      <p class="mb-2 text-sm font-medium">Quick actions</p>
      <p class="text-xs opacity-80">Content anchored to the trigger.</p>
    </template>
  </Popover>

  <Tooltip :content="'Helpful tip'" :variant="'ghost'" :placement="'top'">
    <Button :variant="'outline'">Hover</Button>
  </Tooltip>
</template>
```

### Drawer

Sliding panel with `:placement="'left' | 'right' | 'top' | 'bottom'"` and optional `:close-on-overlay="false"`.

## Examples by category

### Forms

```vue
<script setup lang="ts">
import {
  Checkbox,
  DateInput,
  FormField,
  Input,
  Select,
  Switch,
  Toggle,
} from '@netragate/design-system'
import { ref } from 'vue'

const name = ref('')
const date = ref('')
const role = ref('')
const terms = ref(false)
const notifications = ref(true)
</script>

<template>
  <FormField :label="'Name'" :required="true">
    <Input v-model="name" />
  </FormField>

  <FormField :label="'Date'">
    <DateInput v-model="date" :locale="'en'" />
  </FormField>

  <FormField :label="'Role'">
    <Select
      v-model="role"
      :placeholder="'Select...'"
      :options="[
        { label: 'Designer', value: 'design' },
        { label: 'Engineer', value: 'eng' },
      ]"
    />
  </FormField>

  <Checkbox v-model="terms">I accept the terms</Checkbox>
  <Toggle v-model="notifications">Notifications</Toggle>
  <Switch v-model="notifications" :size="'sm'" />
</template>
```

### Feedback

```vue
<script setup lang="ts">
import { Alert, Badge, Progress, Skeleton, Spinner } from '@netragate/design-system'
</script>

<template>
  <Alert :variant="'success'">Deploy complete.</Alert>
  <Alert :variant="'error'" :dismissible="true">Build failed.</Alert>
  <Badge :value="12" :variant="'primary'" :size="'md'" />
  <Lozenge :variant="'success'">Active</Lozenge>
  <Progress :value="72" />
  <Skeleton class="h-8 w-full" />
  <Spinner :aria-label="'Loading'" />
  <!-- No glow: <Spinner :glow="false" :aria-label="'Loading'" /> -->
</template>
```

### Layout

`AppLayout` organizes page regions (grid + side panel) but does **not** style header, menu, content, panel, or footer. Use the `#menu` slot with `SidebarMenuItem` / `SidebarMenuGroup` — the shell and **chevron toggle** are built in. With `:settings-menu="true"`, pin the node whose `id` matches `:settings-menu-id` (default `settings`) at the menu footer — either a `SidebarMenuGroup` (flyout) or a standalone `SidebarMenuItem` (link). Use `:submenu-mode` to choose flyout vs inline expand for menu groups. See the **Layout** demo in the playground.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AppLayout, Button, SidebarMenuGroup, SidebarMenuItem } from '@netragate/design-system'

const menuCollapsed = ref(false)
const panelOpen = ref(false)
const menuWidth = ref('12rem')
const menuCollapsedWidth = ref('3rem')
const menuLabel = ref('Navigation')
const activeId = ref('dashboard')
const openKeys = ref<string[]>([])
const settingsMenu = ref(true)
const settingsMenuId = ref('settings')
const submenuMode = ref<'flyout' | 'inline'>('flyout')
const pageTitle = ref('Dashboard')
</script>

<template>
  <AppLayout
    v-model:menu-collapsed="menuCollapsed"
    v-model:panel-open="panelOpen"
    v-model:active-menu-id="activeId"
    v-model:open-menu-keys="openKeys"
    class="min-h-svh"
    :menu-width="menuWidth"
    :menu-collapsed-width="menuCollapsedWidth"
    :menu-label="menuLabel"
    :settings-menu="settingsMenu"
    :settings-menu-id="settingsMenuId"
    :submenu-mode="submenuMode"
  >
    <template #header>
      <div class="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <h1 class="text-sm font-semibold text-foreground">My App</h1>
      </div>
    </template>

    <template #menu>
      <SidebarMenuItem :id="'dashboard'" :label="'Dashboard'" />
      <SidebarMenuGroup :id="settingsMenuId" :label="'Settings'" :flyout-placement="'up'">
        <SidebarMenuItem :id="`${settingsMenuId}.profile`" :label="'Profile'" />
      </SidebarMenuGroup>
    </template>

    <div class="flex flex-col gap-4 p-6">
      <p class="text-sm text-muted-foreground">{{ pageTitle }}</p>
      <Button :variant="'outline'" :size="'sm'" @click="panelOpen = true">View details</Button>
    </div>

    <template #panel="{ closePanel }">
      <div class="flex flex-col gap-4 border-l border-border p-6">
        <button type="button" class="self-end text-xs text-muted-foreground hover:text-foreground" @click="closePanel()">
          Close
        </button>
      </div>
    </template>

    <template #footer>
      <div class="border-t border-border bg-card px-4 py-2 text-xs text-muted-foreground">
        Footer
      </div>
    </template>
  </AppLayout>
</template>
```

**Submenu:** `:submenu-mode="'flyout'"` (default) opens children on hover in a floating panel; `:submenu-mode="'inline'"` expands/collapses children **below** the group **on click only**. With a collapsed menu (rail) or settings group pinned at the footer, behavior stays flyout. `active-menu-id` marks the current page (ids with `.` or `/`); it does **not** open groups by itself — use `v-model:open-menu-keys` to pre-open the route path. Opening a group closes siblings at the same level (accordion). The menu list scrolls inside the viewport (`ds-scrollbar` class); settings stays fixed at the visible footer of the aside.

**Settings footer:** with `:settings-menu="true"`, declare in `#menu` a `SidebarMenuGroup` **or** a standalone `SidebarMenuItem` whose `id` **equals** `settings-menu-id` (default `settings`). The id can be any string (e.g. `admin.settings`) — pin matches exact equality. Group → flyout on hover; single item → link in the footer. Do not declare both with the same id at once.

**Sidebar menu IDs**

- Top-level items **outside** a group should not share the group's prefix (avoid `todos.all` next to group `todos` — prefer `all` or ids inside the group, e.g. `todos.active`).
- Bind `v-model:active-menu-id` to the route (or current page id) **on setup** so the active item is marked on reload. Inline groups start **closed**; they open only on click (or if you populate `v-model:open-menu-keys`, e.g. with the active id's ancestors).
- With an empty `active-menu-id`, the first `SidebarMenuItem` is selected after one tick (gives the route time to fill the model).
- Flyouts near the footer open upward — use `:flyout-placement="'up'"` on the settings `SidebarMenuGroup` (`'auto' | 'down' | 'up'`; default `'auto'`).

The default slot (content) fills 100% of available height — use `class="min-h-svh"` on `AppLayout` (or `height: 100%` on `html`, `body`, and `#app`). Header, panel, and footer are still composed by you with Tailwind classes.

### Button icons

Variants: `default` | `primary` | `secondary` | `outline` | `ghost` | `destructive` | `clean` | `link` · sizes: `default` | `sm` | `md` | `lg` | `icon`.

`appearance` still works at runtime as a legacy alias (`danger` → `destructive`, `primary` → `primary`, etc.), but prefer `:variant`.

```vue
<script setup lang="ts">
import { Button } from '@netragate/design-system'
</script>

<template>
  <Button :variant="'primary'" :size="'md'" :icon="'zap'">Action</Button>
</template>
```

300+ icons available via `iconography`, `buttonIcons`, and `iconographySelectOptions`.

## Exported components

| Category | Components |
|----------|-------------|
| **Actions** | `Button`, `IconButton`, `Link` |
| **Forms** | `Input`, `DateInput`, `TimeInput`, `Textarea`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Toggle`, `Select`, `Label`, `FormField` |
| **Feedback** | `Alert`, `Badge`, `Spinner`, `Progress`, `Skeleton`, `Toast`, `ToastHost` |
| **Navigation** | `Tabs`, `TabList`, `Tab`, `TabPanel`, `Breadcrumb`, `BreadcrumbItem`, `Pagination`, `SidebarMenu*` |
| **Data display** | `Card`, `Divider`, `Avatar`, `AvatarGroup`, `Lozenge`, `Table*`, `DataTable`, `DataTableColumnFilter*`, `PageSizeSelect`, `List`, `ListItem`, `EmptyState` |
| **Overlay** | `Modal`, `Dialog`, `Tooltip`, `Popover`, `Drawer` |
| **Layout** | `Container`, `Stack`, `Grid`, `AppLayout` |
| **Utils** | `cn`, `useToast`, `buttonVariants`, `iconography` |

`Pagination` includes first/last page buttons (`«` `»`).

## TypeScript

Types are included in the package — no separate `@types` needed.

```ts
import type {
  ButtonIconName,
  DataTableColumn,
  DataTableColumnFilters,
  DataTableRequestParams,
  DataTableSortEntry,
  SelectOption,
  SortDirection,
  ToastPosition,
} from '@netragate/design-system'
```

## Local development

```bash
npm install
npm run dev
```

Playground at [http://localhost:5173](http://localhost:5173).

```bash
npm run build:lib        # library → dist/
npm run build:playground # static playground (GitHub Pages)
npm run test             # Vitest
```

## License

MIT
