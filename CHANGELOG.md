# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## [0.5.0] - 2026-08-08

### Added
- `DataTable` accepts an opt-in `tableLayout` prop (`"auto"` default, `"fixed"`
  available) — under the default `table-layout: auto`, a `white-space: nowrap`
  cell can never render narrower than its full content width no matter what
  size is declared, which is why truncation didn't work for wide columns.
  `"fixed"` opts in per-consumer without changing existing behavior for
  everyone else.
- Keyboard support for column resizing: the resize handle is focusable
  (`role="separator"`, `tabIndex={0}`), `ArrowLeft`/`ArrowRight` nudge the
  column width, and `Enter`/`Space` auto-fit it — parity with drag/double-click
  for keyboard and screen-reader users.
- Double-click (or Enter/Space) on a column's resize handle auto-fits it to
  its widest currently-rendered cell, measured via an offscreen probe element
  (works regardless of a cell's inner DOM shape — plain text, a Badge, a
  truncate wrapper — and correctly reflects true content width even under
  `tableLayout="fixed"`, where the cell's own box no longer grows to fit).

### Changed
- Resize handle affordance is now a persistently-visible subtle divider
  (darkens on hover/active/drag) instead of a 3px strip at `opacity-0` until
  hover — the old version was easy to miss entirely.
- `SortableHeader`'s button height reduced `h-8` → `h-6`, and `DataTable`'s
  per-size header height/padding is now applied directly on the header cell
  rather than via arbitrary-descendant classes that a hardcoded height on the
  header cell was silently overriding — headers were rendering taller than
  intended regardless of the `size` prop.

### Fixed
- Column pinning set both `left` and `right` sticky offsets whenever *either*
  side had a pinned column, which could produce unpredictable sticky
  positioning once real right-pinned columns existed alongside left-pinned
  ones. Each offset is now only set for the side a column is actually pinned
  to.
- Pinned (frozen) cells need an opaque background to hide horizontally
  scrolled content underneath, which also blocked the row's own
  hover/selected highlight from ever showing through — frozen columns looked
  unresponsive to hover or selection. Fixed via a `--row-bg` custom property
  the row sets on hover/selection that pinned cells read, instead of two
  competing `!important` background rules.
- The resize handle was absolutely positioned without its own header cell
  having `position: relative`, so it escaped to the nearest positioned
  ancestor (the outer scroll wrapper) and every column's handle landed in
  the same wrong place near the table's right edge instead of that column's
  own border.

## [0.4.0] - 2026-03-04

### Changed
- Move amplitude exports from main barrel to dedicated `@fob/lib-ui/amplitude` subpath
- Remove amplitude from direct dependencies; now optional peer dependencies

### Removed
- Amplitude re-exports from main `@fob/lib-ui` entry point (use `@fob/lib-ui/amplitude` instead)

## [0.2.0] - 2026-02-18

### Added

- **CronScheduler component suite** - Complete scheduling UI
  - CronBuilderTabs - Tab-based cron builder interface
  - CronFieldEditor - Field-level cron editing
  - CronPresetButtons - Common schedule presets
  - CronPreview - Visual preview of scheduled runs
  - CronRawInput - Raw cron expression input
  - CronScheduler - Main scheduler component
- **Cron utility functions** (`@fob/lib-ui/utils/cron`)
  - `buildCronExpression` - Construct cron expressions programmatically
  - `getCronDescription` - Human-readable cron descriptions
  - `getNextRuns` - Calculate next execution times
  - `parseCronExpression` - Parse cron strings into components
  - `validateCron` - Validate cron expression syntax
- **New components**
  - AlertBox - Styled alert/notification display
  - AppBreadcrumbs - Application navigation breadcrumbs
  - CustomTab - Custom tab navigation component
  - DatePicker - Date selection with calendar
  - ExportConfirmDialog - Export confirmation modal
  - GoogleIcon - Google Material Design icons
  - Link - Navigation link component
  - Markdown - Markdown content renderer with GFM support
  - MultiSelect - Multi-selection dropdown
  - OutlineToggleGroup - Outlined toggle button group
  - PageHeader - Page header with title and actions
  - Pagination - Pagination controls
  - ProgressProvider - Progress bar provider (bprogress)
  - ServiceWorkerRegistration - PWA service worker setup
  - SnackbarProvider - Toast/snackbar notification system
- **Storybook stories** for all new components
- **GitHub Actions CI workflow** for automated testing

### Changed

- **BREAKING**: Renamed `src/ui/` to `src/primitives/` for cleaner import paths
  - Update imports from `@fob/lib-ui/ui/*` to `@fob/lib-ui/primitives/*`
- Updated package.json exports to reflect new directory structure

### Fixed

- Component rendering bug fix

## [0.1.0] - 2026-01-24

### Added

- Initial UI component library with 40+ shadcn/ui-based components
  - Core inputs: Button, Input, Textarea, Checkbox, Switch, Select, Slider
  - Dialogs: Dialog, AlertDialog, Sheet, Popover, Tooltip
  - Navigation: Tabs, Accordion, Collapsible, Breadcrumb, Sidebar
  - Data display: Table, DataTable with DateHeader, Card, Badge, Avatar
  - Layout: Stack, Separator, Resizable panels, ScrollArea
  - Feedback: Progress, Skeleton, Sonner (toast), Alert
  - Advanced: Command palette, Combobox, Calendar, Timeline, DropdownMenu
  - Typography system with semantic components
  - Toggle and ToggleGroup components
  - Label component
- Storybook v9 configuration with Next.js framework
  - Story files for Button, Dialog, Input, Select, Typography, DateHeader
  - Test runner with JUnit output for CI integration
  - Custom preview and manager configuration
- Next.js compatibility
  - PostCSS configuration for Tailwind CSS v4
  - next.config.mjs with transpilePackages support
- Custom hooks
  - `use-mobile` hook for responsive breakpoint detection
- Utility functions
  - `cn()` helper for className merging (clsx + tailwind-merge)
- Global styles with CSS custom properties for theming
- Package exports for subpath imports (`@fob/lib-ui/ui/*`, `@fob/lib-ui/hooks/*`, etc.)
