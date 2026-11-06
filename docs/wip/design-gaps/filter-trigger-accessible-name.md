# FilterTrigger's buttons have no accessible name

## Status: NOT STARTED

The filter panel's fold button and phone filter button are icon-only with no name. Found while writing the design-standards filter panel page (2026-11-06).

---

## Problem Statement

`FilterTrigger` renders an icon-only `Button` in all three variants: `desktop` (ChevronLeft), `collapsed` (ChevronRight with the applied count in a Badge) and `mobile` (a floating Funnel button with the count). None has an `aria-label`, and the component takes no prop for one. Screen readers announce "button" with no name and no applied count. Every filter panel in ledger, orchestrator, statements and txn uses it.

It also colours the phone button with a raw palette class (`bg-blue-600 hover:bg-blue-700` when filters are applied), not a token.

**Pages that document today's behaviour** (update them once this is fixed):
- [Filter panel](https://design.echoalex.com/components/filter-panel) (`content/components/filter-panel.mdx` in design-standards)

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

- `src/components/FilterTrigger.jsx`
