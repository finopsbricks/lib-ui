# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

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
