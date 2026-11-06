# DataTable can't be given a name or caption

## Status: NOT STARTED

The rendered `<table>` has no way to receive a caption or `aria-label`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`DataTable` renders its own `<table>` (with `caption-bottom` in its classes) but takes no `caption`, `aria-label` or `aria-labelledby` prop and passes none through. A table can't be named, so screen readers list it as an unnamed table; on a page with two tables they can't be told apart.

**Pages that document today's behaviour** (update them once this is fixed):
- [Data table](https://design.echoalex.com/components/data-table) (`content/components/data-table.mdx` in design-standards)

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

- `src/primitives/data-table/data-table.jsx:242`
