# StatsBarContainer rounds numbers and colours them by sign

## Status: NOT STARTED

Money in the stats bar loses its paise, and negative values turn amber. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`StatsBarContainer` turns a number `value` into whole units with `toFixed(0)` (`245000.5` shows as `2,45,001`), against the rule that money keeps every digit. With no `color`, a metric is coloured `success` when positive and `warning` otherwise, so a debit or a negative balance reads as a warning: money direction isn't status. Consumers pass money as pre-formatted elements to avoid both. Already a row in design-standards' app-design-system-rollout WIP.

**Pages that document today's behaviour** (update them once this is fixed):
- [Stats bar](https://design.echoalex.com/components/stats-bar) (`content/components/stats-bar.mdx` in design-standards)

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

- `src/components/StatsBarContainer.jsx:18,25-29`
