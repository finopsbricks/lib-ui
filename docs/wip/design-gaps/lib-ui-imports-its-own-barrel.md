# Components import lib-ui's own barrel, pulling in every module

## Status: NOT STARTED

Four lib-ui components import from `'@fob/lib-ui'` (the package's own index) instead of relative paths. Found while adding live examples to design-standards (2026-11-06).

---

## Problem Statement

`FilterTrigger`, `AdminHeader`, `ErrorMessage` and `AppLayout` import from `'@fob/lib-ui'`. Importing any of them through a deep path (`@fob/lib-ui/components/FilterTrigger`) still loads the whole barrel: every primitive, the Amplitude provider, the cron utilities.

One module in the barrel, `DateHeader.jsx`, types its `date` prop with `import('@/types/general/DateString.types')`. That path is an app alias that exists only inside the apps. Any consumer that typechecks with its own `@/*` alias fails on it. design-standards' `npm run typecheck` (run in CI) fails with TS2307 as soon as a page imports `FilterTrigger`, so its filter-panel example rebuilds FilterTrigger from Button and Badge instead of importing it.

**Pages that document today's behaviour** (update them once this is fixed):
- [Filter panel](https://design.echoalex.com/components/filter-panel) (`content/components/filter-panel.mdx` in design-standards): its examples can import the real `FilterTrigger`

## Proposed Solution

To be defined when work on this WIP starts.

## Implementation Phases

### Phase 1: Define the solution ❌
- [ ] Agree the fix with Alex and write it in Proposed Solution

### Phase 2: Fix and release ❌
- [ ] Break down once the solution is defined

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and update the page above

## Related Files

- `src/components/FilterTrigger.jsx:3`
- `src/components/AdminHeader.jsx`, `src/components/ErrorMessage/ErrorMessage.jsx`, `src/components/layout/AppLayout.jsx`: same import
- `src/primitives/data-table/DateHeader.jsx:14`: the app-only type path
