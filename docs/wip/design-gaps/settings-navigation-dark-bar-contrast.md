# SettingsNavigation's current-page bar is under 3:1 in dark mode

## Status: NOT STARTED
## Priority: P4: polish; the current page is also marked by its background and text
## Bet: finopsbricks

Found while fixing `SettingsNavigation`'s hard-coded colours (lib-ui 0.9.3, 2026-11-23). Alex chose to ship 0.9.3 as is and polish this in a separate iteration.

---

## Problem Statement

The current page's bar is `border-primary`. In dark mode `--primary` is `#155dfc`, a fill colour picked for white text on it, and the bar measures 2.84:1 against the current item's `bg-accent` (`#27272a`) and 3.38:1 against the panel's `bg-card`. WCAG 1.4.11 asks 3:1 for a graphical part that marks state. Light mode passes (3.42 and 3.76).

The current page is also marked by its background (`bg-accent`) and its text (muted to full foreground), so the state doesn't rest on the bar alone.

## Proposed Solution

To be defined. A design-language question for design-director: a lighter dark-mode value for the bar (e.g. a dedicated selected-indicator token, or `--ring`'s blue-500, 3.96:1 on `accent`), and whether the sidebar's current item and `CustomTab`'s active tab should use the same indicator.

## Implementation Phases

### Phase 1: Decide the token ❌
- [ ] design-director picks the token; record it in design-standards

### Phase 2: Apply and release ❌
- [ ] Break down once the token is chosen

## Related Files

- `src/components/SettingsNavigation.jsx`
- `src/styles/globals.css` (`--primary` in `.dark`)
- `docs/wip/design-gaps/settings-navigation-hardcoded-colours.md`
