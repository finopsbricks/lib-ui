# Dark Mode (Light / Dark / System) Across lib-ui and All Apps

## Status: IN PROGRESS (~85%) — Phases 1–6 done; Phase 7 (hardcoded colors) deliberately deferred

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

### Phase 1: lib-ui theme infrastructure ✅

- [x] `src/components/ThemeProvider.jsx` (`'use client'`). A thin wrapper around `next-themes`'
      `ThemeProvider` with lib-ui defaults: `attribute="class"`, `defaultTheme="light"`,
      `enableSystem`, `disableTransitionOnChange`, `themes={['light','dark']}`. Spread props so an
      app can override (for example `forcedTheme="light"` as a kill-switch).
- [x] `src/components/ThemeMenu.jsx` (`'use client'`). A `DropdownMenuSub` labeled "Theme" with a
      `DropdownMenuRadioGroup` of Light (Sun), Dark (Moon) and System (Monitor) bound to
      `useTheme()`. Guard against the pre-mount `theme === undefined` state, because next-themes
      can't know the theme on the server, so no radio item should render checked until mount.
- [ ] Optional (deferred, not needed yet): `src/components/ThemeToggle.jsx`, a standalone icon button using the same three
      options, for pages without `NavUser` (docs and marketing `PublicNavbar`). Build it only if
      Phase 4 needs it.
- [x] Export both from `src/index.js` and through the `./components/*` subpath (already covered).
- [x] Verify `primitives/sonner.jsx` now follows the provider. It should pass `resolvedTheme` or
      `theme`, and both work under next-themes. Confirm toasts match the app theme in all three
      modes.
- [x] Storybook: a `theme` toolbar global plus a decorator that toggles `.dark` and `color-scheme` (no new addon dependency) in `.storybook/preview.js`, so every story can
      flip to dark from the toolbar. Make the story decorator's description banner (`bg-sky-50 …
      text-slate-700`) token-based or leave it as is. It's Storybook chrome, not product.
- [x] Storybook stories: `ThemeMenu` (inside an open `DropdownMenu`) and a "Theme switching"
      story showing a few primitives (Card, Button, Input, Table) under each theme.
- [x] Docs: short `docs/architecture/theming.md` covering provider setup, `suppressHydrationWarning`,
      the localStorage persistence rationale, and the rule "use tokens, not palette classes"
      (enforced later).
- [x] Release lib-ui **v0.6.0** (minor: new components, no breaking change) and update
      CHANGELOG.md.

### Phase 2: Single source of truth for tokens ✅

Goal: apps stop carrying their own copy of `:root` and `.dark`, and light rendering stays
pixel-identical.

- [x] Import shape: each app's `globals.css` is now `@import "@fob/lib-ui/styles/globals.css";` +
      its `@source` line + app-only rules (the `html, body` overflow lock and the
      `.scrollbar-hide` / `.scrollbar-auto-hide` utilities; snapshots also keeps its
      react-grid-layout rules). Tailwind v4 resolves the package export, and `tailwindcss` /
      `tw-animate-css` resolve from the app's `node_modules`.
- [x] Verification: compiled each app's CSS with `@tailwindcss/postcss` before and after. The
      output was the same byte length with identical sorted lines (only the unlayered
      `html, body` rule moved position).
- [x] Applied to txn, app-template, assistant, ledger, orchestrator, snapshots and statements.
- [x] console: keeps an app-level `@theme inline` for its Geist fonts. The only output change is
      that it now gets the `--chart-*` variables (unused in console).
- [ ] finopsbricks.com: left standalone (marketing site, not on lib-ui).
- [ ] gst-india and mdm: **skipped**. gst-india isn't a git repo, and mdm has no remote plus
      uncommitted in-progress work, so neither can be committed or deployed safely. Apply the
      same edit when they're ready.

### Phase 3: Pilot wiring in txn ✅

- [x] Bump `@fob/lib-ui` to `v0.6.0`.
- [x] `src/app/layout.jsx`: `<html lang="en" suppressHydrationWarning>`, with `<ThemeProvider>`
      as the outermost provider inside `<body>`, so `SnackbarProvider`'s Toaster sees it.
- [x] `src/components/navigation/NavUser.jsx`: `<ThemeMenu />` between "Account" and the
      separator before "Log out".
- [x] Docs pages and `PublicNavbar` inherit the theme. No separate picker for now.
- [x] Verification (production build, Playwright, public routes `/` and `/docs`):
  - [x] An empty localStorage with the OS in dark renders **light** (`class="light"`, white body).
  - [x] A stored `dark` applies before first paint. The next-themes script is the first element
        in `<body>`, ahead of all content, and dark persists across navigation.
  - [x] `system` follows the OS live (dark→light flip without a reload). `color-scheme` follows.
  - [x] No hydration warnings. The only console error is a pre-existing SW 404 (txn has no
        `public/sw.js`).
  - [x] `lint`, `typecheck`, `test` (272) and `build` pass. CI and Deploy Main are green, and
        prod serves the theme script.
  - [ ] **Not verified:** the NavUser menu and toasts on authenticated pages. The screenshot
        tooling has no login, so this needs a manual check by a signed-in user. The `ThemeMenu`
        component itself was verified in Storybook (sub-menu opens, radio state, switching).
- [x] Light mode unchanged: compiled CSS is identical apart from rule order (Phase 2), and
      `defaultTheme="light"`.

### Phase 4: Roll wiring out to all apps ✅

Same three edits per app: bump lib-ui, update the root layout (`suppressHydrationWarning` +
`ThemeProvider`), and add `ThemeMenu` to `NavUser`. Each app passed lint + test + build before
push. Pushes deploy to prod (orchestrator's `main` is its prod branch).

- [x] app-template
- [x] assistant (was v0.4.4). The v0.4.2→v0.6.0 diff is additive only: no removed files or exports.
- [x] ledger
- [x] snapshots
- [x] orchestrator (was v0.4.6)
- [x] statements. The full test run had 1 timeout (`equitas_cc__pdf` `beforeAll` > 5s) while 3
      builds ran in parallel. The suite passes 7/7 on its own.
- [x] console (was v0.4.2). The root layout is `src/app/layout.js` and the ThemeMenu sits above
      "Sign Out". `global-error.jsx` uses inline styles with no provider, so it was left as is.
      Its `typecheck` fails with 35 **pre-existing** errors (`session.user` typing, plus lib-ui
      `DateHeader`'s `@/types` JSDoc import). console CI doesn't run typecheck. Lint, test and
      build pass.
- [ ] gst-india: skipped (not a git repo).
- [ ] mdm: skipped (no git remote, uncommitted in-progress work).
- [ ] finopsbricks.com: left light-only (marketing, not on lib-ui).

### Phase 5: Review dark rendering ✅

Authenticated app pages couldn't be screenshotted (no login available to the tooling), so the
review covers lib-ui components in Storybook (dark toolbar), the public txn pages, a token
contrast audit, and a source scan for hardcoded surfaces. A signed-in walkthrough of each app
is still worth doing before Phase 7.

- [x] Token contrast audit (WCAG, computed from the oklch values; script logic in Phase 6).
- [x] lib-ui stories in dark: AlertBox, DatePicker, ErrorMessage, Markdown, PageHeader,
      SnackbarProvider, StatsBarContainer, Table, TableOrCards, Button.
- [x] Public txn pages (`/`, `/docs`) in dark.
- [x] Findings recorded below.

### Phase 6: Tune dark token values ✅

Token-only changes in the `.dark` block of lib-ui `globals.css` (light `:root` untouched), released
as **v0.6.1** and bumped in every wired app.

- [x] `--primary-foreground` and `--sidebar-primary-foreground`: `oklch(0.379 0.146 265.522)` →
      `oklch(0.985 0 0)`. 1.98:1 → **5.03:1**.
- [x] `--ring` and `--sidebar-ring`: `oklch(0.488 0.243 264.376)` → `oklch(0.623 0.214 259.815)`
      (blue-500). 2.91:1 → **5.29:1**.
- [x] `--chart-1`: same blue-500. 2.60:1 → **4.71:1** on `--card`. `chart-2…5` were already
      ≥ 4.3:1.
- [x] `--border` left at 2.89:1 (decorative, shadcn default).

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

Recorded 2026-10-11, worst first.

**Token-level (fixed in Phase 6):**
1. `--primary-foreground` / `--sidebar-primary-foreground`: dark blue text on a blue primary,
   **1.98:1**. Every primary button label was nearly invisible.
2. `--ring` / `--sidebar-ring`: 2.91:1 against the background (focus rings hard to see).
3. `--chart-1`: 2.60:1 on `--card`.
4. `--border`: 2.89:1. It's decorative and matches the shadcn default, so it's left as is.
5. Light mode has its own pre-existing misses (`primary-foreground` 3.45:1, `muted-foreground`
   on `muted` 4.39:1, `chart-4/5` < 3:1). Out of scope here because light mode must stay
   unchanged. Revisit with Phase 7.

**Component-level (Phase 7):** the main failure is *light hardcoded surfaces with token text*.
Text inherits `--foreground` (near-white) but sits on `bg-white` or `bg-gray-50`, so it
disappears. Seen on the txn docs page (headings invisible on white), and lib-ui `StatsBarContainer`
(grey slab, washed-out labels) and `Table` (grey header and body). The reverse case,
`text-gray-900` on a token-dark surface, gives dark-on-dark text.

| Repo | `bg-white` | `bg-gray/slate-50/100` | `text-gray-800/900` | status `bg-*-50/100` |
|---|---|---|---|---|
| statements | 74 | 84 | 73 | 115 |
| orchestrator | 19 | 19 | 17 | 84 |
| txn | 11 | 19 | 25 | 44 |
| ledger | 8 | 13 | 17 | 35 |
| snapshots | 8 | 13 | 21 | 29 |
| app-template | 6 | 12 | 13 | 24 |
| assistant | 5 | 7 | 8 | 20 |
| lib-ui | 6 | 5 | 3 | 5 |
| console | 1 | 0 | 0 | 5 |

Fixed early (v0.6.2, user-reported): `primitives/data-table/data-table.jsx` table tint and
pinned-cell backgrounds (`dark:` variants, light unchanged).

lib-ui files to fix first: `components/Table.jsx`, `components/SettingsNavigation.jsx`,
`components/StatsBarContainer.jsx`, `primitives/typography.jsx`, `primitives/timeline.jsx`,
`primitives/data-table/data-table.jsx`, `primitives/badge.jsx`, `primitives/alert.jsx`,
`components/CustomTab.jsx`.

**What already looks right in dark:** Alert/AlertBox, Calendar/DatePicker, ErrorMessage, Markdown
tables, outline/secondary/destructive buttons, inputs, cards, dropdowns and the sidebar (all
token-based). Sonner toasts follow the theme.

**Asset-level:** none confirmed yet. The txn public navbar's "Transactions" wordmark disappears,
but that's token text on a hardcoded white navbar (component-level). Check the logo mark and any
images once the surfaces are migrated.

## Related Files

- `lib/lib-ui/src/styles/globals.css` - Token source of truth (`:root`, `.dark`, `dark` variant)
- `lib/lib-ui/src/primitives/sonner.jsx` - Already calls `useTheme()`; has no provider today
- `lib/lib-ui/src/components/SnackbarProvider.jsx` - Mounts the sonner `Toaster`
- `lib/lib-ui/.storybook/preview.js` - Add the theme toolbar
- `lib/lib-ui/src/index.js` - Export `ThemeProvider` and `ThemeMenu`
- `apps/*/src/app/layout.jsx` - Root layouts (console: `src/app/layout.js` + `global-error.jsx`)
- `apps/*/src/components/navigation/NavUser.jsx` - Where the Theme sub-menu goes
- `apps/*/src/app/globals.css` - Duplicated tokens to collapse into a lib-ui import
