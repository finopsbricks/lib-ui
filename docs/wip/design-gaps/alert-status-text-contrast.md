# Alert warning, success and destructive text fails contrast

## Status: NOT STARTED

The coloured text of three Alert variants is under 4.5:1 on its band. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`Alert` (and `AlertBox`, which wraps it) colours its title and description with the status colour: `warning` is `text-amber-600` on `bg-amber-50` (about **3.1:1**), `success` is `text-green-600` on `bg-green-50` (about **3.1:1**), and `destructive` is `text-destructive` on `bg-destructive/10` with the description at 90% (about **4:1**). All three are `text-sm`, so they need 4.5:1. The `default` (info) variant passes.

**Pages that document today's behaviour** (update them once this is fixed):
- [Banner](https://design.echoalex.com/components/banner) (`content/components/banner.mdx` in design-standards)
- [Blankslate](https://design.echoalex.com/components/blankslate) (`content/components/blankslate.mdx` in design-standards)

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

- `src/primitives/alert.jsx:13-18`: variants
- `src/components/AlertBox.jsx`: maps `color` to these variants
