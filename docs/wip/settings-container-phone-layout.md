# SettingsContainer on Phones

## Status: IN PROGRESS (~60%)

`SettingsContainer` keeps its 192px settings nav beside the content at every width. On a 390px phone
that leaves about 158px for the page, and settings pages are clipped and unusable — in every app
that uses it. Stack the nav above the content below `md`.

---

## Problem Statement

Found by `ux-designer` while building mail.finopsbricks.com's Mailboxes settings page (2026-11-07):

- At 390px the nav and content sit side by side; the content column gets ~158px and is clipped.
- The Tags page was already broken this way before any Mail change (screenshot `before-tags-390.png`
  in that session), so this is lib-ui, not the page.
- It breaks design-standards `content/foundations/responsive/` (document scroll on phones; content
  usable at phone width).
- The agent did not patch around it in the app: overriding a shared shell from one page goes against
  the standards.

## Proposed Solution

In `src/components/SettingsContainer.jsx`:

- Below `md`: stack the settings nav **above** the content (a horizontal scrolling tab row or a
  select are both fine; pick per design-standards).
- Give the content column `min-w-0` so long content can't force it wider.
- From `md` up: unchanged.

One change fixes every app's settings pages. Then release lib-ui and upgrade the apps.

## Implementation Phases

### Phase 1: Fix in lib-ui ✅
- [x] Stack below `md`; `min-w-0` on content. `SettingsNavigation` becomes one sideways-scrolling
      row of links on phones, keeping the current page in view
- [x] Stories at phone and desktop widths with play assertions (`SettingsContainer.stories.js`)
- [x] Release: v0.7.0

### Phase 2: Apps 🔄
- [x] mail.finopsbricks.com: upgraded to v0.7.0 (also brings 0.6.3's `PageHeader` phone fix); its
      Mailboxes and Google OAuth key phone stories assert the stacked layout
- [ ] Upgrade lib-ui in the other apps that use `SettingsContainer`; check their settings pages at 390px
- [ ] design-standards `components/split-page-layout` still says the navigation stays beside the
      content on phones: update it to the stacked row (design-director)

## Related Files

- `src/components/SettingsContainer.jsx`
- `~/ec2code/alex/design-standards/content/foundations/responsive/`
- `apps/mail.finopsbricks.com/docs/wip/02-google-connections.md` — where this was first recorded
