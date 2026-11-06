# SettingsContainer doesn't stack on phones

## Status: NOT STARTED

The settings navigation and content stay side by side at every width. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`SettingsContainer` is `flex gap-4` with the 192px (`w-48`) `SettingsNavigation` beside a `flex-1` column, at every width. At 390px the content column is about 160px wide: forms and tables are squeezed or overflow. Used on the settings pages of 8 apps.

**Pages that document today's behaviour** (update them once this is fixed):
- [Split page layout](https://design.echoalex.com/components/split-page-layout) (`content/components/split-page-layout.mdx` in design-standards)
- [Responsive](https://design.echoalex.com/foundations/responsive) (`content/foundations/responsive.mdx` in design-standards)

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

- `src/components/SettingsContainer.jsx:13-17`
- `src/components/SettingsNavigation.jsx:47`
