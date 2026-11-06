# RadioGroup's props have no types

## Status: NOT STARTED

`RadioGroup` and `RadioGroupItem` are `forwardRef` components with no JSDoc props type. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

lib-ui's other primitives type their props with JSDoc, so `// @ts-check` consumers get prop checking. `RadioGroup` and `RadioGroupItem` are wrapped in `React.forwardRef` with no props type, so in a `// @ts-check` file every prop (`defaultValue`, `value`, `onValueChange`, `aria-labelledby`, `id`) is a type error. design-standards' examples cast both components to `any` to pass `npm run typecheck`. Apps don't hit it today only because none uses RadioGroup.

**Pages that document today's behaviour** (update them once this is fixed):
- [Radio](https://design.echoalex.com/components/radio) and [RadioGroup](https://design.echoalex.com/components/radio-group) (`src/components/examples/radio.jsx`, `radio-group.jsx` in design-standards: drop the casts)

## Proposed Solution

To be defined when work on this WIP starts.

## Implementation Phases

### Phase 1: Define the solution ❌
- [ ] Agree the fix with Alex and write it in Proposed Solution

### Phase 2: Fix and release ❌
- [ ] Break down once the solution is defined

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and remove the casts

## Related Files

- `src/primitives/radio-group.jsx`
