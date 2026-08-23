export interface CatalogGroup {
  category: string
  items: string[]
}

/** Library catalog — source of truth for component count on the playground home. */
export const catalogGroups: CatalogGroup[] = [
  { category: 'Layout', items: ['AppLayout', 'Container', 'Stack', 'Grid'] },
  { category: 'Actions', items: ['Button', 'IconButton', 'Link'] },
  {
    category: 'Forms',
    items: [
      'Input',
      'DateInput',
      'TimeInput',
      'Textarea',
      'Checkbox',
      'Radio',
      'RadioGroup',
      'Switch',
      'Toggle',
      'Select',
      'Label',
      'FormField',
      'Chip',
    ],
  },
  {
    category: 'Feedback',
    items: [
      'Alert',
      'Badge',
      'Flag',
      'FlagGroup',
      'Spinner',
      'Progress',
      'Skeleton',
      'SectionMessage',
      'Toast',
      'ToastHost',
    ],
  },
  {
    category: 'Navigation',
    items: [
      'Tabs',
      'TabList',
      'Tab',
      'TabPanel',
      'Breadcrumb',
      'BreadcrumbItem',
      'Pagination',
      'SidebarMenu',
      'SidebarMenuItem',
      'SidebarMenuGroup',
      'SidebarMenuShell',
    ],
  },
  {
    category: 'Data display',
    items: [
      'Card',
      'Divider',
      'Avatar',
      'AvatarGroup',
      'Lozenge',
      'Table',
      'TableHead',
      'TableBody',
      'TableRow',
      'TableCell',
      'DataTable',
      'DataTableColumnFilter',
      'DataTableColumnFilterMenu',
      'PageSizeSelect',
      'List',
      'ListItem',
      'EmptyState',
    ],
  },
  { category: 'Overlay', items: ['Modal', 'Dialog', 'Tooltip', 'Popover', 'Drawer'] },
]

export const catalogComponentCount = catalogGroups.reduce(
  (total, group) => total + group.items.length,
  0,
)
