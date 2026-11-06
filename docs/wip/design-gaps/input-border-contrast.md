# `border-input` is too faint to show a control's edge

## Status: NOT STARTED

Input, Textarea and Select borders, and the Switch off track, are under the 3:1 non-text minimum. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`--input` (and `--border`) is `oklch(0.92 0.004 286.32)` (`#e4e4e7`) in light mode: **1.27:1** against the white page. WCAG 1.4.11 asks 3:1 for the visual boundary of a control. It is the only edge of `Input`, `Textarea` and `SelectTrigger` (all `bg-transparent`), and the whole off-state track of `Switch` (`data-[state=unchecked]:bg-input`), so a user with low vision may not find the field or tell the switch's state.

**Pages that document today's behaviour** (update them once this is fixed):
- [Text input](https://design.echoalex.com/components/text-input) (`content/components/text-input.mdx` in design-standards)
- [Textarea](https://design.echoalex.com/components/textarea) (`content/components/textarea.mdx` in design-standards)
- [Select](https://design.echoalex.com/components/select) (`content/components/select.mdx` in design-standards)
- [Toggle switch](https://design.echoalex.com/components/toggle-switch) (`content/components/toggle-switch.mdx` in design-standards)
- [Form control](https://design.echoalex.com/components/form-control) (`content/components/form-control.mdx` in design-standards)

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

- `src/styles/globals.css:74-75`: `--border`, `--input`
- `src/primitives/input.jsx:21`
- `src/primitives/textarea.jsx:20`
- `src/primitives/select.jsx:59`
- `src/primitives/switch.jsx:23`
