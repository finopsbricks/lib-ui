# Checkbox and Radio use a different focus ring

## Status: NOT STARTED

Their focus ring is 2px `ring-ring` with an offset; every other control is 3px `ring-ring/50`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`Checkbox` and `RadioGroupItem` show `focus-visible:ring-2 ring-ring ring-offset-2`. Button, Input, Select, Textarea and Switch show `focus-visible:ring-[3px] ring-ring/50` with `border-ring`. Keyboard focus looks different on these two controls than on the rest of a form.

**Pages that document today's behaviour** (update them once this is fixed):
- [Checkbox](https://design.echoalex.com/components/checkbox) (`content/components/checkbox.mdx` in design-standards)
- [Radio](https://design.echoalex.com/components/radio) (`content/components/radio.mdx` in design-standards)
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

- `src/primitives/checkbox.jsx:16`
- `src/primitives/radio-group.jsx:31`
