# ExportConfirmDialog's stories pass the wrong props, and its copy is title case

## Status: NOT STARTED

The export dialog's stories show no counts, and its labels break our sentence-case rule. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`ExportConfirmDialog` takes snake_case props (`current_view_count`, `total_count`), but its stories pass camelCase (`currentViewCount`, `totalCount`), so Storybook shows "( transactions)" with no numbers. Its option labels are title case ("Current Page (100 transactions)", "All Filtered Transactions (…)"), against design-standards' sentence-case rule for UI text.

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
- [ ] Bump the lib-ui pin in design-standards and update the page above

## Related Files

- `src/components/ExportConfirmDialog.jsx:12-13,52,64`; `src/components/ExportConfirmDialog.stories.js:23-27`
