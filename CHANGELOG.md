# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## [0.8.1] - 2026-11-09

### Added
- `Logo` takes `bare` (drops the black border and padding, for a logo that is its
  own rounded tile, like Timelog's) and `src` (the logo image, default
  `/logo.svg`). Without them `Logo` renders as before.

### Fixed
- `Logo`'s image no longer has the alt text "Cashflowy" in every app. Beside the
  app's name it is decorative (`alt=""`, the name labels the link); shown alone
  (`offering=""`) its alt is "Home".

## [0.8.0] - 2026-11-09

### Changed
- **The line between the phone layout and the desktop layout moved from `md`
  (768px) to Tailwind's `sm` (640px)**, as Tailwind ships it (no theme
  override; `md` stays 768). Why: layout works in CSS pixels, and a window
  filling half of a current laptop screen is 735–756px wide at default scaling
  (e.g. 748 on a MacBook Pro 16 at Larger Text), so it got the phone layout.
  From 640px up it now gets the desktop shell. Phones (360–440) and a third of
  a laptop screen (490–576) keep the phone layout.
- `useIsMobile()` now returns `true` below 640px (was 768), so `Sidebar`
  switches between the phone sheet and the desktop rail at 640.
- The shell components flip at `sm` with it: `Sidebar`/`SidebarInset`
  (rail vs sheet, inset styles, larger touch hit areas, `showOnHover` menu
  actions), `AppBreadcrumbs` (full trail vs back link), `AdminHeader`,
  `SettingsContainer` and `SettingsNavigation` (navigation beside the content
  vs a row above it).
- `Input` and `Textarea` keep 16px text below 640px (so iOS Safari doesn't zoom
  on focus) and use 14px from 640px up (`text-base sm:text-sm`, was
  `md:text-sm`).
- `Calendar` with `numberOfMonths={2}` shows the months side by side from 640px
  (they need about 490px) and stacks them below.

**What apps must do when upgrading:** between 640 and 767px an app now shows the
desktop shell while its own pages may still stack. Move the app's own
phone/desktop classes from `md:` / `max-md:` to `sm:` / `max-sm:`, and change
any hand-written `min-width: 768px` / `max-width: 767px` media queries (e.g. a
desktop shell lock or a phone `overflow: clip` in `globals.css`) and any
`768`/`767` in JS to `640` / `639`. Keep `md:` only where a page wants a roomier
second step (e.g. stat tiles four across). Check pages at 639 and 640 as well as
390 and 1440.

## [0.7.0] - 2026-11-08

### Fixed
- `SettingsContainer` on phones: below `md` the settings navigation now sits
  above the content instead of beside it (which left settings pages ~160px
  wide and clipped at 390px). The content column has `min-w-0`. Desktop is
  unchanged.
- `SettingsNavigation` on phones: one row of links that scrolls sideways when
  it doesn't fit, keeping the current page in view (also after the row changes
  width). The current link has `aria-current="page"`; the nav is labelled
  "Settings". Desktop is unchanged.
- `AppBreadcrumbs` on phones: a page below the top level shows one link back to
  its parent (`‹ Parent`, accessible name "Back to Parent") instead of only the
  current page's name, so a detail page has a way back up without the sidebar.
  Desktop is unchanged.
- `NavItem` (and `NavSubItem` inside it) close the phone sidebar sheet when a
  link is picked, instead of leaving it open over the new page.
- `NavItem` in the phone sheet shows a section's sub-items as the expandable
  list, not the collapsed-desktop popover: the sheet always shows labels,
  whatever the desktop sidebar's collapsed state.
- Story `DataTable/FrozenColumnsStayHighlightedOnHover` checks the highlight
  through the row's selected state: `userEvent.hover` never puts a row in CSS
  `:hover`, so the story failed in every test run.
- CI runs the Storybook tests on `ubuntu-24.04`: Playwright 1.58 can't install
  browsers on `ubuntu-latest` (26.04).

### Added
- Stories at phone and desktop width with play assertions:
  `SettingsContainer` (OnDesktop, OnPhone, OnPhoneLastItem), `AppBreadcrumbs`
  (OnDesktopDeepInApp, OnPhoneDeepInApp, OnPhoneTopLevel), `NavItem`
  (OnPhoneLinkClosesSheet, OnPhoneSubItemClosesSheet).
- Status tokens: `--warning-subtle`, `--warning-subtle-foreground` and `--warning`
  (icon), and `--info-subtle`, for light and dark, with `@theme` mappings
  (`bg-warning-subtle`, `text-warning-subtle-foreground`, `text-warning`,
  `bg-info-subtle`). They are today's transaction-card comment bands, made into
  named tokens: warning-subtle is matched to info-subtle in lightness and chroma,
  so only the hue differs. See design-standards decision 0002.
- Money direction tokens: `--amount-in` and `--amount-out` (`text-amount-in`,
  `text-amount-out`). Same colours the transaction cards render today
  (emerald-700 / amber-700, dark emerald-400 / amber-400).
- Story "foundations/Status and money colours": swatches, the tokens in use,
  contrast measured from the rendered colours (light and dark), and the
  warning/info match, with play functions that fail if a pair drops below AA.

## [0.6.3] - 2026-10-20

### Fixed
- `PageHeader` on phones: the title and `RightButtons` now share one row below
  640px instead of stacking a short title above a lone button. With actions, a
  long title ellipsizes so the actions stay on screen; actions too wide to sit
  beside the title still wrap onto their own row. Titles without actions are
  unchanged, and so is the layout at 640px and up.
- Storybook test runner sizes each story from its `viewport` global, so phone
  stories are tested at phone width instead of 1366×768.

## [0.6.2] - 2026-10-12

### Fixed
- `DataTable` in dark mode: the table's `bg-gray-50/50` tint rendered as a
  muddy grey slab over the dark background; it's now transparent in dark.
  Pinned header/body cells fall back to `--background` instead of white.
  Light mode unchanged.

## [0.6.1] - 2026-10-11

### Fixed
- Dark theme contrast: `--primary-foreground` / `--sidebar-primary-foreground`
  are now near-white (primary button labels were 1.98:1, now 5.03:1);
  `--ring` / `--sidebar-ring` and `--chart-1` lightened to blue-500 (5.29:1 and
  4.71:1). Light theme unchanged.

## [0.6.0] - 2026-10-11

### Added
- `ThemeProvider` (`@fob/lib-ui/components/ThemeProvider`): Light / Dark / System
  theming via `next-themes`. Toggles the `dark` class on `<html>`, defaults to
  light, and persists the choice in localStorage per origin (works for
  self-hosted apps). The app's `<html>` needs `suppressHydrationWarning`.
- `ThemeMenu` (`@fob/lib-ui/components/ThemeMenu`): a "Theme" sub-menu for an
  app's user dropdown.
- Storybook toolbar toggle to preview any story in light or dark.
- `docs/architecture/theming.md`: how theming works and how to wire an app.
- `Table` exposes its scroll container through `containerClassName`.

### Fixed
- Toasts (`Toaster`/`SnackbarProvider`) followed the OS dark setting even in
  light-only apps, because no theme provider was mounted. Under `ThemeProvider`
  they follow the app's theme.

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
