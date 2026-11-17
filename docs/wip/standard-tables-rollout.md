# Standard tables (T0–T2): build in lib-ui, roll out to every app

## Status: IN PROGRESS (~45%): lib-ui 0.9.1 tagged; Phase 2 built in statements, Alex's production check open; Phase 3 standard written in design-standards (2026-11-17, decision 0011); Phase 4 next
## Priority: P2: most list tables can't be sorted (e.g. statements /accounts); sort and pagination each have 5+ implementations
## Bet: finopsbricks

Three table variants live in lib-ui, and every table in every app uses one of them:
- T0 Static
- T1 Client
- T2 Server

Sort, pagination and the shared behaviour (headers, alignment, empty state, sticky header, resize) are built once in lib-ui, not per page. Audit done 2026-11-16 across finopsbricks/apps, internalops/apps and assemblyline/apps. T3 Workbench, T4 Report and T5 Tree extend this; see [[table-variants-workbench-report-tree]].

---

## Problem Statement

`/orgs/<o>/accounts` in statements can't be sorted. `AccountsTable` passes `enableSorting`, but every header is a plain string, and `DataTable` never makes a `<th>` clickable by itself. That mistake is why most "unsortable" tables in the monorepo can't be sorted.

The cause runs deeper. Each page assembles its own table from parts, so every concern has drifted.

**Sort: 5 implementations**

| Pattern | Where |
|---|---|
| `DataTable` + `SortableHeader`, client | statements/txn `TransactionsTable`; assemblyline orchestrator `Lines` |
| URL `sort_by`/`sort_order` + whitelist + `SortableHead` (`aria-sort`, asc→desc→none, drops `page`) | ledger `transactions`, `entries` |
| Ghost `Button` + `ArrowUpDown` (no direction shown) | statements admin orgs/parsers/statements; both orchestrators' admin orgs |
| "Sort by" select in the filter rail, with `sort_by` holding a *direction* | statements transactions/statements/rules; txn transactions |
| Hand-rolled `useState` + `<th onClick>` | fob-watch and control-room `ViewBin`; statements `(marketing)/supported-banks` |
| `enableSorting` with string headers: looks enabled, isn't | ~20 tables; see the inventory |

**Pagination: 6 implementations**

| Pattern | Where |
|---|---|
| `DataTable` built-in client footer ("1–30 of N rows shown", Prev/Next) | most `DataTable`s |
| lib-ui `Pagination` (`?page`, "Page X of Y", no count; Next stays enabled when `pageCount=0`; no `nav`/`aria-current`) | statements activity, staff queue; orchestrator staff queue |
| Local `Pager` (Link, "Page x of y · N", keeps sort and filters), **copied 3×** | ledger transactions, entries; ledger account view (`has_more` variant, no total) |
| Numbered pager capped at `Math.min(pageCount, 10)`, so pages after 10 can't be reached | orchestrator work-records |
| Prev/Next via `router.push` | txn parsed-emails |
| No pager at all on a server-paged list | statements `/statements`: rows past the first 100 can't be reached |

Two other pagination defects:
- **Double pagination:** a client footer of 30 rows inside server pages of 100 (staff queue in statements and both orchestrators).
- **Silent caps:** fetch-all lists cut off with no indication (statements categories/entities 500, admin statements 500, admin jobs 1000).

## Proposed Solution

### Layers

```
DataTable (TanStack primitive: rows, columns, sort/page/expand models)
  └─ T0–T5 variants (lib-ui: fixed behaviour per data shape)
       └─ domain tables (apps: TransactionsTable, AccountsTable, …: columns, cells, actions, domain features)
```

Variants don't replace domain tables. A domain table such as `TransactionsTable` stays in its app. It picks a variant and adds its own features on top, such as inline edit or bulk categorise. When a domain feature turns up in a second app, it moves down into a variant.

### The three variants

The variant is chosen by **where the rows live**. Everything else is a prop.

| Variant | Component | Rows | Sort | Pagination | Survives reload? |
|---|---|---|---|---|---|
| **T0 Static** | `Table` (`components/Table`) | few, fixed | none, on purpose | none | n/a |
| **T1 Client** | `DataTable` | all in the browser | client, in memory | built-in footer, or `hidePagination` for short tables | no |
| **T2 Server** | `DataTable mode="server"` | one page from the server | URL `sort_by` / `sort_order` | lib-ui `Pagination` from URL `page` | yes (the URL) |

**Rule: a sort survives a reload only when it's in the URL.** That is always true for T2. For T1 it holds only when the table is a T3 Workbench, which keeps its state in the URL ([[table-variants-workbench-report-tree]]). Nothing is persisted in localStorage. The localStorage sort in `TransactionsTable` (`useTableState`) moves to the URL as part of T3.

**Choosing:**
- Is it a fixed set of facts (key/value rows, a permission matrix, docs, ordered steps)? Use **T0**.
- Is the full list fine to load (up to a few thousand rows)? Use **T1**.
- Otherwise use **T2**.
- A T1 table that outgrows fetch-all becomes T2 by changing a prop and adding the server whitelist. The column definitions stay the same.

### Shared behaviour (lib-ui `DataTable`, both T1 and T2)

1. **Sortable by default.** Any column with an `accessorKey`/`accessorFn` and a string `header` renders `SortableHeader`; opt out with `enableSorting: false`. A column whose accessor returns an object needs a scalar accessor or a `sortingFn`.
2. **One click cycle:** asc → desc → back to the default order.
3. **Default sort works:** `initialState.sorting` is honoured and its arrow shows. Absorbs `design-gaps/data-table-default-sort.md`.
4. **`aria-sort` on `<th>`.** Absorbs `design-gaps/data-table-aria-sort.md`.
5. **Server mode:**
   - `manualSorting` and `manualPagination`.
   - Sorting state comes from `useSearchParams`. A header click pushes `sort_by`/`sort_order` and drops `page`. The cycle and `aria-sort` logic comes from ledger's `SortableHead`.
   - The built-in client footer is off, and `Pagination` renders below. This removes double pagination by construction.
6. **One server pager:** lib-ui `Pagination` absorbs ledger's `Pager`.
   - Props `page`, `total`, `pageSize`; Link-based; keeps every other search param; reads "Page x of y · N rows".
   - Optional `hasMore` instead of `total` for queries that can't count (ledger running-balance view).
   - `<nav aria-label="Pagination">`, `aria-current`; Next is disabled correctly at `pageCount ≤ 1`.
   - Absorbs `design-gaps/pagination-landmark-and-current.md`.
7. **No silent caps.** T1 fetches everything. If a list needs a cap, it is T2.
8. **Clean up:**
   - Remove the dead `searchKey`/`searchPlaceholder` props.
   - Resolve the double `Table` export (`index.js:33` vs `:50`).
   - Export `SortableHeader` and the server-mode pieces from the barrel.

Not changed here: density (`size`), sticky header, column resize, pinning and expansion already work in `DataTable` and stay as they are. Phone cards, column picker, selection and export are T3.

### Server side (apps with T2 tables)

Follow `engineering-standards/architecture/api/sorting-pattern.md` and `pagination-pattern.md`:
- A whitelist map from `sort_by` to SQL column.
- `DESC` by default.
- A tiebreaker, and `NULLS LAST` where needed.
- `page` plus a fixed page size.

The page and `/api/v1` share one helper per list. Ledger's `transactionOrder`/`entryOrder` and statements' `statementOrder`/`rulesOrder` (used by the API only today) are the models. The direction-in-`sort_by` select is removed wherever headers sort.

## Inventory

Fixes:
- **T1** = client sort (sortable by default fixes most of these with no page change).
- **T2** = server sort + `Pagination`.
- **swap** = replace a hand-rolled header or pager with the lib-ui one.
- **→T3/T4/T5** = handled in the extension WIP.

Settings lists (members, tags, apikeys, mailboxes) are one template copied into ~12 apps: fix them in `app-template`, then copy.

### statements.finopsbricks.com
| Table | File (`src/app/…`) | Fix |
|---|---|---|
| Accounts | `orgs/[o_id]/accounts/_components/AccountsTable.jsx` | T1 (scalar accessors for `date_range`, `review`) |
| Statements | `orgs/[o_id]/statements/_components/StatementsTable.jsx` | T2. Fixes the unreachable-after-100 bug; remove the sort select |
| Rules | `orgs/[o_id]/rules/ListRules.jsx` (`Table` today) | T1, default sort by priority; remove the sort select |
| Activity | `orgs/[o_id]/activity/_components/ActivityTable.jsx` | T2 |
| Category / entity detail | `categories/[slug]/ViewCategory.jsx`, `entities/[slug]/ViewEntity.jsx` | T1, remove the 500 cap |
| Statement tabs: Extracted, Jobs | `statements/[s_id]/_components/{ExtractedDataTab,BackgroundJobsTab}.jsx` | T1 (Extracted defaults to statement order) |
| Overview, upload status | `overview/Overview.jsx`, `upload-status/UploadStatus.jsx` | T1 |
| Admin orgs / parsers / statements | `admin/{orgs/ListOrgs,parsers/ListParsers,statements/ListStatements}.jsx` | swap headers; admin statements: remove the 500 cap or T2 |
| Admin jobs, parser detail | `admin/jobs/ListJobs.jsx`, `admin/parsers/[parser_name]/ViewParser.jsx` | T1 (jobs: 1000 cap → T2) |
| Staff queue | `staff/queue/ListJobs.jsx` | T2 (fixes double pagination) |
| Supported banks (marketing) | `(marketing)/supported-banks/CoverageExplorer.jsx` | swap to T1 |
| Transactions | `components/TransactionsTable/TransactionsTable.jsx` | →T3; remove the sort select now |
| Reports | `reports/**` | →T4 |
| Settings lists | `settings/{members,apikeys}` | T1 (template) |

### txn.finopsbricks.com
| Table | File | Fix |
|---|---|---|
| Accounts | `accounts/_components/AccountsTable.jsx` | T1 |
| Counterparties report | `reports/counterparties/ViewCounterpartiesReport.jsx` | T1 |
| Parsed emails | `parsed-emails/ListParsedEmails.jsx` | T2 (swap the `router.push` pager) |
| Transactions | `TransactionsTable.jsx` + `Filters/TransactionsFilter.jsx` | →T3; remove the sort select now |
| Inflow/outflow | `reports/inflow-outflow/ViewInflowOutflowReport.jsx` | →T4 |
| Settings lists incl. mailboxes | `settings/*` | T1 (template) |

### ledger.finopsbricks.com
| Table | File | Fix |
|---|---|---|
| Transactions, entries | `transactions/ListTransactions.jsx`, `entries/ListEntries.jsx` | T2 (migrate from local `SortableHead` + `Pager`) |
| Account view | `accounts/[acc_id]/ViewAccount.jsx` | swap the pager (`hasMore`); sorting excluded (running balance) |
| Accounts (flat view) | `accounts/ListAccounts.jsx` | T1. Tree view →T5 |
| Trial balance | `reports/trial-balance/TrialBalance.jsx` | →T4 |
| Settings lists | `settings/*` | T1 (template) |

### orchestrator.finopsbricks.com and orchestrator.assemblyline.sh (forked code: fix in both)
| Table | File | Fix |
|---|---|---|
| Stations | `orgs/[o_id]/stations/Stations.jsx` | T1 |
| Work records | `components/work-records/WorkRecordsTable.jsx` | T2 (fixes the 10-page cap) |
| Line detail: blockages, in-flight | `orgs/[o_id]/lines/[line]/ViewLine.jsx` | T1. The stations table stays in line order (T0) |
| Workers / factory sessions | `settings/workers/ListWorkers.jsx`, `settings/factory-sessions/ListFactorySessions.jsx` | T1 |
| Admin orgs | `admin/orgs/ListOrgs.jsx` | swap headers |
| Admin jobs | `admin/jobs/ListJobs.jsx` | T2 (1000 cap today) |
| Staff queue | `staff/queue/ListJobs.jsx` | T2 (fixes double pagination) |
| Lines | `orgs/[o_id]/lines/Lines.jsx` | done; default sort starts showing with fix 3 |
| Recent executions | `stations/[station_id]/_components/RecentExecutionsTable.jsx` | T1 |

### mdm, snapshots, documents, gst-india, mail, assistant, app-template, console
| Table | File | Fix |
|---|---|---|
| MDM objects, records | `mdm/ListObjects.jsx`, `mdm/[slug]/ObjectDetail.jsx` Records tab | T1 (records → T2 when they grow) |
| MDM prototype pages | `src/app/mdm/**` (hard-coded org) | excluded until it's promoted, or delete |
| Snapshots dashboards, widgets | `dashboards/ListDashboards.jsx`, `widgets/ListWidgets.jsx` | T1 |
| Settings lists | `settings/{members,tags,apikeys}` | T1 (template, fixed in `app-template` first) |

### internalops
| Table | File | Fix |
|---|---|---|
| tne expenses | `expenses/ListExpenses.jsx` | T1 now; →T3 (selection, phone cards) |
| tne claims, approvals | `components/claims/ClaimsList.jsx` | T1 (approvals default oldest first) |
| tne people | `settings/people/ListPeople.jsx` | T1 |
| timelog category table | `analytics/_components/CategoryTable.jsx` | →T5 |
| Settings lists (tne, timelog) | `settings/*` | T1 (template) |

### Tauri apps: fob-watch, control-room
Neither depends on lib-ui yet. Both already have Tailwind v4, so adding `@fob/lib-ui` is the first step.

| Table | File | Fix |
|---|---|---|
| Bin | `views/bin/ViewBin.jsx` | T1 (replaces the hand-rolled sort; keep orphan rows after the sorted rows) |
| Worker / factory, workers / factories overview | `views/worker/ViewWorker.jsx`, `views/workers-overview/…` (fob-watch); `views/factory/…`, `views/factories-overview/…` (control-room) | T1 |
| Workpiece files | `views/workpiece/ViewWorkpiece.jsx` | T1 |
| Line, journey, `log.jsonl`, clear dialog | `views/line`, `ViewWorkpiece` journey, `views/file/LogJsonlTable.jsx`, `components/ClearDialog.jsx` | T0 |
| Failures | `views/failures/ViewFailures.jsx` | T0 (grouped triage, order fixed by the WIP) |
| Housekeeping | `views/housekeeping/ViewHousekeeping.jsx` | →T5 |

### T0: no sort, on purpose
- **Key/value and form tables:** org General, feature flags, API-key create (key display, permission matrix), statement/account settings tabs, mdm golden-vs-sources.
- **Order carries meaning:** line stations (topological), mdm fields/schema (`position`), a transaction's own entries.
- **Logs and journeys:** mdm history, workpiece journey, `log.jsonl`, timelog daily table.
- **Raw data:** statements raw file (`ViewRawData`), snapshot widget tables (the author's row order).
- **Docs and marketing:** MDX tables, landing mockups, pricing calculator.

## Implementation Phases

Order (decided 2026-11-16): build in lib-ui, prove it on statements, then roll out. The design-standards pages are written once statements has validated the API (Phase 4), so they describe tested behaviour.

### Phase 1: lib-ui ✅
- [x] `DataTable`: fixes 1–5 and 7–8 above (7 is a rule for apps: nothing to build in lib-ui)
- [x] `Pagination`: fix 6 (absorb ledger `Pager`, `hasMore`, a11y)
- [x] Stories at phone and desktop widths with play functions (`regression-stories`)
- [x] Close `design-gaps/data-table-default-sort.md`, `data-table-aria-sort.md`, `pagination-landmark-and-current.md` (deleted; their design-standards updates are Phase 3 here)

Built as 0.9.0 on main, not tagged (2026-11-16). API as built:
- Sortable by default: a column with an accessor sorts unless `enableSorting: false`; a string `header` gets `SortableHeader` (right-aligned when `meta.isNumeric` or `text-right` in `meta.headerClassName`).
- `initialState.sorting` is the default order, in both modes. Cycle: asc → desc → default; clicking the default column when it shows the default starts its cycle at asc.
- `mode="server"`, `total` or `hasMore`, `pageSize`. The sort is the URL's `sort_by` = column id and `sort_order`; the click pushes with `router.push(…, { scroll: false })` and drops `page`. A `sort_by` that isn't a sortable column is ignored. Columns the server's whitelist doesn't cover set `enableSorting: false`.
- `Pagination`: `page` | `currentPage`, `total` + `pageSize` | `hasMore` | `pageCount`.

### Phase 2: statements (proving ground) 🔄
- [x] Point statements at the lib-ui build; accounts page sortable (the original ask)
- [x] One T2 table (statements list: fixes the unreachable-after-100 bug), plus an Uploaded column (default `created_at DESC`, arrow shown)
- [x] The rest of the statements inventory:
  - [x] Rules: T1, default priority, Created column, Sort By select removed
  - [x] Activity: T2 (Time sorts on the server)
  - [x] Category and Entity detail: T1, 500 cap removed
  - [x] Statement tabs: Extracted (default statement order), Background jobs (numeric Duration)
  - [x] Overview and Upload status: T1 on `DataTable`
  - [x] Admin orgs, parsers, statements: standard header; admin statements cap removed (1,598 rows, loaded without the JSON columns)
  - [x] Admin jobs: T2 (was the 1000 cap); counts from GROUP BY
  - [x] Parser detail: mock results sort numerically; raw grids T0
  - [x] Staff queue: T2, no double pagination
  - [x] Supported banks: `DataTable` T1
  - [x] Settings members and API keys: T1
  - [x] Transactions: Sort By select removed (TransactionsTable unchanged; localStorage stays until T3)
  - [x] Reports (T4 later): Total sorts numerically; period columns opt out
  - [x] Audit of every `DataTable` that became sortable by default (object, formatted or mixed accessors fixed or opted out)
- [x] Remove dead code: `rules/_components/RulesTable.jsx`, `statements/_components/UploadTable.jsx`, `statements/[s_id]/_components/DataGrid.jsx`
- [x] Floating buttons no longer cover the pager: `FoldFilterContainer` leaves room below them (pb-20 phone, pb-16 desktop)
- [x] Release lib-ui 0.9.0 (tagged `3b470ab`), pin statements to the tag
- [ ] Ship statements; Alex checks it in production

Server sort helper in statements: `src/utils/filter/sortOrder.js` (`sortOrder`, `parsePage`), used by `statementOrder`, activity, admin jobs and the staff queue.

### Phase 3: Standard written down ✅
- [x] design-standards `data-table.mdx`: layers, the variant table, the choosing rule, sortable by default, server mode, the click cycle, the URL-only persistence rule, no silent caps; live demos of a default sort and of server mode (in a frame, sorting and paging through its own URL)
- [x] design-standards `pagination` page: the one server pager (`total` + `pageSize` / `hasMore`, built-in `nav` and `aria-current`)
- [x] design-standards decision 0011 "tables come in variants chosen by where the rows live"; design-standards pinned to lib-ui v0.9.1 (2026-11-17)

### Phase 4: template and the other finopsbricks apps ❌
- [ ] `app-template` settings lists, then copy to every app that has them
- [ ] txn
- [ ] ledger (migrate to T2, delete the local `SortableHead` and the three `Pager`s)
- [ ] orchestrator.finopsbricks.com (+ delete `hooks/useTableState.js`, `components/TableOrCardsWithState.jsx`)
- [ ] mdm, snapshots

### Phase 5: internalops and assemblyline ❌
- [ ] tne, timelog
- [ ] orchestrator.assemblyline.sh
- [ ] fob-watch, control-room (add lib-ui first)

UI work in Phases 2–5 goes to the `ux-designer` agent. Each app ships through the `ship` skill. Create a short per-app WIP when an app's turn starts, linking back here.

## Proposals (noticed in Phases 1–3, not done)
- **Cards view has no sort control** on `/statements` (it keeps whatever sort the URL has). Decided 2026-11-16: leave for T3, whose phone cards need one too.
- **Old sort links:** `?sort_by=ASC` on statements and transactions, and `?sort_by=created_desc` etc. on rules, now open in the default order instead of the old one; nothing crashes.
- **Category/entity detail loads every matching transaction.** Fine at today's sizes; an "Uncategorized" bucket in a large org could be thousands of rows. If one gets slow, that view becomes T2.
- **`FoldFilterContainer` switches at 767px (`md`)**, not lib-ui's `sm` (640) line from 0.8.0. Not changed here.
- **The staff queue page throws `useSidebar must be used within a SidebarProvider`** in the real app. The T2 changes don't touch its breadcrumbs or sidebar, but the error wasn't checked against the pre-change code.
- **design-standards members and API-keys settings pages show T0 (`primitives/table`)**, while this inventory makes those settings lists T1. Align the pages when `app-template` moves (Phase 4).
- **Pagination on phone cards** should be "Show N more" per design-standards Responsive; the statements cards view uses Previous/Next for now.

## Related Files
- `src/primitives/data-table/data-table.jsx`, `SortableHeader.jsx`
- `src/components/Table.jsx`, `Pagination.jsx`
- `~/ec2code/finopsbricks/apps/ledger.finopsbricks.com/src/components/Table/SortableHead.jsx`
- `~/ec2code/finopsbricks/apps/ledger.finopsbricks.com/src/app/orgs/[o_id]/transactions/ListTransactions.jsx:414` (`Pager`)
- `~/ec2code/finopsbricks/apps/ledger.finopsbricks.com/src/utils/filter/filterTransactions.js` (whitelist + order)
- `~/ec2code/alex/design-standards/content/components/data-table.mdx`
- `~/ec2code/alex/engineering-standards/architecture/api/sorting-pattern.md`, `pagination-pattern.md`
