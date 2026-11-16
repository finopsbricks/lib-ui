# Table variants T3 Workbench, T4 Report, T5 Tree

## Status: NOT STARTED
## Priority: P3: each exists as a page-specific build today; reuse waits on T1/T2 first
## Bet: finopsbricks

This extends [[standard-tables-rollout]] (T0 Static, T1 Client, T2 Server) with three more lib-ui variants:
- **T3 Workbench:** a table users work in (choose columns, select rows, act in bulk, export).
- **T4 Report:** aggregated numbers with period columns and totals.
- **T5 Tree:** rows nested under rows.

Each one is drawn from tables that already exist, listed below.

---

## Problem Statement

Each of these shapes has been built page by page.

**Workbench**
- statements `TransactionsTable`, copied to txn: toolbar with density, column visibility, order and pinning; row selection with bulk edit/delete; inline-edit cells; client CSV export; phone cards in txn only; state in localStorage (`useTableState`).
- tne `ListExpenses`: selection bar with a running total, phone cards (`useIsMobile`), columns hidden by container query.
- tne workbench (planned, `docs/wip/workbench-and-reports.md`): sortable and filterable, bulk approve, phone, export.

**Report**
- statements `TxnTypeDataTable`, cashflow `DataTable`, `ReconcileTransfersTable`: pinned label column, `DateHeader` period columns, no paging.
- statements balance report and balance sheet: lib-ui `Table`, grouped rows.
- txn inflow/outflow: one table per currency.
- ledger trial balance.
- tne standard reports (planned).

**Tree**
- ledger `AccountTree`: a div tree-grid with rolled-up balances, open to depth 2.
- timelog `CategoryTable`: expandable, siblings sorted by total, share and change columns.
- fob-watch and control-room `Housekeeping`: tri-state checkbox tree with bulk Clear.

## Proposed Solution

All three are built on `DataTable`, so they share sorting, URL state, the pager, sticky header and resizing from T1/T2. Each adds a layer on top. Don't add a second table engine.

Domain tables stay in their apps and are built on a variant (see Layers in [[standard-tables-rollout]]). `TransactionsTable` remains statements' and txn's transactions table. It moves onto T3 and keeps its domain features, such as inline-edit cells and bulk categorise. "Migrate" below means rebuilding it on the variant, not removing it.

### T3 Workbench: `DataTable` + toolbar kit
- **Toolbar parts** (`toolbar` prop):
  - density toggle
  - column picker: visibility, order, pinning
  - export (CSV of the filtered and sorted rows, through `ExportConfirmDialog`)
- **Row selection:** a checkbox column, plus a bulk-action bar that shows the count and an optional sum column.
- **Phone cards:** `renderCard(row)`. Below `sm`, the table renders cards, as the design-standards Responsive rule asks for wide tables.
- **State in the URL:**
  - sort (T1 or T2), page, density.
  - This replaces `useTableState`'s localStorage (decision 2026-11-16: state survives only through the URL).
  - **Open:** column visibility, order and widths in the URL make long URLs. Options: a short encoded `cols=` param, or reset on reload.
- **Inline-edit cells:** keep these per app for now. Only transactions has them.

### T4 Report: `DataTable` + report layout
- Pinned label column, with indented group rows when grouped (balance sheet).
- Period columns from a list of period keys, with `DateHeader` labels.
- Right-aligned `tabular-nums`.
- Totals row (`TableFooter`), and an optional totals column.
- Sort by label and by total (T1 rules). Period columns are sortable too.
- Optional drill-through link per cell.
- No pagination.

### T5 Tree: `DataTable` + sub-rows
- TanStack `getSubRows` + `getExpandedRowModel`.
  - Sorting reorders siblings within each parent, which is exactly timelog's behaviour.
- Indented expander in the first column, `role="treegrid"` with `aria-level` / `aria-expanded`, keyboard expand and collapse.
- Default expanded depth (ledger opens to depth 2).
- Values rolled up from children, supplied as data. The tree does no accounting.
- Optional tri-state selection (Housekeeping).

## Implementation Phases

### Phase 1: Design ❌
- [ ] Settle the open question on column-layout state in the URL
- [ ] design-standards pages for T3, T4, T5 (when to use each, anatomy)

### Phase 2: T3 Workbench ❌
- [ ] lib-ui toolbar kit, selection bar, `renderCard`, URL state
- [ ] Migrate statements `TransactionsTable`, then txn's copy (delete `useTableState`)
- [ ] tne expenses; then the tne workbench builds on it

### Phase 3: T4 Report ❌
- [ ] lib-ui report layout
- [ ] Migrate statements reports (by category/entity, cashflow, transfers, balance, balance sheet), txn inflow/outflow, ledger trial balance

### Phase 4: T5 Tree ❌
- [ ] lib-ui sub-row tree
- [ ] Migrate ledger `AccountTree`, timelog `CategoryTable`, fob-watch and control-room Housekeeping

UI work goes to the `ux-designer` agent, after [[standard-tables-rollout]] Phase 2 (lib-ui T1/T2) has shipped.

## Related Files
- `~/ec2code/finopsbricks/apps/statements.finopsbricks.com/src/components/TransactionsTable/TransactionsTable.jsx`, `src/hooks/useTableState.js`
- `~/ec2code/internalops/apps/tne.internalops.ai/src/app/orgs/[o_id]/expenses/ListExpenses.jsx`
- `~/ec2code/internalops/apps/tne.internalops.ai/docs/wip/workbench-and-reports.md`
- `~/ec2code/finopsbricks/apps/statements.finopsbricks.com/src/app/orgs/[o_id]/reports/_components/TxnTypeDataTable.jsx`
- `~/ec2code/finopsbricks/apps/ledger.finopsbricks.com/src/app/orgs/[o_id]/accounts/ListAccounts.jsx` (`AccountTree`)
- `~/ec2code/internalops/apps/timelog/src/app/orgs/[o_id]/analytics/_components/CategoryTable.jsx`
- `src/primitives/data-table/DateHeader.jsx`, `src/components/ExportConfirmDialog.jsx`
