# WIP: Engine Migration Phase 2 - Batch 2 Components

## Overview

Migrate engine.fobrix.com to use `@fob/lib-ui` Batch 2 components (feature components).

**Prerequisite**: Phase 1 complete (40 UI primitives migrated)

**Goal**: Update imports for Batch 2 components, delete duplicates from engine.

---

## Migration Scope

### Components to Update (11 components, ~25 imports)

| Component | Import Change | Files Affected |
|-----------|--------------|----------------|
| AlertBox | `@/components/AlertBox` → `@fob/lib-ui/components/AlertBox` | 1 |
| AppBreadcrumbs | `@/components/AppBreadcrumbs` → `@fob/lib-ui/components/AppBreadcrumbs` | 6 |
| GoogleIcon | `@/components/GoogleIcon` → `@fob/lib-ui/components/GoogleIcon` | 1 |
| OutlineToggleGroup | `@/components/OutlineToggleGroup` → `@fob/lib-ui/components/OutlineToggleGroup` | 2 |
| PageHeader | `@/components/PageHeader` → `@fob/lib-ui/components/PageHeader` | 9 |
| Table | `@/components/Table` → `@fob/lib-ui/components/Table` | 4 |
| SnackbarProvider | Check if used | - |
| ProgressProvider | Check if used (ProgressBar.jsx) | - |
| StatsBarContainer | Check if used | - |
| ServiceWorkerRegistration | Check if used | - |
| ExportConfirmDialog | Check if used | - |

### Components Staying in Engine (NOT migrating)

| Component | Reason |
|-----------|--------|
| Logo | App-specific `/logo.svg` asset |
| PublicNavbar | Uses local Logo component |
| AmplitudeProvider | App-specific API key |
| AmplitudeUserIdentifier | Depends on AmplitudeProvider |
| PeriodSelector | Uses app-specific `PERIOD_OPTIONS` |
| TableOrCardsWithState | Uses app-specific `clientPreferences` |
| ShowJSON | `react-json-tree` incompatible with React 19 |

### Components for Batch 3 (Navigation/Layout)

| Component | Notes |
|-----------|-------|
| AdminHeader | Admin layout |
| MainContainer | Layout wrapper |
| AppLayout | Main app layout |
| AppSidebar | Complex navigation |
| OrgSwitcher | Org switching logic |
| NavUser | User dropdown |
| NavDeveloper | Developer toggle |
| OnboardingCard | Onboarding UI |
| FilterTrigger | Filter components |
| FoldFilterContainer | Filter components |

---

## Pre-Migration Checklist

- [ ] Update `@fob/lib-ui` in engine to latest version
- [ ] Verify all Batch 2 components are exported from `@fob/lib-ui`
- [ ] Test one component import before bulk update

```bash
# In engine.fobrix.com
npm update @fob/lib-ui
```

---

## Migration Steps

### Phase 2.1: Update @fob/lib-ui Package

```bash
cd /Users/alex/ec2code/cashflowy/engine.fobrix.com
npm update @fob/lib-ui
```

### Phase 2.2: Update Component Imports

#### AlertBox (1 file)
```bash
# Find
grep -r "from '@/components/AlertBox'" src/

# Update
# src/app/orgs/[o_id]/settings/apikeys/create/CreateAPIKey.jsx
```

**Before:**
```js
import AlertBox from '@/components/AlertBox';
```

**After:**
```js
import AlertBox from '@fob/lib-ui/components/AlertBox';
```

#### AppBreadcrumbs (6 files)
```bash
grep -r "from '@/components/AppBreadcrumbs'" src/
```

Files:
- `src/app/orgs/[o_id]/overview/Overview.jsx`
- `src/app/orgs/[o_id]/developer/api-docs/ApiDocsPage.jsx`
- `src/app/orgs/[o_id]/settings/members/ListMembers.jsx`
- `src/app/orgs/[o_id]/settings/feature_flags/FeatureFlags.jsx`
- `src/app/orgs/[o_id]/settings/General.jsx`
- `src/app/orgs/[o_id]/settings/apikeys/ListAPIKeys.jsx`
- `src/app/orgs/[o_id]/settings/apikeys/create/CreateAPIKey.jsx`

#### GoogleIcon (1 file)
```bash
grep -r "from '@/components/GoogleIcon'" src/
```

Files:
- `src/app/(auth)/login/GoogleAuthButton.jsx`

#### OutlineToggleGroup (2 files)
```bash
grep -r "from '@/components/OutlineToggleGroup'" src/
```

Files:
- `src/components/TableOrCards.jsx`
- `src/components/TableOrCardsWithState.jsx`

#### PageHeader (9 files)
```bash
grep -r "from '@/components/PageHeader'" src/
```

Files:
- `src/app/orgs/[o_id]/overview/Overview.jsx`
- `src/app/orgs/[o_id]/developer/api-docs/ApiDocsPage.jsx`
- `src/app/orgs/[o_id]/settings/members/ListMembers.jsx`
- `src/app/orgs/[o_id]/settings/feature_flags/FeatureFlags.jsx`
- `src/app/orgs/[o_id]/settings/General.jsx`
- `src/app/orgs/[o_id]/settings/apikeys/ListAPIKeys.jsx`
- `src/app/orgs/[o_id]/settings/apikeys/create/CreateAPIKey.jsx`
- `src/app/admin/jobs/ListJobs.jsx`
- `src/app/admin/orgs/ListOrgs.jsx`
- `src/app/admin/page.jsx`

#### Table (4 files)
```bash
grep -r "from '@/components/Table'" src/
```

Files:
- `src/app/orgs/[o_id]/settings/members/ListMembers.jsx`
- `src/app/orgs/[o_id]/settings/feature_flags/FeatureFlags.jsx`
- `src/app/orgs/[o_id]/settings/General.jsx`
- `src/app/orgs/[o_id]/settings/apikeys/ListAPIKeys.jsx`

### Phase 2.3: Verify Build

```bash
npm run build
```

### Phase 2.4: Delete Duplicates

After all imports are updated and build passes:

```bash
# Delete migrated components
rm src/components/AlertBox.jsx
rm src/components/AppBreadcrumbs.jsx
rm src/components/GoogleIcon.jsx
rm src/components/OutlineToggleGroup.jsx
rm src/components/PageHeader.jsx
rm src/components/Table.jsx

# Note: Keep these (app-specific or Batch 3)
# - src/components/Logo.jsx
# - src/components/PublicNavbar.jsx
# - src/components/AmplitudeProvider.jsx
# - src/components/AmplitudeUserIdentifier.jsx
# - src/components/PeriodSelector.jsx
# - src/components/TableOrCardsWithState.jsx
# - src/components/TableOrCards.jsx (keep, uses OutlineToggleGroup from @fob/lib-ui)
# - src/components/switchless/ShowJSON.jsx
# - src/components/navigation/* (Batch 3)
# - src/components/layout/* (Batch 3)
# - src/components/Filters/* (Batch 3)
```

### Phase 2.5: Final Verification

```bash
npm run build
npm run dev
```

---

## Import Patterns

```js
// Batch 2 components
import AlertBox from '@fob/lib-ui/components/AlertBox';
import AppBreadcrumbs from '@fob/lib-ui/components/AppBreadcrumbs';
import GoogleIcon from '@fob/lib-ui/components/GoogleIcon';
import OutlineToggleGroup from '@fob/lib-ui/components/OutlineToggleGroup';
import PageHeader from '@fob/lib-ui/components/PageHeader';
import Table from '@fob/lib-ui/components/Table';
import { SnackbarProvider, useSnackbar } from '@fob/lib-ui/components/SnackbarProvider';
import { ProgressProvider } from '@fob/lib-ui/components/ProgressProvider';
import StatsBarContainer from '@fob/lib-ui/components/StatsBarContainer';
import ServiceWorkerRegistration from '@fob/lib-ui/components/ServiceWorkerRegistration';
import ExportConfirmDialog from '@fob/lib-ui/components/ExportConfirmDialog';
```

---

## Estimated Changes

| Metric | Count |
|--------|-------|
| Files to update | ~15 |
| Import statements to change | ~25 |
| Components to delete | 6 |

---

## Notes

- TableOrCards.jsx stays in engine but will import OutlineToggleGroup from @fob/lib-ui
- TableOrCardsWithState.jsx stays (uses app-specific clientPreferences)
- Batch 3 (Navigation/Layout) will be a separate migration phase
