# Fix Button `asChild` icon-wrap bug at source

**Status**: NOT STARTED

## Problem

`<Button asChild>` wraps a `<Link>` (or `<a>`) in a `<span>` carrying the button styles, instead of merging those styles onto the child element. The result:

```jsx
<Button asChild>
  <Link href="/x">
    Own your bank data
    <ArrowRight />
  </Link>
</Button>
```

renders as:

```html
<span class="inline-flex items-center gap-2 whitespace-nowrap ...">
  <a href="/x">
    Own your bank data
    <svg>...</svg>
  </a>
</span>
```

The button styles (`inline-flex`, `whitespace-nowrap`, `items-center`) land on the `<span>`. The `<a>` is a default inline element, so when its container is narrow the icon wraps to a second line below the text.

## Why the span wrapper exists

The current code:

```js
const content = (
  <>
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </>
);

return (
  <Comp ...>
    {asChild ? <span className="inline-flex items-center gap-2">{content}</span> : content}
  </Comp>
);
```

Radix `Slot` requires a single React element child. `content` is a Fragment (loader + children), so a `<span>` was added to satisfy that constraint. That span ends up capturing all the button styling.

## Current workaround (in consumer apps)

Invert the structure — wrap `<Link>` around `<Button>`:

```jsx
<Link href="/x">
  <Button>
    Own your bank data
    <ArrowRight />
  </Button>
</Link>
```

Already applied in `orchestrator.finopsbricks.com` (commit `6ba9ea3e`) and `statements.finopsbricks.com`. The workaround is mechanical but easy to regress: future devs reach for `asChild` and hit the bug again.

## Proposed source fix

When `asChild` is true, do not wrap in a span. Render `children` directly so Radix `Slot` merges the button props onto the underlying `<Link>` / `<a>`. The loader path is incompatible with `asChild` anyway (you cannot prepend a sibling to a single Slot child without a wrapper) — treat `asChild` + `loading` as unsupported, or document that combination explicitly.

Sketch:

```js
if (asChild) {
  return (
    <Slot
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </Slot>
  );
}

return (
  <button data-slot="button" ... >
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </button>
);
```

## Implementation Phases

### Phase 1: Source fix ❌
- [ ] Update `src/primitives/button.jsx` per sketch above
- [ ] Decide on `asChild + loading` behaviour (drop loader silently, throw in dev, or document as unsupported)
- [ ] Update `button.stories.js` to cover `asChild` with a `<Link>` containing text + icon
- [ ] Visual regression check in Storybook

### Phase 2: Release ❌
- [ ] Bump version (minor — behaviour change for `asChild`)
- [ ] CHANGELOG entry under `### Fixed`
- [ ] Publish

### Phase 3: Consumer cleanup ❌
- [ ] Bump `@fob/lib-ui` in `statements.finopsbricks.com` and revert the `<Link><Button>` workaround back to `<Button asChild><Link>`
- [ ] Same for `orchestrator.finopsbricks.com`
- [ ] Same for any other consumer

## Related Files

- `src/primitives/button.jsx` — the component
- `src/primitives/button.stories.js` — stories
- Consumer workaround example (statements): `src/app/(marketing)/page.jsx`
- Consumer workaround example (orchestrator): commit `6ba9ea3e` "checks implementation and button cleanup"
