# CustomTab hard-codes `bg-white`

## Status: COMPLETE (v0.8.2, design-standards pin pending)

Page tabs stay white in dark mode. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour. Hit in production on the statements account detail page (2026-11-09): the white panel made the active tab, the count badges and everything token-coloured inside the panel ("Select Period", stats labels) invisible.

---

## Problem Statement

`CustomTab` sets `bg-white` on the tab bar and on each panel, so in dark mode the tabs and the content under them are a white block on a dark page. Used in orchestrator, statements and txn.

**Pages that document today's behaviour** (update them once this is fixed):
- [Underline nav](https://design.echoalex.com/components/underline-nav) (`content/components/underline-nav.mdx` in design-standards)

## Proposed Solution

Swap `bg-white` for `bg-background` on the tab bar and on `TabsContent`. The tabs and panel sit on the page, so they take the page token, not `bg-card`. In light mode `--background` is white (`oklch(1 0 0)`), so light mode is pixel-unchanged (checked by screenshot diff at 1440).

## Implementation Phases

### Phase 1: Define the solution ✅
- [x] `bg-white` → `bg-background` (requested by Alex via the statements account-page dark-mode WIP, 2026-11-09)

### Phase 2: Fix and release ✅
- [x] `CustomTab.jsx` tab bar and panel use `bg-background`
- [x] Story `WithCountBadgesInDark` asserts the bar and panel are not white and match the page background
- [x] Released in v0.8.2

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and update the pages above

## Related Files

- `src/components/CustomTab.jsx:43,86`
- `src/components/CustomTab.stories.js` (`WithCountBadgesInDark`)
