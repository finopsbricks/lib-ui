# Phone Navigation: Breadcrumbs and the Sidebar Sheet

## Status: NOT STARTED

Two lib-ui navigation gaps on phones, found while building mail.finopsbricks.com's inbox
(2026-11-07): `AppBreadcrumbs` shows only the last crumb below `md`, so a detail page has no way
back except the sidebar; and `NavItem` doesn't close the phone sidebar sheet after navigating.

---

## Problem Statement

- **Breadcrumbs:** below `md`, `AppBreadcrumbs` renders only the current page's crumb. On Mail's
  thread page (Mail → mailbox → thread) a phone user can't go back up except by opening the sidebar.
- **Sidebar sheet:** on phones the sidebar opens as a sheet. Tapping a `NavItem` navigates but leaves
  the sheet open over the new page. Mail's own `MailNav` closes it explicitly; every other nav item in
  every app doesn't.

## Proposed Solution

- **Breadcrumbs:** below `md`, show a single "back" link to the parent crumb (`← Mailbox name`)
  instead of the current page's name. Check design-standards responsive notes first.
- **Sheet:** in `NavItem`, close the mobile sidebar on click (lib-ui's sidebar context exposes
  `setOpenMobile`), as `MailNav` does in Mail.

## Implementation Phases

### Phase 1: lib-ui ❌
- [ ] `AppBreadcrumbs`: parent link below `md`; story + play assertion at 390px
- [ ] `NavItem`: close the mobile sheet on navigation; story at 390px
- [ ] Release

### Phase 2: Apps ❌
- [ ] Upgrade; in Mail, drop `MailNav`'s own sheet-closing once `NavItem` does it

## Related Files

- `src/components/AppBreadcrumbs.jsx`, `src/components/NavItem.jsx`
- `apps/mail.finopsbricks.com/src/components/navigation/MailNav.jsx` — the local workaround
- `apps/mail.finopsbricks.com/docs/wip/05-staff-inbox-ui.md` — where these were first recorded
