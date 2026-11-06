# DataTable doesn't expose sort order

## Status: NOT STARTED

Sorted columns show an arrow but set no `aria-sort`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`SortableHeader` shows ArrowUp, ArrowDown or ChevronsUpDown, but neither it nor `DataTable` sets `aria-sort` on the `<th>`. Screen reader users can't tell which column the table is sorted by, or in which direction.

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

- `src/primitives/data-table/SortableHeader.jsx`
- `src/primitives/data-table/data-table.jsx:243`: header cells
