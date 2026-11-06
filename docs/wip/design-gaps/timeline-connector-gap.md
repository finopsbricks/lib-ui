# Timeline's connector stops short of the next dot

## Status: NOT STARTED

The line between timeline items doesn't reach the next item. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`TimelineConnector` is a fixed `w-0.5 h-6 mt-2` line under each dot. Items are `space-y-6` apart and their content is taller than 24px, so the line ends well before the next dot and the timeline reads as separate events, not one history.

**Pages that document today's behaviour** (update them once this is fixed):
- [Timeline](https://design.echoalex.com/components/timeline) (`content/components/timeline.mdx` in design-standards)

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

- `src/primitives/timeline.jsx:134-137`
