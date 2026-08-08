// @ts-check
"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "../button"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"
import { cn } from "../../lib/utils"

/**
 * @typedef {Object} ColumnMeta
 * @property {string} [headerClassName] - CSS class for table header
 * @property {string} [cellClassName] - CSS class for table cells
 */

/**
 * Drag-to-resize handle for a column header. Persistently visible (not just
 * on hover) so the affordance is discoverable, and double-click auto-fits
 * the column to its widest currently-rendered cell.
 * @param {{ header: any, table: any, tableRef: React.RefObject<HTMLTableElement> }} props
 */
function ColumnResizeHandle({ header, table, tableRef }) {
  const [isHovering, setIsHovering] = React.useState(false)
  const isActive = isHovering || header.column.getIsResizing()

  const handleAutoFit = () => {
    const tableEl = tableRef.current
    if (!tableEl) return
    const cells = tableEl.querySelectorAll(`[data-col-id="${header.column.id}"]`)
    // scrollWidth on the <td>/<th> itself only helps under table-layout:auto,
    // where the cell's own box grows to fit content. Under table-layout:fixed
    // (the whole point of which is that the cell's box does NOT grow), the
    // overflow signal lives on some inner wrapper instead — and which one
    // varies per column (a .truncate div for text, a Badge for a status
    // column, etc). Measuring the cell's actual text in an offscreen probe
    // sidesteps needing to know that inner structure at all.
    const probe = document.createElement("div")
    probe.style.position = "absolute"
    probe.style.visibility = "hidden"
    probe.style.whiteSpace = "nowrap"
    probe.style.pointerEvents = "none"
    document.body.appendChild(probe)
    let widest = 0
    cells.forEach((cell) => {
      const style = getComputedStyle(cell)
      probe.style.font = style.font
      probe.style.letterSpacing = style.letterSpacing
      probe.textContent = cell.textContent
      const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
      widest = Math.max(widest, probe.getBoundingClientRect().width + paddingWidth)
    })
    document.body.removeChild(probe)
    if (widest <= 0) return
    const minSize = header.column.columnDef.minSize ?? 20
    const maxSize = header.column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER
    const nextSize = Math.min(maxSize, Math.max(minSize, widest + 16))
    table.setColumnSizing((old) => ({ ...old, [header.column.id]: nextSize }))
  }

  const handleKeyDown = (e) => {
    const step = 12
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const minSize = header.column.columnDef.minSize ?? 20
      const maxSize = header.column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER
      const delta = e.key === "ArrowLeft" ? -step : step
      const nextSize = Math.min(maxSize, Math.max(minSize, header.column.getSize() + delta))
      table.setColumnSizing((old) => ({ ...old, [header.column.id]: nextSize }))
      e.preventDefault()
    } else if (e.key === "Enter" || e.key === " ") {
      handleAutoFit()
      e.preventDefault()
    }
  }

  return (
    // Outer div is the hit target — kept at full height so it's still easy
    // to grab, even though the visible line (the inner span) is shorter.
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize ${header.column.id} column`}
      tabIndex={0}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onDoubleClick={handleAutoFit}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
      className="absolute -right-1 top-0 h-full w-3 cursor-col-resize select-none touch-none z-30 focus-visible:outline-none"
    >
      <span
        className="absolute left-1/2 -translate-x-1/2 w-px rounded-full transition-colors"
        style={{
          top: "22%",
          bottom: "22%",
          background: isActive ? "var(--primary)" : "var(--border)",
        }}
      />
    </div>
  )
}

/**
 * @param {{
 *   columns?: any[],
 *   data?: any[],
 *   className?: string,
 *   toolbar?: (table: any) => React.ReactNode,
 *   searchKey?: string,
 *   searchPlaceholder?: string,
 *   pageSize?: number,
 *   size?: 'sm' | 'md' | 'lg',
 *   hidePagination?: boolean,
 *   onPaginationChange?: (pageData: any[]) => void,
 *   onFilterChange?: (filteredData: any[]) => void,
 *   initialState?: any,
 *   defaultColumn?: any,
 *   columnResizeMode?: 'onChange' | 'onEnd',
 *   enableColumnResizing?: boolean,
 *   enableSorting?: boolean,
 *   enableColumnFilter?: boolean,
 *   renderSubComponent?: (row: any) => React.ReactNode,
 *   getRowCanExpand?: (row: any) => boolean,
 *   tableLayout?: 'auto' | 'fixed'
 * }} props
 * @returns {React.JSX.Element}
 */
export function DataTable({
  columns,
  data,
  className,
  toolbar,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 30,
  size = "md",
  hidePagination = false,
  onPaginationChange,
  onFilterChange,
  initialState: passedInitialState,
  renderSubComponent,
  tableLayout = "auto",
  ...props
}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [expanded, setExpanded] = React.useState({})
  const tableRef = React.useRef(null)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
    initialState: {
      ...passedInitialState,
      pagination: {
        pageSize: pageSize,
        ...passedInitialState?.pagination,
      },
    },
    ...props,
  })

  // Call the callback when pagination changes
  React.useEffect(() => {
    if (onPaginationChange) {
      const paginatedRows = table.getRowModel().rows;
      const pageData = paginatedRows.map(row => row.original);
      onPaginationChange(pageData);
    }
  }, [table.getState().pagination.pageIndex, table.getFilteredRowModel().rows.length])

  // Call the callback when filters change
  React.useEffect(() => {
    if (onFilterChange) {
      const filteredRows = table.getFilteredRowModel().rows;
      const filteredData = filteredRows.map(row => row.original);
      onFilterChange(filteredData);
    }
  }, [columnFilters, table.getFilteredRowModel().rows.length])

  const sizeClasses = {
    'sm': '[&_td]:py-1 [&_th]:px-3 [&_td]:px-3 [&_td]:text-xs [&_th]:text-xs [&_td]:leading-tight [&_th]:leading-tight',
    'md': '[&_td]:py-2 [&_th]:px-3 [&_td]:px-3 [&_td]:text-sm [&_th]:text-sm',
    'lg': 'text-base'
  };
  // Header height/padding is set directly on <TableHead> below, not via the
  // [&_th]:... arbitrary-descendant classes above, for two reasons:
  // 1. TableHead has its own hardcoded h-12 (see ../table.jsx) which beats
  //    a same-specificity [&_th]:h-9 regardless of `size` — that never
  //    actually applied. cn()'s tailwind-merge only correctly replaces it
  //    when the override is in the SAME cn() call, i.e. on TableHead itself.
  // 2. A <th>'s declared height is a floor, not a cap — the row still grows
  //    to fit its tallest cell's actual content. SortableHeader's button
  //    (h-6, see ./SortableHeader.jsx) plus this padding is what actually
  //    determines the rendered height; the height class below is just a
  //    consistent minimum for columns with no sort button.
  const headerClasses = { sm: 'h-6 py-1', md: 'h-9 py-1.5', lg: 'h-12 py-2' };

  return (
    <div className="w-full flex flex-col h-full">
      {toolbar && (
        <div className="flex-shrink-0 pb-2">
          {toolbar(table)}
        </div>
      )}
      <div className={cn("rounded-md border flex-1 overflow-auto scrollbar-auto-hide relative", className)}>
        <table ref={tableRef} style={{ tableLayout }} className={cn("w-full caption-bottom bg-gray-50/50", sizeClasses[size] || sizeClasses.md)}>
          <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        data-col-id={header.column.id}
                        style={{
                          width: header.getSize(),
                          // Only set the offset for the side this column is
                          // actually pinned to. Setting both `left` and
                          // `right` unconditionally happened to be harmless
                          // with zero right-pinned columns, but once real
                          // right-pinned columns exist, a left-pinned column
                          // picking up a meaningless `right` value (or vice
                          // versa) is asking for unpredictable sticky
                          // behavior.
                          ...(header.column.getIsPinned() === 'left' ? {
                            left: `${header.column.getStart('left')}px`,
                            position: 'sticky',
                            zIndex: 10,
                          } : {}),
                          ...(header.column.getIsPinned() === 'right' ? {
                            right: `${header.column.getAfter('right')}px`,
                            position: 'sticky',
                            zIndex: 10,
                          } : {}),
                        }}
                        className={cn(
                          // relative: the resize handle is absolutely
                          // positioned and needs ITS OWN header cell as the
                          // containing block. Without this, it escapes up to
                          // the outer scroll wrapper's `relative` and every
                          // column's handle lands in the same wrong place
                          // (the scroll container's right edge) instead of
                          // that column's own right border.
                          "relative",
                          headerClasses[size] || headerClasses.md,
                          // @ts-ignore - Custom meta property
                          header.column.columnDef.meta?.headerClassName,
                          // Opaque background: a pinned cell visually sits on
                          // top of whatever's scrolled underneath it.
                          header.column.getIsPinned() && "!bg-white",
                          // Mark the left edge of the right-pinned zone so
                          // there's a visible boundary between scrolling and
                          // pinned columns (getPinnedIndex === 0 means "first
                          // column in its pinned group", i.e. the leftmost
                          // one of the right-pinned set).
                          header.column.getIsPinned() === 'right' && header.column.getPinnedIndex() === 0 && "border-l"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanResize() && (
                          <ColumnResizeHandle header={header} table={table} tableRef={tableRef} />
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      // A pinned cell needs an always-opaque background (it
                      // sits on top of horizontally-scrolled content), which
                      // makes it immune to the row's own hover:bg-muted/50 /
                      // data-[state=selected]:bg-muted rules — those set a
                      // background on the <tr>, but the opaque pinned <td>
                      // just covers it. Exposing the row's current bg as a
                      // custom property lets pinned cells read and match it
                      // (see the pinned-cell className below) without racing
                      // two conflicting !important background rules.
                      className="hover:[--row-bg:var(--muted)] data-[state=selected]:[--row-bg:var(--muted)]"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          data-col-id={cell.column.id}
                          style={{
                            width: cell.column.getSize(),
                            ...(cell.column.getIsPinned() === 'left' ? {
                              left: `${cell.column.getStart('left')}px`,
                              position: 'sticky',
                              zIndex: 5,
                            } : {}),
                            ...(cell.column.getIsPinned() === 'right' ? {
                              right: `${cell.column.getAfter('right')}px`,
                              position: 'sticky',
                              zIndex: 5,
                            } : {}),
                          }}
                          className={cn(
                            // @ts-ignore - Custom meta property
                            cell.column.columnDef.meta?.cellClassName,
                            cell.column.getIsPinned() && "bg-[var(--row-bg,white)]",
                            cell.column.getIsPinned() === 'right' && cell.column.getPinnedIndex() === 0 && "border-l"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && renderSubComponent && (
                      <TableRow>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="bg-muted/20 p-4"
                        >
                          {renderSubComponent(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </table>
      </div>
      {!hidePagination && (
        <div className="flex items-center justify-end space-x-2 pt-2 pb-0 flex-shrink-0">
          <div className="flex-1 text-sm text-muted-foreground">
            {(() => {
              const currentPage = table.getState().pagination.pageIndex;
              const pageSize = table.getState().pagination.pageSize;
              const totalRows = table.getFilteredRowModel().rows.length;
              const startRow = currentPage * pageSize + 1;
              const endRow = Math.min((currentPage + 1) * pageSize, totalRows);

              return totalRows === 0
                ? "No data found"
                : `${startRow}-${endRow} of ${totalRows} rows shown`;
            })()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
