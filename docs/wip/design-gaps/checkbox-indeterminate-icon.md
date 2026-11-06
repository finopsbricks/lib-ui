# Checkbox shows a tick for the indeterminate state

## Status: NOT STARTED

An indeterminate checkbox looks checked. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`Checkbox`'s indicator always renders `Check`. Radix shows the indicator for both `checked` and `indeterminate`, so a "some selected" checkbox (a select-all header) looks fully checked. Screen readers hear `aria-checked="mixed"` correctly, but sighted users see a tick. design-standards tells consumers not to use indeterminate for now.

**Pages that document today's behaviour** (update them once this is fixed):
- [Checkbox](https://design.echoalex.com/components/checkbox) (`content/components/checkbox.mdx` in design-standards)
- [Checkbox group](https://design.echoalex.com/components/checkbox-group) (`content/components/checkbox-group.mdx` in design-standards)

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

- `src/primitives/checkbox.jsx:21-25`
