# OutlineToggleGroup can't be given an accessible name

## Status: NOT STARTED

A segmented control is announced with no name for the group. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`OutlineToggleGroup` renders Radix `ToggleGroup` without passing through `aria-label` or `aria-labelledby`, and takes no prop for one. Screen readers announce the options ("Table", "Cards") with no name for what they switch. Only each item's `ariaLabel` is passed. Used for view toggles in orchestrator and statements.

**Pages that document today's behaviour** (update them once this is fixed):
- [Segmented control](https://design.echoalex.com/components/segmented-control) (`content/components/segmented-control.mdx` in design-standards)

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

- `src/components/OutlineToggleGroup.jsx:16-54`
