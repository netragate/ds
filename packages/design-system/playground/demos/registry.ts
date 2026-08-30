import type { Component } from 'vue'

type DemoModule = { default: Component }

/** Lazy demo loaders — demos load only when the drawer opens that component. */
export const playgroundDemoLoaders: Record<string, () => Promise<DemoModule>> = {
  IconButton: () => import('./IconButtonDemo.vue'),
  Link: () => import('./LinkDemo.vue'),
  Input: () => import('./InputDemo.vue'),
  Chip: () => import('./ChipDemo.vue'),
  Textarea: () => import('./TextareaDemo.vue'),
  Label: () => import('./LabelDemo.vue'),
  Badge: () => import('./BadgeDemo.vue'),
  Flag: () => import('./FlagDemo.vue'),
  FlagGroup: () => import('./FlagGroupDemo.vue'),
  Avatar: () => import('./AvatarDemo.vue'),
  Card: () => import('./CardDemo.vue'),
  Tabs: () => import('./TabsDemo.vue'),
  Pagination: () => import('./PaginationDemo.vue'),
  DataTable: () => import('./DataTableDemo.vue'),
  Layout: () => import('./LayoutDemo.vue'),
  Lozenge: () => import('./LozengeDemo.vue'),
  Checkbox: () => import('./CheckboxDemo.vue'),
  DateInput: () => import('./DateInputDemo.vue'),
  TimeInput: () => import('./TimeInputDemo.vue'),
  Switch: () => import('./SwitchDemo.vue'),
  Toggle: () => import('./ToggleDemo.vue'),
  RadioGroup: () => import('./RadioGroupDemo.vue'),
  FormField: () => import('./FormFieldDemo.vue'),
  Dialog: () => import('./DialogDemo.vue'),
  Modal: () => import('./ModalDemo.vue'),
  Drawer: () => import('./OverlayDrawerDemo.vue'),
  Tooltip: () => import('./TooltipDemo.vue'),
  Popover: () => import('./PopoverDemo.vue'),
  Progress: () => import('./ProgressDemo.vue'),
  Skeleton: () => import('./SkeletonDemo.vue'),
  SectionMessage: () => import('./SectionMessageDemo.vue'),
  Spinner: () => import('./SpinnerDemo.vue'),
  'Layout Primitives': () => import('./LayoutPrimitivesDemo.vue'),
}

export async function loadPlaygroundDemoComponent(name: string): Promise<Component | undefined> {
  const loader = playgroundDemoLoaders[name]
  if (!loader) return undefined
  const mod = await loader()
  return mod.default
}
