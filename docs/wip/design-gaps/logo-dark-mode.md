# Logo disappears in dark mode

## Status: NOT STARTED

The app logo's mark is drawn in black. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`Logo` frames its mark with `border-2 border-black` and the mark itself is black, with no dark-mode value. On the dark sidebar both nearly vanish, so every app's sidebar header loses its logo in dark mode. A brand's logo needs a light and a dark version (design-standards Color, Brand accent; the brand layer on the home page).

**Pages that document today's behaviour** (update them once this is fixed):
- [App sidebar](https://design.echoalex.com/components/app-sidebar) (`content/components/app-sidebar.mdx` in design-standards)

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

- `src/components/Logo.jsx:15`
