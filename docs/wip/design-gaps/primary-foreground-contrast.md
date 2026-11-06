# `text-primary-foreground` on `bg-primary` fails text contrast

## Status: NOT STARTED

The label colour on primary surfaces is under the 4.5:1 text minimum in light mode. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

In light mode `--primary` is `oklch(0.623 0.214 259.815)` (`#2b7fff`) and `--primary-foreground` is `oklch(0.97 0.014 254.604)` (`#eff6ff`). Their contrast is **3.46:1**, under WCAG AA's 4.5:1 for normal text. Every surface that puts text on `bg-primary` fails: the Button `default` variant (14px label), the Badge `default` variant (12px) and Tooltip (12px). Dark mode passes (`#fafafa` on `#155dfc`, 5.03:1).

**Pages that document today's behaviour** (update them once this is fixed):
- [Button](https://design.echoalex.com/components/button) (`content/components/button.mdx` in design-standards)
- [State label](https://design.echoalex.com/components/state-label) (`content/components/state-label.mdx` in design-standards)
- [Tooltip](https://design.echoalex.com/components/tooltip) (`content/components/tooltip.mdx` in design-standards)
- [Color](https://design.echoalex.com/primitives/color) (`content/primitives/color.mdx` in design-standards)

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

- `src/styles/globals.css:58-59`: light `--primary` and `--primary-foreground`
- `src/primitives/button.jsx:15`: `default` variant
- `src/primitives/badge.jsx:12`: `default` variant
- `src/primitives/tooltip.jsx:61,67`: content and arrow
