# Badge, Alert and Timeline status colours are raw palette classes

## Status: NOT STARTED

Status colours in three components bypass the tokens, so they skip the theme and v0.7.0's status tokens. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

The status variants use Tailwind palette classes, not tokens:
- `Badge` `destructive` / `warning` / `success`: `bg-red-100 text-red-800`, `bg-yellow-100 text-yellow-800`, `bg-green-100 text-green-800`, with **no dark-mode values**: in dark mode they stay light pills.
- `Alert` `warning` / `success`: `amber-*` and `green-*` with hand-written `dark:` values.
- `TimelineDot`: `bg-green-500`, `bg-yellow-500`, `bg-red-500` with `text-white`, no dark values.

A brand layer or a token change doesn't reach them, and they don't use the v0.7.0 status tokens (`warning`, `warning-subtle`, `info-subtle`). Overlaps the deferred Phase 7 (hard-coded colours) of [dark-mode.md](../dark-mode.md).

**Pages that document today's behaviour** (update them once this is fixed):
- [State label](https://design.echoalex.com/components/state-label) (`content/components/state-label.mdx` in design-standards)
- [Banner](https://design.echoalex.com/components/banner) (`content/components/banner.mdx` in design-standards)
- [Timeline](https://design.echoalex.com/components/timeline) (`content/components/timeline.mdx` in design-standards)

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

- `src/primitives/badge.jsx:16,19,21`
- `src/primitives/alert.jsx:15-18`
- `src/primitives/timeline.jsx:112-114`
