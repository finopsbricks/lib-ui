# DataTable can't start sorted

## Status: NOT STARTED

`initialState.sorting` is ignored, so a table can't open with a default sort. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`DataTable` holds `sorting` in its own `useState([])` and passes it to TanStack as controlled `state.sorting`. Controlled state wins over `initialState`, so `initialState={{ sorting: [...] }}` has no effect: every table opens unsorted, with no arrow on any column. Pages that want "newest first" must pre-sort the rows and the sorted column shows no arrow, so the order isn't visible. design-standards' DataTable page told consumers to use `initialState.sorting`; it now says the table can't start sorted.

**Pages that document today's behaviour** (update them once this is fixed):
- [DataTable](https://design.echoalex.com/components/data-table) (`content/components/data-table.mdx` in design-standards)

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

- `src/primitives/data-table/data-table.jsx:161,182,188`
