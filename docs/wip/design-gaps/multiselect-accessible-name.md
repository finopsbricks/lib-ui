# MultiSelect's button loses the field's name

## Status: NOT STARTED

The trigger's `aria-label` is its value, so screen readers don't hear which field it is. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`MultiSelect`'s trigger is a `role="combobox"` button whose `aria-label` is `getDisplayText()`: the picked values or "N items selected". An `aria-label` overrides any `<Label htmlFor>`, so screen readers announce "2 items selected, combobox" with no field name. Picked options aren't exposed as selected either: cmdk's `aria-selected` means highlighted. Used in filter panels in ledger, statements and txn.

**Pages that document today's behaviour** (update them once this is fixed):
- [Select panel](https://design.echoalex.com/components/select-panel) (`content/components/select-panel.mdx` in design-standards)

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

- `src/components/MultiSelect.jsx:96-98`
