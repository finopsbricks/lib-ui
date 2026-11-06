# Combobox can't be linked to a label

## Status: NOT STARTED

`Combobox` takes no `id`, so a `Label` can't point at it. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`Combobox` doesn't accept or pass through an `id` (or `aria-labelledby`) to its trigger button. `<Label htmlFor>` has nothing to point at, so the field has no accessible name from its visible label, and clicking the label doesn't focus the control.

**Pages that document today's behaviour** (update them once this is fixed):
- [Autocomplete](https://design.echoalex.com/components/autocomplete) (`content/components/autocomplete.mdx` in design-standards)

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

- `src/primitives/combobox.jsx:38`
