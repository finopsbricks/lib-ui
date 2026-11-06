# CustomTab hard-codes `bg-white`

## Status: NOT STARTED

Page tabs stay white in dark mode. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`CustomTab` sets `bg-white` on the tab bar and on each panel, so in dark mode the tabs and the content under them are a white block on a dark page. Used in orchestrator, statements and txn.

**Pages that document today's behaviour** (update them once this is fixed):
- [Underline nav](https://design.echoalex.com/components/underline-nav) (`content/components/underline-nav.mdx` in design-standards)

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

- `src/components/CustomTab.jsx:43,86`
