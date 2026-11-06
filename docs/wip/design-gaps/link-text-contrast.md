# `text-primary` links fail text contrast

## Status: NOT STARTED

Links in `text-primary` are under 4.5:1 on white. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

Links are `text-primary` (`#2b7fff` in light mode), **3.76:1** on white, under the 4.5:1 text minimum. The same blue is the `link` Button variant. Dark mode passes. The token is the same `--primary` as in [primary-foreground-contrast](./primary-foreground-contrast.md); the two may share a fix.

**Pages that document today's behaviour** (update them once this is fixed):
- [Link](https://design.echoalex.com/components/link) (`content/components/link.mdx` in design-standards)
- [Color usage](https://design.echoalex.com/foundations/color-usage) (`content/foundations/color-usage.mdx` in design-standards)

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

- `src/styles/globals.css:58`: light `--primary`
- `src/primitives/button.jsx`: `link` variant
