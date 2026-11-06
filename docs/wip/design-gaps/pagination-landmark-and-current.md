# Pagination has no navigation landmark or current-page marker

## Status: NOT STARTED

`Pagination` renders bare buttons and text, with no `nav` and no `aria-current`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`Pagination` renders Previous and Next and a "Page X of Y" line with no `<nav aria-label="Pagination">` around them, so it isn't a landmark screen reader users can jump to, and nothing carries `aria-current`. At the ends, the disabled control becomes a `disabled` `button` that keyboard users can't reach. Its links also use `Button asChild`, see [button-aschild-icon-wrap.md](../button-aschild-icon-wrap.md). Used in orchestrator and statements.

**Pages that document today's behaviour** (update them once this is fixed):
- [Pagination](https://design.echoalex.com/components/pagination) (`content/components/pagination.mdx` in design-standards)

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

- `src/components/Pagination.jsx:27,33,51,57`
