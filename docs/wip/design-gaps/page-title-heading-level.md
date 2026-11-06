# The page title is an `h3`; no page has an `h1`

## Status: NOT STARTED

PageHeader renders the title at heading level 3, so app pages have no `h1` and their outline starts at 3. Found while revising the design-standards component pages (2026-11-06), which describe today's behaviour.

---

## Problem Statement

`PageHeader` defaults `level` to `h3` and renders the title through `Typography`, as an `<h3>`. Nothing else on an app page renders an `h1` or `h2`. All 155 PageHeader uses in the apps keep the default. Screen reader users who jump to the `h1` find none, and the outline skips levels 1 and 2. Passing another `level` changes the title's size too, so consumers can't fix the outline without changing the look. design-standards tells consumers to use `h4` for sections under the title to keep the outline unbroken.

**Pages that document today's behaviour** (update them once this is fixed):
- [Page header](https://design.echoalex.com/components/page-header) (`content/components/page-header.mdx` in design-standards)
- [Heading](https://design.echoalex.com/components/heading) (`content/components/heading.mdx` in design-standards)
- [Card](https://design.echoalex.com/components/card) (`content/components/card.mdx` in design-standards)

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

- `src/components/PageHeader.jsx:17,25`
- `src/primitives/typography.jsx`: level to element and size
