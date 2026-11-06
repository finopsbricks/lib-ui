# DropdownMenuSubTrigger doesn't size or mute its icon

## Status: NOT STARTED

A submenu trigger's icon is larger and darker than the icons on the items around it. Found while adding live examples to design-standards (2026-11-07).

---

## Problem Statement

`DropdownMenuItem` sizes icons to 16px and colours them `text-muted-foreground`. `DropdownMenuSubTrigger` has neither rule, so an icon in a submenu trigger renders at Lucide's default 24px in the text colour, out of line with the menu's other items.

**Pages that document today's behaviour** (update them once this is fixed):
- [ActionMenu](https://design.echoalex.com/components/action-menu) (`content/components/action-menu.mdx` in design-standards)

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

- `src/primitives/dropdown-menu.jsx:254-265`
