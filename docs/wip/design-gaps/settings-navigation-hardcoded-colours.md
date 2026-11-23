# SettingsNavigation uses hard-coded greys, blue and white

## Status: BLOCKED - awaiting Alex's review of the light and dark screenshots (~35%)
## Priority: P3: settings nav stays white in dark mode, which users must opt in to
## Bet: finopsbricks

The settings side navigation ignores the theme. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour. Alex hit it on a settings page in dark mode (2026-11-23): a white panel on the black page.

---

## Problem Statement

`SettingsNavigation` styles itself with `bg-white`, `border-gray-200`, `text-gray-600`, `hover:bg-gray-100`, and marks the selected item `bg-gray-100 text-gray-900 border-r-2 border-blue-500`. None are tokens, so in dark mode the panel stays white, and the selected item doesn't match the sidebar's selected style (`bg-sidebar-accent`). Rendered on the settings pages of 14 apps (Phase 2 lists them).

**Pages that document today's behaviour** (update them once this is fixed):
- [Split page layout](https://design.echoalex.com/components/split-page-layout) (`content/components/split-page-layout.mdx` in design-standards)

## Proposed Solution

Swap each raw palette class for the token that does the same job (design-standards `foundations/color-usage` › "Colour comes only from tokens"). Layout, sizes, the phone row and the bar position don't change.

| Part | Before | After | Why this token |
|---|---|---|---|
| Panel | `bg-white border-gray-200` | `bg-card border` (`border-border`) | An in-page surface with a hairline edge, like lib-ui `Card` |
| Item text | `text-gray-600` | `text-muted-foreground` | Secondary text; quieter than the current page in both modes |
| Item hover | `hover:bg-gray-100 hover:text-gray-900` | `hover:bg-accent hover:text-accent-foreground` | color-usage: `bg-accent` is "hover and highlighted items in menus and lists" |
| Current page | `bg-gray-100 text-gray-900` | `bg-accent text-accent-foreground` | Same values as the sidebar's current item (`bg-sidebar-accent`) in both modes; `accent` is the in-page name for it |
| Current-page bar | `border-blue-500` | `border-primary` | color-usage: `primary` is "selected and active states"; follows the brand accent |

Contrast (WCAG AA, from the token hex values in design-standards `primitives/color`):

| Pair | Light | Dark |
|---|---|---|
| Item text on panel (`muted-foreground` / `card`) | 4.83 | 6.75 |
| Hovered or current item text on `accent` | 16.1 | 14.3 |
| Bar (`primary`) against the panel | 3.76 | 3.38 |
| Bar (`primary`) against the current item's `accent` | 3.42 | 2.84 |

axe (WCAG 2.1 A/AA): 0 violations on the desktop and phone stories, light and dark.

The bar in dark mode is 2.84:1 against the current item's own background, under the 3:1 non-text bar, though 3.38:1 against the panel beside it. The current page is also marked by its background and its text (muted → full foreground). Raising it means a different token for the bar (dark `primary` is a fill colour chosen for white text on it); that is a design-language question for design-director, not part of this fix.

Light mode changes slightly: item text goes from gray-600 (7.6:1) to `muted-foreground` (4.8:1), and greys move from Tailwind gray to the token zinc. Seen in the 1440/640/744/390 pairs.

**Standards read:** engineering-standards `ui/README.md`, `ui/change-scope.md`, `ui/visual-verification.md`, `ui/regression-stories.md`, `principles/solve-problems-you-have-seen.md`; design-standards `foundations/color-usage.mdx`, `primitives/color.mdx`, `components/split-page-layout.mdx`.

## Implementation Phases

### Phase 1: Fix in lib-ui, with stories and screenshots 🔄
- [x] Swap the palette classes for tokens in `SettingsNavigation.jsx`
- [x] Stories `OnDesktopInDark` and `OnPhoneInDark` in `SettingsContainer.stories.js`; they fail on the old component (checked) and pass on the new
- [x] `npm run storybook:test:ci`: 239/239 pass
- [x] Before/after screenshots at 1440, 744, 640 and 390 (iPhone 13), light and dark
- [ ] Alex approves the screenshots

### Phase 2: Release and roll out ❌
- [ ] Bump lib-ui (0.9.3), tag and release
- [ ] Bump the pin and ship each app that renders `SettingsNavigation`: app-template, assistant, documents, gst-india, ledger, mail, mdm, orchestrator (finopsbricks), snapshots, statements, txn, orchestrator.assemblyline.sh, timelog, tne.internalops.ai
- [ ] Not rendering it (no bump needed for this fix): console.finopsbricks.com, fob-watch, control-room, console.internalops.ai

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and update the pages above

## Noticed, not done (proposals)

- `AccountsNavigation.jsx` in txn (`accounts/[a_id]/_components`) and statements (`accounts/[acc_id]/_components`) has the same `bg-white border-gray-200` panel: same dark-mode bug, app code, separate fix.
- `split-page-layout.mdx` › Responsive behavior still says the navigation stays beside the content on phones; it became a row above the content (`settings-container-phone-layout.md`). Fix with Phase 3.
- `aria-current="page"` is already on the current link here; the wider gap is tracked in `nav-aria-current.md`.
- The dark-mode bar contrast question above.

## Related Files

- `src/components/SettingsNavigation.jsx`
- `src/components/SettingsContainer.stories.js`
