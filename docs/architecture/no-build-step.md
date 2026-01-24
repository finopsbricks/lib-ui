# Architecture Decision: No Build Step

## Decision

Ship raw JSX source files instead of pre-compiled JavaScript.

## Context

Component libraries typically have two distribution approaches:

| Approach | Description |
|----------|-------------|
| **Pre-compiled** | Use bundler (tsup, rollup) to compile JSX → JS before publishing |
| **Source files** | Ship raw `.jsx` files, let consuming apps transpile |

## Why Source Files?

1. **Simplicity** - No build tooling to maintain in this repo
2. **Debugging** - Easier to debug since source maps point to actual source
3. **Small consumer base** - Only 2 apps (engine, txn) use this library
4. **Internal library** - Not published to npm for external use

## Tradeoff

Consuming apps must add `@fobrix/ui` to their Next.js config:

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['@fobrix/ui'],
  // ... rest of config
};
```

## What is transpilePackages?

Next.js doesn't process JSX from `node_modules` by default. The `transpilePackages` option tells Next.js to run its compiler (SWC) on the specified packages, converting JSX to JavaScript.

## Build Time Impact

| Scenario | What happens |
|----------|--------------|
| **transpilePackages** | Next.js transpiles ~40 fobrix-ui files on each build |
| **Pre-compiled** | Next.js skips transpiling, uses JS directly |

For ~40 small component files, this is approximately **2-5 seconds** difference per build. Not meaningful for a library this size.

**Where pre-compile helps:**
- Dev server cold start (first load) - slightly faster
- Non-Next.js consumers (Vite, CRA) - works without config
- Standard npm package behavior

**Where it doesn't matter:**
- Build speed for a library this size
- Hot reload during development

## When to Reconsider

Consider adding a build step if:
- More than 5 apps consume this library
- External teams/projects need to use it
- Non-Next.js apps need to consume it (e.g., Vite, CRA)

## Setup Required in Consuming Apps

### engine.fobrix.com

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['@fobrix/ui'],
  // ...
};
```

### txn.fobrix.com

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['@fobrix/ui'],
  // ...
};
```
