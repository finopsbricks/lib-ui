# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

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
