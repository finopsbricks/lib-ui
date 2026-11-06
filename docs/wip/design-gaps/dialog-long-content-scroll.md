# Dialog content doesn't scroll when it is long

## Status: NOT STARTED

`DialogContent` has no maximum height. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`DialogContent` is centred with `max-w-[calc(100%-2rem)] sm:max-w-lg` but has no `max-h` or `overflow`. A long form or list pushes the dialog past the viewport: the header or the footer buttons end up off screen and can't be reached, worst on phones.

**Pages that document today's behaviour** (update them once this is fixed):
- [Dialog](https://design.echoalex.com/components/dialog) (`content/components/dialog.mdx` in design-standards)

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

- `src/primitives/dialog.jsx:91`
