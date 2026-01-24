# WIP: Engine Migration to @fobrix/ui

## Overview

Migrate engine.fobrix.com from local `@/components/ui/` to `@fobrix/ui` package.

**Goal**: Delete all duplicate UI components from engine, use centralized @fobrix/ui library.

---

## Migration Stats

| Metric | Count |
|--------|-------|
| UI components to migrate | 40 |
| Import statements to update | 109 |
| `cn` utility imports | 13 |
| `use-mobile` hook imports | 0 |

---

## Pre-Migration Checklist

- [x] Add `transpilePackages: ['@fobrix/ui']` to `next.config.mjs`
- [x] Test with one component (SentryTestClient.jsx)
- [ ] Verify all components exist in @fobrix/ui

---

## Migration Steps

### Phase 1: Update Imports (do NOT delete yet)

Update all imports from `@/components/ui/X` to `@fobrix/ui/primitives/X`.

| Component | Import Count | Status |
|-----------|--------------|--------|
| button | 20 | ⏳ |
| badge | 8 | ⏳ |
| typography | 6 | ⏳ |
| sidebar | 5+ | ⏳ |
| separator | 5 | ⏳ |
| alert | 5 | ⏳ |
| input | 4 | ⏳ |
| dialog | 4 | ⏳ |
| breadcrumb | 3 | ⏳ |
| label | 3 | ⏳ |
| card | 3 | ⏳ |
| tabs | 2 | ⏳ |
| table | 6 | ⏳ |
| dropdown-menu | 2 | ⏳ |
| data-table | 2 | ⏳ |
| accordion | - | ⏳ |
| alert-dialog | - | ⏳ |
| avatar | - | ⏳ |
| button-group | - | ⏳ |
| calendar | - | ⏳ |
| checkbox | - | ⏳ |
| collapsible | - | ⏳ |
| combobox | - | ⏳ |
| command | - | ⏳ |
| popover | - | ⏳ |
| progress | - | ⏳ |
| resizable | - | ⏳ |
| select | - | ⏳ |
| sheet | - | ⏳ |
| skeleton | - | ⏳ |
| slider | - | ⏳ |
| sonner | - | ⏳ |
| stack | - | ⏳ |
| switch | - | ⏳ |
| textarea | - | ⏳ |
| timeline | - | ⏳ |
| toggle | - | ⏳ |
| toggle-group | - | ⏳ |
| tooltip | - | ⏳ |

### Phase 2: Update Utility Imports

| Import | From | To | Count |
|--------|------|-----|-------|
| cn | `@/utils/css/cn` | `@fobrix/ui/lib/utils` | 13 |
| useIsMobile | `@/hooks/use-mobile` | `@fobrix/ui/hooks/use-mobile` | 0 |

### Phase 3: Verify Build

```bash
cd /Users/alex/ec2code/cashflowy/engine.fobrix.com
npm run build
```

### Phase 4: Delete Duplicates

Only after build passes:

```bash
# Delete UI components
rm -rf src/components/ui/

# Delete utilities (if fully migrated)
rm src/utils/css/cn.js
rm src/hooks/use-mobile.js
```

### Phase 5: Final Verification

```bash
npm run build
npm run dev
# Manual smoke test of key pages
```

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

## Automated Migration Script

```bash
# Run from engine.fobrix.com root

# Update UI component imports
find src -name "*.jsx" -o -name "*.js" | xargs sed -i '' "s|from '@/components/ui/|from '@fobrix/ui/primitives/|g"

# Update cn utility imports
find src -name "*.jsx" -o -name "*.js" | xargs sed -i '' "s|from '@/utils/css/cn'|from '@fobrix/ui/lib/utils'|g"
```

⚠️ **Warning**: Review changes after running script. Some edge cases may need manual fixes.

---

## Rollback Plan

If migration fails:
1. `git checkout src/` to restore original imports
2. Remove `transpilePackages` from next.config.mjs
3. Investigate specific failures

---

## Files Already Migrated

| File | Components Used | Status |
|------|-----------------|--------|
| `src/app/admin/sentry-example-page/SentryTestClient.jsx` | Button, Card | ✅ Done |

---

## Notes

- Stories in `@/components/ui/*.stories.jsx` can be deleted (canonical stories live in fobrix-ui)
- Some components may have engine-specific modifications - diff before deleting
- Build must pass before deleting any files
