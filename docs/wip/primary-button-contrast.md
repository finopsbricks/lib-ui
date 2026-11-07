# Primary Button Contrast Below WCAG AA

## Status: NOT STARTED

Text on the primary button (`--primary-foreground` on `--primary`) measures **3.45:1**, below the
WCAG AA minimum of 4.5:1 for normal text. Every app's primary buttons ("Create Tag", "Connect Google
mailbox", …) inherit it. Fix the token pair so primary buttons pass AA in light and dark mode.

---

## Problem Statement

Found by an axe run (`a11y-check`) on mail.finopsbricks.com's Mailboxes settings page, 2026-11-07. It
was the only axe violation on the page, and it comes from lib-ui's tokens, not the page: the same
button on the Tags page fails the same way.

## Proposed Solution

- Adjust `--primary` and/or `--primary-foreground` in `src/styles/globals.css` until the pair is at
  least 4.5:1, in both light and dark themes.
- The palette belongs to the design language: get `design-director` to approve the new values (and
  record a decision if the brand colour itself moves).
- Re-run axe on a primary button story in both themes.

## Implementation Phases

### Phase 1: Tokens ❌
- [ ] Measure the current pair in light and dark
- [ ] Propose values that reach ≥ 4.5:1; `design-director` review
- [ ] Update `globals.css`; axe clean on the Button story in both themes

### Phase 2: Release and apps ❌
- [ ] Release lib-ui; upgrade the apps; spot-check a primary button in each

## Related Files

- `src/styles/globals.css` — token values
- `src/primitives/button.jsx` — Button
- `~/ec2code/alex/design-standards/content/primitives/` — colour notes
