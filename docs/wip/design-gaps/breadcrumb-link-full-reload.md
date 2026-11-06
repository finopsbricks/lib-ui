# Breadcrumb links reload the whole page

## Status: NOT STARTED

`BreadcrumbLink` renders a plain `<a>`, not `next/link`. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`BreadcrumbLink` renders `<a>` unless `asChild` is passed, and `AppBreadcrumbs` uses it with `href` directly. Every crumb click is a full page load instead of a client-side navigation: slower, and it loses client state. Breadcrumbs are the apps' back navigation, so this is on the most-used path.

**Pages that document today's behaviour** (update them once this is fixed):
- [Breadcrumbs](https://design.echoalex.com/components/breadcrumbs) (`content/components/breadcrumbs.mdx` in design-standards)

## Proposed Solution

To be defined when work on this WIP starts.

## Implementation Phases

### Phase 1: Define the solution ❌
- [ ] Agree the fix with Alex and write it in Proposed Solution

### Phase 2: Fix and release ❌
- [ ] Break down once the solution is defined

### Phase 3: Update design-standards ❌
- [ ] Bump the lib-ui pin in design-standards and update the pages above

## Related Files

- `src/primitives/breadcrumb.jsx:46-51`
- `src/components/AppBreadcrumbs.jsx:36`
