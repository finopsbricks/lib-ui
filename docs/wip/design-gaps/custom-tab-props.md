# CustomTab's `variant` does nothing, and apps pass props it ignores

## Status: NOT STARTED

CustomTab's props don't match how it is documented and used. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`CustomTab` accepts `variant` (default `'plain'`) but never reads it. Apps also pass an `activeTab` prop, which CustomTab doesn't accept: it always reads the tab from the query string (`tabName`). Callers think they control these and don't.

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

- `src/components/CustomTab.jsx:11-34`
