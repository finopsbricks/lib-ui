# CustomTab's tab list has no accessible name

## Status: NOT STARTED

Page tabs are announced as an unnamed tab list. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`CustomTab` renders Radix `TabsList` with no `aria-label` or `aria-labelledby`, and takes no prop to pass one. Screen readers announce "tab list" with no name; on a page with more than one set of tabs they can't be told apart.

**Pages that document today's behaviour** (update them once this is fixed):
- [Underline nav](https://design.echoalex.com/components/underline-nav) (`content/components/underline-nav.mdx` in design-standards)

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

- `src/components/CustomTab.jsx:44`
