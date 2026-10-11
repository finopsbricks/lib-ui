# Dark Mode (Light / Dark / System) Across lib-ui and All Apps

## Status: NOT STARTED

Add a user-selectable theme (Light, Dark, System) to every FinOpsBricks app. lib-ui owns the
mechanism: a theme provider, a theme picker, and the light and dark token values. Apps wire it in
with a few lines. The plan is **infra first, cosmetics last**: get switching, persistence and
no-flash rendering right everywhere, look at how dark mode actually renders, and only then
replace hardcoded colors with semantic tokens. Until that final phase, dark mode is knowingly
sub-par. That's acceptable because light stays the default and users must opt in.

---

## Problem Statement

All apps render light-only. The groundwork for dark mode already exists, but nothing is wired up:

- **Tokens:** shadcn-style CSS variables with a complete `.dark { … }` block
  (`src/styles/globals.css:79`).
- **`dark:` variant:** `@custom-variant dark (&:is(.dark *))` is already declared, so `dark:`
  classes and `.dark` tokens work once `<html class="dark">` is set.
- **`next-themes` ^0.4.6:** already a dependency of lib-ui and of 10 apps.
- **Unused `useTheme()`:** `src/primitives/sonner.jsx` calls `useTheme()`, but no app mounts a
  `ThemeProvider`. It falls back to `"system"`, so **toasts already turn dark on a dark-OS
  machine while the app is light**. The provider rollout fixes that bug as a side effect.

There are two obstacles:

1. **The token block is copied into every app.** Each app's `src/app/globals.css` repeats the
   lib-ui `:root` and `.dark` tokens. They match lib-ui exactly in txn, statements and
   orchestrator. console differs by about 10 lines and finopsbricks.com by about 84. Tuning
   the dark palette today would mean editing 12 files.
2. **Hardcoded colors are everywhere.** Raw palette classes (`text-gray-600`, `bg-white`,
   `bg-red-50`) and hex/rgb values ignore the theme. Counts as of 2026-10-11:

   | Repo | Palette-class uses (files) | hex/rgb | Existing `dark:` |
   |---|---|---|---|
   | lib-ui | 184 (23) | 59 | 31 |
   | statements | 1334 (125) | 119 | 0 |
   | orchestrator | 794 (52) | 101 | 27 |
   | txn | 338 (30) | 48 | 0 |
   | ledger | 263 (26) | 18 | 36 |
   | mdm | 224 (20) | 18 | 0 |
   | snapshots | 222 (16) | 20 | 17 |
   | finopsbricks.com | 162 (12) | 39 | 11 |
   | app-template | 152 (13) | 18 | 0 |
   | gst-india | 152 (13) | 18 | 0 |
   | assistant | 114 (11) | 18 | 0 |
   | console | 18 (8) | 24 | 0 |

   These are handled in the **last** phase, by explicit decision.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Mechanism | `next-themes` with `attribute="class"` | Already a dependency. It sets `.dark` on `<html>`, injects a pre-paint script (no flash), sets `color-scheme` so native scrollbars and form controls follow the theme, and handles `system` through `prefers-color-scheme`. |
| Options | `light`, `dark`, `system` | Product requirement. |
| Default | `light` (`defaultTheme="light"`) | Nobody sees the sub-par dark rendering unless they opt in. Revisit after the hardcoded-color migration (switch to `system`). |
| Persistence | `localStorage` per origin (`next-themes` default, key `theme`) | Apps must work when self-hosted on arbitrary domains. A shared `.finopsbricks.com` cookie or an auth-DB user preference would couple apps to our hosting and auth topology. The trade-off is accepted: the choice is remembered per app (per origin), so a user sets it once in each app. |
| Server rendering | None. No cookie and no server-side theme read. | Follows from localStorage. The `next-themes` inline script applies the class before paint. `<html>` needs `suppressHydrationWarning`. |
| Picker location | Inside each app's `NavUser` dropdown, as a "Theme" sub-menu built from a lib-ui component | `NavUser` is per-app (`src/components/navigation/NavUser.jsx`), not in lib-ui's `AppLayout`, so lib-ui ships the picker and each app drops it in. |
| Picker visibility | Shown in every app as soon as the app is wired, even before its colors are migrated | We want to see dark mode as it really renders. Because light is the default, nobody hits it accidentally. |
| Token source of truth | lib-ui `src/styles/globals.css`. Apps import it instead of copying it. | Tune the dark palette once and every app follows. |
| Hardcoded color migration | **Last phase** | Get infra and switching right first, then look at real dark rendering before deciding how to fix it. |

Out of scope for now:
- Cross-app or cross-device sync of the preference.
- A per-org default theme.
- Emails (stay light; mail clients ignore the app theme).
- `apps/fob-watch` and `apps/auth-lite` (no lib-ui, no tokens).
- `apps/traces-india` and `apps/_suspended`.

## Implementation Phases

### Phase 1: lib-ui theme infrastructure ❌

- [ ] `src/components/ThemeProvider.jsx` (`'use client'`). A thin wrapper around `next-themes`'
      `ThemeProvider` with lib-ui defaults: `attribute="class"`, `defaultTheme="light"`,
      `enableSystem`, `disableTransitionOnChange`, `themes={['light','dark']}`. Spread props so an
      app can override (for example `forcedTheme="light"` as a kill-switch).
- [ ] `src/components/ThemeMenu.jsx` (`'use client'`). A `DropdownMenuSub` labeled "Theme" with a
      `DropdownMenuRadioGroup` of Light (Sun), Dark (Moon) and System (Monitor) bound to
      `useTheme()`. Guard against the pre-mount `theme === undefined` state, because next-themes
      can't know the theme on the server, so no radio item should render checked until mount.
- [ ] Optional: `src/components/ThemeToggle.jsx`, a standalone icon button using the same three
      options, for pages without `NavUser` (docs and marketing `PublicNavbar`). Build it only if
      Phase 4 needs it.
- [ ] Export both from `src/index.js` and through the `./components/*` subpath (already covered).
- [ ] Verify `primitives/sonner.jsx` now follows the provider. It should pass `resolvedTheme` or
      `theme`, and both work under next-themes. Confirm toasts match the app theme in all three
      modes.
- [ ] Storybook: add `@storybook/addon-themes` with `withThemeByClassName({ themes: { light: '',
      dark: 'dark' }, defaultTheme: 'light' })` in `.storybook/preview.js`, so every story can
      flip to dark from the toolbar. Make the story decorator's description banner (`bg-sky-50 …
      text-slate-700`) token-based or leave it as is. It's Storybook chrome, not product.
- [ ] Storybook stories: `ThemeMenu` (inside an open `DropdownMenu`) and a "Theme switching"
      story showing a few primitives (Card, Button, Input, Table) under each theme.
- [ ] Docs: short `docs/architecture/theming.md` covering provider setup, `suppressHydrationWarning`,
      the localStorage persistence rationale, and the rule "use tokens, not palette classes"
      (enforced later).
- [ ] Release lib-ui **v0.6.0** (minor: new components, no breaking change) and update
      CHANGELOG.md.

### Phase 2: Single source of truth for tokens ❌

Goal: apps stop carrying their own copy of `:root` and `.dark`, and light rendering stays
pixel-identical.

- [ ] Decide the import shape. lib-ui `globals.css` already starts with `@import "tailwindcss"` and
      `@import "tw-animate-css"` and declares the `dark` variant, so an app's `globals.css`
      becomes `@import "@fob/lib-ui/styles/globals.css";` plus its `@source` line and any
      app-specific rules. Confirm Tailwind v4 resolves the package export
      (`./styles/globals.css` is already in `package.json` exports) and that importing tailwindcss
      once, through lib-ui, doesn't break each app's `@source` scanning.
- [ ] Pilot in txn. Replace the duplicated header, `@theme inline`, `:root`, `.dark` and base-layer
      blocks with the import. Keep the txn-only rules (`.scrollbar-auto-hide` and its `.dark`
      variants). Screenshot-diff key pages in light mode before and after (expect no change).
- [ ] For apps whose tokens differ from lib-ui, either move the differences into lib-ui (if they
      are improvements) or keep them as an app-level override block **after** the import, with a
      comment saying why:
  - [ ] console (about 10 differing lines)
  - [ ] finopsbricks.com (about 84 differing lines; marketing site and not on lib-ui, so it may
        stay standalone)
- [ ] app-template gets the same treatment, so new apps start clean.

### Phase 3: Pilot wiring in txn ❌

- [ ] Bump `@fob/lib-ui` to `v0.6.0`.
- [ ] `src/app/layout.jsx`: `<html lang="en" suppressHydrationWarning>` and wrap the body
      contents in `<ThemeProvider>` (outermost provider inside `<body>`, so `SnackbarProvider`'s
      Toaster sees it).
- [ ] `src/components/navigation/NavUser.jsx`: add `<ThemeMenu />` between "Account" and the
      separator before "Log out".
- [ ] Docs pages and `PublicNavbar` already render under the root layout, so they inherit the
      theme. Decide whether they need their own picker; the default is no for now.
- [ ] Verification checklist:
  - [ ] Fresh browser (empty localStorage) renders **light**, even with the OS in dark mode.
  - [ ] Dark persists across reload and navigation, with **no flash of light** on hard reload
        (throttle the network and check the first paint).
  - [ ] System follows OS changes live without a reload.
  - [ ] No hydration warnings in the console.
  - [ ] Toasts (sonner) match the selected theme.
  - [ ] Native controls (scrollbars, date inputs, selects) follow `color-scheme`.
  - [ ] Light mode is visually unchanged (screenshot compare against the pre-change baseline).
  - [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass.
- [ ] Capture dark screenshots of every main txn route (`screenshot-flow`) as the baseline for
      Phase 5.

### Phase 4: Roll wiring out to all apps ❌

Same three edits per app: bump lib-ui, update `layout.jsx` (`suppressHydrationWarning` +
`ThemeProvider`), and add `ThemeMenu` to `NavUser`. Then run the Phase 3 verification checklist.

- [ ] app-template, first, so new apps inherit it.
- [ ] gst-india (v0.5.0)
- [ ] mdm (v0.5.0)
- [ ] snapshots (v0.5.0)
- [ ] ledger (v0.5.0)
- [ ] statements (v0.5.0)
- [ ] orchestrator (on **v0.4.6**: read the CHANGELOG for 0.4.6 → 0.6.0 first)
- [ ] assistant (on **v0.4.4**: same)
- [ ] console (on **v0.4.2**: same). Root layout is `src/app/layout.js`, and `global-error.jsx`
      has its own `<html>` that also needs `suppressHydrationWarning`.
- [ ] finopsbricks.com (marketing, no lib-ui). Decide: leave light-only, or wire `next-themes`
      directly with a `PublicNavbar` toggle. Default: leave light-only.

### Phase 5: Review dark rendering ❌

The "look at it before fixing it" phase. No code changes; produce a findings list.

- [ ] Screenshot every app's main routes in dark (`screenshot-flow`, `a11y-check` for contrast).
- [ ] Classify issues:
  - **Token-level:** the dark palette value itself is wrong. Example: dark
    `--primary-foreground` (`oklch(0.379 …)`, dark blue) on dark `--primary` (blue) is likely
    low-contrast. These are fixed once in lib-ui (Phase 6).
  - **Component-level:** hardcoded colors in lib-ui or in an app (Phase 7).
  - **Asset-level:** logos, images, illustrations, charts with hex colors.
- [ ] Record findings in this file under "Dark mode review findings", with the worst offenders
      first. This becomes the Phase 7 priority list.

### Phase 6: Tune dark token values ❌

Token-only changes in lib-ui `globals.css`. No component edits.

- [ ] Fix the contrast failures from Phase 5 (WCAG AA: 4.5:1 for body text, 3:1 for large text
      and UI).
- [ ] Check `--chart-1…5` legibility on the dark `--card`.
- [ ] Release a lib-ui patch and bump the apps. Because of Phase 2, this is a version bump only.

### Phase 7 (LAST): Replace hardcoded colors with semantic tokens ❌

Deliberately last. Only start once Phases 1–6 are done and dark mode has been seen in practice.

- [ ] Add status tokens to lib-ui for both modes: `--success`, `--warning`, `--info` (plus
      `-foreground` and a muted surface variant), alongside the existing `--destructive`. Without
      these there is no token to map `bg-red-50 border-red-200 text-red-700`-style alerts to.
- [ ] Write the mapping table (in `docs/architecture/theming.md`), for example:
      `bg-white` → `bg-background`/`bg-card`; `text-gray-900` → `text-foreground`;
      `text-gray-500/600` → `text-muted-foreground`; `bg-gray-50/100` → `bg-muted`;
      `border-gray-200` → `border-border`; red/green/amber/blue status combinations → status tokens.
- [ ] lib-ui first (184 uses, 59 hex), then release.
- [ ] Apps, from smallest to largest: console → assistant → app-template → gst-india → mdm →
      snapshots → ledger → txn → orchestrator → statements.
- [ ] Charts: swap hex series colors for `var(--chart-n)`.
- [ ] Logos and images: add dark variants where needed.
- [ ] Guardrail: an ESLint rule or CI grep that flags raw palette classes and hex values in JSX,
      so new code doesn't regress.
- [ ] Revisit the default: consider switching `defaultTheme` to `system`.

## Dark mode review findings

_(Filled in during Phase 5.)_

## Related Files

- `lib/lib-ui/src/styles/globals.css` - Token source of truth (`:root`, `.dark`, `dark` variant)
- `lib/lib-ui/src/primitives/sonner.jsx` - Already calls `useTheme()`; has no provider today
- `lib/lib-ui/src/components/SnackbarProvider.jsx` - Mounts the sonner `Toaster`
- `lib/lib-ui/.storybook/preview.js` - Add the theme toolbar
- `lib/lib-ui/src/index.js` - Export `ThemeProvider` and `ThemeMenu`
- `apps/*/src/app/layout.jsx` - Root layouts (console: `src/app/layout.js` + `global-error.jsx`)
- `apps/*/src/components/navigation/NavUser.jsx` - Where the Theme sub-menu goes
- `apps/*/src/app/globals.css` - Duplicated tokens to collapse into a lib-ui import
