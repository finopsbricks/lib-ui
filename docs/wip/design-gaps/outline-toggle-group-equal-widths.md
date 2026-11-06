# OutlineToggleGroup gives every segment the same width

## Status: NOT STARTED

Segments with an icon and a longer label run into the edge. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`OutlineToggleGroup`'s items share the group's width equally. When one segment has an icon and a longer label ("Timeline") and another is short, the long one runs into its edge while the short one has spare room.

**Pages that document today's behaviour** (update them once this is fixed):
- [SegmentedControl](https://design.echoalex.com/components/segmented-control) (`content/components/segmented-control.mdx` in design-standards)

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

- `src/components/OutlineToggleGroup.jsx:49-54`; `src/primitives/toggle-group.jsx`
