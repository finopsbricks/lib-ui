# SettingsNavigation uses hard-coded greys, blue and white

## Status: NOT STARTED

The settings side navigation ignores the theme. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`SettingsNavigation` styles itself with `bg-white`, `border-gray-200`, `text-gray-600`, `hover:bg-gray-100`, and marks the selected item `bg-gray-100 text-gray-900 border-r-2 border-blue-500`. None are tokens, so in dark mode the panel stays white, and the selected item doesn't match the sidebar's selected style (`bg-sidebar-accent`). Used on the settings pages of 8 apps.

**Pages that document today's behaviour** (update them once this is fixed):
- [Split page layout](https://design.echoalex.com/components/split-page-layout) (`content/components/split-page-layout.mdx` in design-standards)

## Proposed Solution

To be defined when work on this WIP starts.

## Implementation Phases

### Phase 1: Define the solution ❌
- [ ] Agree the fix with Alex and write it in Proposed Solution

### Phase 2: Fix and release ❌
- [ ] Break down once the solution is defined

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and update the pages above

## Related Files

- `src/components/SettingsNavigation.jsx:35-38,47`
