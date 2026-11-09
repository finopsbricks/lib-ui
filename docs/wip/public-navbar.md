# PublicNavbar in lib-ui, With Dark Mode

## Status: NOT STARTED

Move the public navbar (the bar on landing, pricing and docs pages) into lib-ui as one
`PublicNavbar` component built on theme tokens, then replace every app's copy with it. Today
each app has its own copy with hard-coded light colours, so in dark mode the app name and the
menu icon are near-white on white and unreadable. Seen on timelog (2026-11-09) and txn.

---

## Problem Statement

`PublicNavbar.jsx` isn't in lib-ui. app-template has it at `src/components/PublicNavbar.jsx`,
and every app built from the template carries its own copy. Thirteen copies found on
2026-11-09:

| Variant | Apps |
|---|---|
| Full (~93–97 lines: logo, nav links, Login, phone menu) | app-template, assistant, gst-india, ledger, mail, mdm, orchestrator, snapshots, statements, txn (finopsbricks); timelog (internalops) |
| Minimal (11 lines: logo only, `h-10`) | console.finopsbricks.com, console.internalops.ai |

Every copy has a different hash, so they've drifted: link lists, logo props (timelog uses
`src="/icon.svg" bare` since lib-ui 0.8.1), breakpoints (timelog moved `md:` to `sm:`).

What breaks in dark mode:

- `bg-white` on the bar and the phone menu, and `border-gray-200` borders.
- Links use `text-gray-600` / `text-gray-900` / `hover:text-gray-900`.
- Token-coloured content on that white: the app name (lib-ui `Logo` → `Typography`, which
  follows `foreground`) and the phone menu icon turn near-white on white.

[Dark mode](dark-mode.md) Phase 7 (replace hard-coded colours) would fix each copy one by one.
Moving the navbar into lib-ui fixes it once and stops the copies drifting again.

## Proposed Solution

A `PublicNavbar` in `src/components/` that styles itself only with tokens: `bg-background`
(or `bg-background/95` with backdrop blur), `border-border`, `text-muted-foreground` for links
and `text-foreground` for the current one. Apps pass what differs:

- `offering` (the app name) and the `Logo` props (`src`, `bare`)
- `links`: `[{ href, label }]`, empty for the minimal console bar
- `login_href` (default `/login`), or none to hide the button
- the height, if the console bar's `h-10` is kept (check with design-director whether both
  heights should exist)

Keep the current behaviour: fixed to the top, the link row and Login from `sm` up, a phone
menu below `sm`, and the current link marked by `pathname.startsWith(href)`. lib-ui uses
640 (`sm`) as the phone/desktop line since 0.8.0.

While there, the phone menu button needs an `aria-expanded`, and the `TODO` comments in the
app copies go away.

## Implementation Phases

### Phase 1: Component in lib-ui ❌
- [ ] `src/components/PublicNavbar.jsx` with the props above, tokens only
- [ ] Stories with play functions: light and dark, phone (menu open and closed) and desktop,
      current link, no links, no Login; check that the name and icon have 4.5:1 / 3:1
      contrast against the bar in both themes
- [ ] Design-standards page for the component (components/), or a line in the app-sidebar page
- [ ] Release as a minor version (new component)

### Phase 2: app-template ❌
- [ ] Replace `src/components/PublicNavbar.jsx` with the lib-ui component, so new apps start
      with it

### Phase 3: Apps ❌
- [ ] timelog (internalops), then each finopsbricks app with the full variant; keep each
      app's links and logo props
- [ ] console.finopsbricks.com and console.internalops.ai (the minimal variant)
- [ ] Per app: delete the local copy, screenshot the public pages in light and dark at phone
      and desktop, ship

### Phase 4: Close out ❌
- [ ] Tick the navbar off [dark mode](dark-mode.md) Phase 7
- [ ] Delete this WIP

## Related Files

- `src/components/Logo.jsx` - the logo the navbar renders (`src`, `bare` since 0.8.1)
- `src/styles/globals.css` - the tokens
- `docs/wip/dark-mode.md` - Phase 7, hard-coded colours
- `~/ec2code/finopsbricks/apps/app-template/src/components/PublicNavbar.jsx` - the source of
  the copies
- `~/ec2code/internalops/apps/timelog/src/components/PublicNavbar.jsx` - where the bug was
  reported
