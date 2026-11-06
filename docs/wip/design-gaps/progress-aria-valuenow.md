# Progress doesn't expose its value to screen readers

## Status: NOT STARTED

`Progress` draws the fill from `value` but never passes it to the Radix root. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`Progress` destructures `value` and uses it only for the indicator's `transform`. The Radix `Progress.Root` never receives it, so it renders `role="progressbar"` with no `aria-valuenow`, `aria-valuetext` or `data-state="loading"`: screen readers announce an indeterminate bar. Consumers must pass `aria-valuenow` themselves (Radix spreads props last, so that works). Used in orchestrator and statements.

**Pages that document today's behaviour** (update them once this is fixed):
- [Progress bar](https://design.echoalex.com/components/progress-bar) (`content/components/progress-bar.mdx` in design-standards)

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

- `src/primitives/progress.jsx:18,32`
