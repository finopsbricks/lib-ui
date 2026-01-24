# WIP: Component Migration Plan

## Overview

This document tracks the migration of shared components from `engine.fobrix.com` - /Users/alex/ec2code/cashflowy/engine.fobrix.com and `txn.fobrix.com` - /Users/alex/ec2code/cashflowy/txn.fobrix.com into this centralized `@fobrix/ui` library.

**Goal**: Single source of truth for all shared UI components, eliminating drift and centralizing stories/tests.

**Repo**: `github:cashflowy/fobrix-ui`

---

## Migration Status

| Batch | Description | Components | Status |
|-------|-------------|------------|--------|
| **Batch 1** | UI Primitives (shadcn/ui) | 40 | ✅ Complete |
| **Batch 2** | Common Feature Components | ~24 | ⏳ Pending |
| **Batch 3** | Navigation & Layout | ~15 | ⏳ Pending |
| **Cleanup** | Update imports & delete duplicates | - | ⏳ Pending |

---

## Batch 1: UI Primitives ✅ COMPLETE

### Components Migrated (40)

| Component | Stories | Notes |
|-----------|---------|-------|
| accordion.jsx | - | Standard shadcn |
| alert.jsx | - | Standard shadcn |
| alert-dialog.jsx | - | Standard shadcn |
| avatar.jsx | - | Standard shadcn |
| badge.jsx | - | Standard shadcn |
| breadcrumb.jsx | - | Standard shadcn |
| button.jsx | ✅ | Standard shadcn |
| button-group.jsx | - | Custom extension |
| calendar.jsx | - | Standard shadcn |
| card.jsx | - | Standard shadcn |
| checkbox.jsx | - | Standard shadcn |
| collapsible.jsx | - | Standard shadcn |
| combobox.jsx | - | Standard shadcn |
| command.jsx | - | Standard shadcn |
| dialog.jsx | ✅ | Standard shadcn |
| dropdown-menu.jsx | - | Standard shadcn |
| input.jsx | ✅ | Standard shadcn |
| label.jsx | - | Standard shadcn |
| popover.jsx | - | Standard shadcn |
| progress.jsx | - | Standard shadcn |
| resizable.jsx | - | Standard shadcn |
| select.jsx | ✅ | Standard shadcn |
| separator.jsx | - | Standard shadcn |
| sheet.jsx | - | Standard shadcn |
| sidebar.jsx | - | Standard shadcn |
| skeleton.jsx | - | Standard shadcn |
| slider.jsx | - | Standard shadcn |
| sonner.jsx | - | Toast notifications |
| stack.jsx | - | Custom extension |
| switch.jsx | - | Standard shadcn |
| table.jsx | - | Standard shadcn |
| tabs.jsx | - | Standard shadcn |
| textarea.jsx | - | Standard shadcn |
| timeline.jsx | - | Custom component |
| toggle.jsx | - | Standard shadcn |
| toggle-group.jsx | - | Standard shadcn |
| tooltip.jsx | - | Standard shadcn |
| typography.jsx | ✅ | Custom component |
| data-table/data-table.jsx | - | TanStack wrapper |
| data-table/DateHeader.jsx | ✅ | Custom component |

### Also Migrated
- `src/lib/utils.js` - cn() utility function
- `src/hooks/use-mobile.js` - Mobile breakpoint hook
- `src/styles/globals.css` - Tailwind theme variables

---

## Batch 2: Common Feature Components ⏳ PENDING

### Components to Migrate

| Component | Engine | Txn | Drift? | Priority | Notes |
|-----------|--------|-----|--------|----------|-------|
| **Markdown.jsx** | ✅ | ✅ | **YES** | HIGH | Engine version is more complete (235 vs 109 lines) |
| AlertBox.jsx | ✅ | ✅ | Check | Medium | Alert component |
| AmplitudeProvider.jsx | ✅ | ✅ | Check | Low | Analytics wrapper |
| AmplitudeUserIdentifier.jsx | ✅ | ✅ | Check | Low | Analytics wrapper |
| AppBreadcrumbs.jsx | ✅ | ✅ | Check | Medium | May have app-specific routes |
| CustomTab.jsx | ✅ | ✅ | Check | Medium | Tab component |
| DatePicker.jsx | ✅ | ✅ | Check | High | Date selection |
| ExportConfirmDialog.jsx | ✅ | ✅ | Check | Medium | Export dialog |
| GoogleIcon.jsx | ✅ | ✅ | Check | Low | OAuth icon |
| Link.jsx | ✅ | ✅ | Check | Low | Next.js Link wrapper |
| Logo.jsx | ✅ | ✅ | Check | Low | Brand asset |
| MultiSelect.jsx | ✅ | ✅ | Check | High | Multi-select dropdown |
| OutlineToggleGroup.jsx | ✅ | ✅ | Check | Medium | Toggle group variant |
| PageHeader.jsx | ✅ | ✅ | Check | Medium | Page header |
| Pagination.jsx | ✅ | ✅ | Check | Medium | URL-based pagination |
| PeriodSelector.jsx | ✅ | ✅ | Check | Medium | Date range selector |
| ProgressBar.jsx | ✅ | ✅ | Check | Low | Progress wrapper |
| PublicNavbar.jsx | ✅ | ✅ | Check | Medium | Public pages nav |
| ServiceWorkerRegistration.jsx | ✅ | ✅ | Check | Low | PWA registration |
| SnackbarProvider.jsx | ✅ | ✅ | Check | Low | Toast provider |
| StatsBarContainer.jsx | ✅ | ✅ | Check | Medium | Stats display |
| Table.jsx | ✅ | ✅ | Check | High | Table wrapper |
| TableOrCards.jsx | ✅ | ✅ | Check | Medium | Responsive table/cards |
| TableOrCardsWithState.jsx | ✅ | ✅ | Check | Medium | Stateful version |
| magicui/animated-grid-pattern.jsx | ✅ | ✅ | Check | Low | Animation |
| magicui/aurora-text.jsx | ✅ | ✅ | Check | Low | Animation |
| switchless/ShowJSON.jsx | ✅ | ✅ | Check | Low | JSON viewer |
| ErrorMessage/ | ✅ | ✅ | Check | Medium | Error display |

### Migration Steps for Each Component

1. Compare versions in both repos (`diff`)
2. If different, pick the more complete/recent version
3. Copy to fobrix-ui with updated imports
4. Copy associated story files
5. Test in Storybook
6. Commit and push

---

## Batch 3: Navigation & Layout ⏳ PENDING

### Components to Migrate

| Component | Notes |
|-----------|-------|
| navigation/AppHeader.jsx | May need abstraction for app-specific actions |
| navigation/AppSidebar.jsx | **Complex** - has app-specific nav items |
| navigation/NavDeveloper.jsx | Developer toggle |
| navigation/NavUser.jsx | User dropdown |
| navigation/OnboardingCard.jsx | Onboarding UI |
| navigation/OnboardingStepper.jsx | Onboarding stepper |
| navigation/OrgSwitcher.jsx | Org switching |
| layout/AppLayout.jsx | Main layout wrapper |
| layout/MainContainer.jsx | Content container |
| AdminHeader.jsx | Admin header |
| AdminSidebar/ | Admin sidebar |
| Navbar/ | Legacy navbar |
| Filters/FilterTrigger.jsx | Filter button |
| Filters/FoldFilterContainer.jsx | Collapsible filter |

### Considerations for Batch 3

Navigation components have app-specific logic:
- **AppSidebar** has hardcoded navigation items
- **OrgSwitcher** may have app-specific API calls

**Options:**
1. Abstract nav items as props (more work, cleaner)
2. Keep app-specific parts in each app, share only the shell
3. Use config files that each app provides

---

## Components Staying in Apps (NOT migrating)

### engine.fobrix.com only
| Component | Reason |
|-----------|--------|
| work-records/StepOutputTabs.jsx | Process engine specific |

### txn.fobrix.com only
| Component | Reason |
|-----------|--------|
| AIChatAssistant/ (23 components) | Txn-specific AI chat |
| Activity/ | Activity log |
| Charts/ (5 components) | Financial charts |
| FileDropzone/ | File upload |
| Filters/FilterContainer.jsx | Txn-specific |
| Filters/FilterField.jsx | Txn-specific |
| Filters/FoldFilterContainerWithState.jsx | Txn-specific |
| Filters/TransactionsFilter.jsx | Txn-specific |
| ProcessingSteps.jsx | Upload processing |
| SourceBadge.jsx | Transaction source |
| TransactionsTable/ | Inline editing table |
| UploadFile/ | Upload modal |

---

## Cleanup: Update Imports & Delete Duplicates

### Step 1: Update imports in engine.fobrix.com

```bash
# Find all files importing from @/components/ui/
grep -r "from '@/components/ui/" src/ --include="*.jsx" --include="*.js"

# Update imports (example)
# Before: import { Button } from '@/components/ui/button';
# After:  import { Button } from '@fobrix/ui/ui/button';
```

**Files to update:**
- [ ] All files in `src/app/`
- [ ] All files in `src/components/` (non-ui)
- [ ] Any other files importing from `@/components/ui/`

### Step 2: Update imports in txn.fobrix.com

Same process as engine.fobrix.com.

### Step 3: Delete duplicates from engine.fobrix.com

```bash
# After all imports are updated and tested
rm -rf src/components/ui/
rm src/utils/css/cn.js  # Now in @fobrix/ui
rm src/hooks/use-mobile.js  # Now in @fobrix/ui
```

### Step 4: Delete duplicates from txn.fobrix.com

```bash
rm -rf src/components/ui/
rm src/utils/css/cn.js
rm src/hooks/use-mobile.js
```

### Step 5: Verify both apps build and run

```bash
# In each app
npm run build
npm run dev
npm run storybook:dev  # If applicable
```

---

## Import Patterns

### Option A: Import from main entry
```jsx
import { Button, Dialog, Input, cn } from '@fobrix/ui';
```

### Option B: Import from specific paths
```jsx
import { Button } from '@fobrix/ui/ui/button';
import { cn } from '@fobrix/ui/lib/utils';
import { useIsMobile } from '@fobrix/ui/hooks/use-mobile';
```

### Recommendation
Use **Option B** for now - more explicit, better tree-shaking.

---

## Package Installation

Both apps should have this in package.json:

```json
{
  "dependencies": {
    "@fobrix/ui": "github:cashflowy/fobrix-ui"
  }
}
```

To update to latest:
```bash
npm update @fobrix/ui
```

---

## Storybook

The canonical Storybook lives in this repo (fobrix-ui).

```bash
# Run locally
npm run storybook:dev

# Build static
npm run storybook:build

# Run tests
npm run storybook:test

# CI pipeline (build + serve + test)
npm run storybook:test:ci
```

**Future consideration**: Deploy Storybook to a URL for team reference.

---

## Storybook Alignment (Phase 0) ✅ IN PROGRESS

### Problem

Initial fobrix-ui setup used `@storybook/react-vite` (Vite-based), but:
1. Components will use Next.js primitives (`next/link`, `next/image`, etc.)
2. Engine and txn apps use `@storybook/nextjs` (Webpack-based)
3. Engineering standards specify `@storybook/nextjs`

### Solution

Align fobrix-ui Storybook setup with engine.fobrix.com:

| Item | Before | After |
|------|--------|-------|
| Framework | `@storybook/react-vite` | `@storybook/nextjs` |
| Build tool | Vite | Webpack (via Next.js) |
| Tailwind | `@tailwindcss/vite` | `@tailwindcss/postcss` |
| `test-runner.js` | Missing | Added |
| `manager.js` | Missing | Added |
| `mocks/action.js` | Missing | Added |
| `@chromatic-com/storybook` | Missing | Added |
| CI scripts | Basic | Full pipeline |

### Changes Made

1. **package.json**
   - Removed: `@storybook/react-vite`, `@tailwindcss/vite`, `vite`
   - Added: `@storybook/nextjs`, `@tailwindcss/postcss`, `@chromatic-com/storybook`, `concurrently`, `wait-on`, `playwright`
   - Updated scripts to match engine

2. **Configuration Files**
   - `.storybook/main.js` - Switched to `@storybook/nextjs` with webpack action mocking
   - `.storybook/preview.js` - Added Next.js parameters, mobile-first viewport
   - `.storybook/test-runner.js` - Added Playwright test config
   - `.storybook/manager.js` - Added UI theme
   - `.storybook/mocks/action.js` - Added universal server action mocking

3. **Build System**
   - Removed: `vite.config.js`
   - Added: `postcss.config.js` for Tailwind

---

## Open Questions

1. **CSS Theme**: Apps need matching Tailwind CSS variables. Should apps import `@fobrix/ui/styles/globals.css` or maintain their own?

2. **Versioning**: Currently using git main branch. Should we tag releases (v0.1.0, v0.2.0)?

3. **Navigation abstraction**: How to handle app-specific nav items in AppSidebar?

4. **Storybook hosting**: Where to deploy the canonical Storybook?

---

## Changelog

### 2025-01-24
- Created fobrix-ui repo
- Migrated Batch 1 (40 UI primitives)
- Added Storybook configuration
- Added 6 story files
- Tested installation in engine.fobrix.com
