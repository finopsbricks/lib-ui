# OutlineToggleGroup and MultiSelect type optional props as required

## Status: NOT STARTED

Their JSDoc marks props with defaults as required, which breaks consumer typecheck. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`OutlineToggleGroup` documents `size`, `className` and `variant` as `@param {…} props.size` (required), though each has a default. MultiSelect does the same for its optional props. A `// @ts-check` consumer that leaves them out gets type errors, so design-standards' examples pass them explicitly.

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

- `src/components/OutlineToggleGroup.jsx:12-14`; `src/components/MultiSelect.jsx` (JSDoc)
