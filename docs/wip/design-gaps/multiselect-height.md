# MultiSelect is taller than other inputs

## Status: NOT STARTED

The `default` size is 40px; every other input is 36px. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`MultiSelect`'s `default` size is `h-10` (40px). `Input`, `SelectTrigger` and Button `default` are `h-9` (36px), and design-standards says controls on one row share one height. A MultiSelect next to a Select or Input is 4px taller.

**Pages that document today's behaviour** (update them once this is fixed):
- [Select panel](https://design.echoalex.com/components/select-panel) (`content/components/select-panel.mdx` in design-standards)
- [Size](https://design.echoalex.com/primitives/size) (`content/primitives/size.mdx` in design-standards)

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

- `src/components/MultiSelect.jsx:76-79`
- `src/primitives/input.jsx`, `src/primitives/select.jsx`: `h-9`
