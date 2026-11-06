# Sidebar and settings navigation don't mark the current page

## Status: NOT STARTED

`NavItem` and `SettingsNavigation` show the current item visually but never set `aria-current`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`NavItem` passes `isActive` to `SidebarMenuButton`, which sets `data-active` for the style only. `SettingsNavigation` marks its selected link with classes only. Neither sets `aria-current="page"`, so screen reader users aren't told which item is the current page. Affects every app's sidebar and settings pages.

**Pages that document today's behaviour** (update them once this is fixed):
- [Nav list](https://design.echoalex.com/components/nav-list) (`content/components/nav-list.mdx` in design-standards)
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

- `src/components/NavItem.jsx:38,66,88,123`
- `src/components/SettingsNavigation.jsx:25-38`
- `src/primitives/sidebar.jsx`: `SidebarMenuButton` `isActive`
