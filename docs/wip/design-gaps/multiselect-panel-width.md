# MultiSelect's panel is narrower than its button

## Status: NOT STARTED

The option panel doesn't match the trigger's width. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`MultiSelect`'s `PopoverContent` uses `w-[--radix-popover-trigger-width]`. In Tailwind v4 an arbitrary value with a bare custom property isn't wrapped in `var()`, so the class sets no width and the panel falls back to its content width: about 215px under a 288px full-width button. Long option descriptions are cut short and the panel looks detached from its field.

**Pages that document today's behaviour** (update them once this is fixed):
- [SelectPanel](https://design.echoalex.com/components/select-panel) (`content/components/select-panel.mdx` in design-standards)

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

- `src/components/MultiSelect.jsx:110`
