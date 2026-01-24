# ~~WIP:~~ Engine Migration to @fobrix/ui - COMPLETE

## Overview

Migrate engine.fobrix.com from local `@/components/ui/` to `@fobrix/ui` package.

**Goal**: Delete all duplicate UI components from engine, use centralized @fobrix/ui library.

**Status**: ✅ **COMPLETE** (2026-01-24)

---

## Migration Stats

| Metric | Count |
|--------|-------|
| UI components migrated | 40 |
| Import statements updated | 111 |
| `cn` utility imports updated | 17 |
| `use-mobile` hook imports | 0 |

---

## Pre-Migration Checklist

- [x] Add `transpilePackages: ['@fobrix/ui']` to `next.config.mjs`
- [x] Add Tailwind v4 `@source` directive (see below)
- [x] Test with one component (SentryTestClient.jsx)
- [x] Verify all components exist in @fobrix/ui

### Tailwind v4 Configuration (Critical)

Add this to `src/app/globals.css` after the imports:

```css
@source "../../node_modules/@fobrix/ui/src/**/*.{js,jsx}";
```

This tells Tailwind v4 to scan `@fobrix/ui` for CSS classes. Without this, styles won't be compiled and the UI will be broken.

---

## Migration Steps

### Phase 1: Update Imports ✅

All imports updated from `@/components/ui/X` to `@fobrix/ui/primitives/X`.

| Component | Status |
|-----------|--------|
| All 40 components | ✅ Done |

### Phase 2: Update Utility Imports ✅

| Import | From | To | Status |
|--------|------|-----|--------|
| cn | `@/utils/css/cn` | `@fobrix/ui/lib/utils` | ✅ Done |

### Phase 3: Verify Build ✅

Build passed successfully.

### Phase 4: Delete Duplicates ✅

Deleted:
- `src/components/ui/` (entire directory)
- `src/utils/css/cn.js`

### Phase 5: Final Verification ✅

Build passes after deletion.

---

## Import Replacement Patterns

### UI Components
```js
// Before
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

// After
import { Button } from '@fobrix/ui/primitives/button';
import { Card, CardHeader, CardTitle } from '@fobrix/ui/primitives/card';
```

### Utilities
```js
// Before
import { cn } from '@/utils/css/cn';

// After
import { cn } from '@fobrix/ui/lib/utils';
```

---

## Notes

- Migration completed successfully
- Build passes with only pre-existing ESLint warnings (unrelated to migration)
- Both single-quoted and double-quoted imports were handled
