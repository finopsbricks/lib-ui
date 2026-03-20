# Move Amplitude exports out of lib-ui barrel

**Status**: done

## Problem

lib-ui's barrel export (`index.js`) includes `AmplitudeProvider`, `AmplitudeUserIdentifier`, and `useAmplitude`. These depend on `@amplitude/analytics-browser` and `@amplitude/plugin-session-replay-browser` which are optional peer deps. But because the barrel exports them unconditionally, webpack resolves them at build time, forcing every consuming app to install amplitude — even apps that don't use it (like auth).

## Solution

Create a dedicated `@fob/lib-ui/amplitude` subpath export. Remove amplitude from the barrel.

Consumer apps that use amplitude import from:
```js
import { AmplitudeProvider, AmplitudeUserIdentifier } from '@fob/lib-ui/amplitude';
```

Apps that don't use amplitude are unaffected — the barrel no longer pulls in amplitude modules.

## Changes

### lib-ui (3 files)

**Create** `src/amplitude.js`:
```js
export { default as AmplitudeProvider, useAmplitude } from './components/AmplitudeProvider';
export { default as AmplitudeUserIdentifier } from './components/AmplitudeUserIdentifier';
```

**Edit** `package.json` — add to `exports`:
```json
"./amplitude": "./src/amplitude.js"
```

**Edit** `src/index.js` — remove:
```js
export { default as AmplitudeProvider, useAmplitude } from './components/AmplitudeProvider';
export { default as AmplitudeUserIdentifier } from './components/AmplitudeUserIdentifier';
```

### statements (2 files)

- `src/app/layout.jsx` — `'@fob/lib-ui'` → `'@fob/lib-ui/amplitude'` for AmplitudeProvider
- `src/components/navigation/AppSidebar.jsx` — split `{ Logo, AmplitudeUserIdentifier }` into two imports

### orchestrator (2 files)

- `src/app/layout.jsx` — `'@fob/lib-ui'` → `'@fob/lib-ui/amplitude'` for AmplitudeProvider
- `src/components/navigation/AppSidebar.jsx` — split `{ Logo, AmplitudeUserIdentifier }` into two imports

### auth (1 file)

- `package.json` — remove `@amplitude/analytics-browser` and `@amplitude/plugin-session-replay-browser`

## Verification

1. `npm run build` in auth — succeeds without amplitude installed
2. `npm run build` in statements — succeeds with new import paths
3. `npm run build` in orchestrator — succeeds with new import paths
