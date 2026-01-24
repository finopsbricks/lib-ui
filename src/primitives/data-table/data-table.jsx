// @ts-check
"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
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
 *   enableColumnFilter?: boolean
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
  ...props
}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
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
    'sm': '[&_td]:py-1 [&_th]:py-1 [&_td]:px-3 [&_th]:px-3 [&_td]:text-xs [&_th]:text-xs [&_td]:leading-tight [&_th]:leading-tight [&_th]:h-6',
    'md': '[&_td]:py-2 [&_th]:py-2 [&_td]:px-3 [&_th]:px-3 [&_td]:text-sm [&_th]:text-sm [&_th]:h-9',
    'lg': 'text-base'
  };

  return (
    <div className="w-full flex flex-col h-full">
      {toolbar && (
        <div className="flex-shrink-0 pb-2">
          {toolbar(table)}
        </div>
      )}
      <div className={cn("rounded-md border flex-1 overflow-auto scrollbar-auto-hide relative", className)}>
        <table className={cn("w-full caption-bottom bg-gray-50/50", sizeClasses[size] || sizeClasses.md)}>
          <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id}
                        style={{ 
                          width: header.getSize(),
                          ...(header.column.getIsPinned() ? {
                            left: `${header.column.getStart('left')}px`,
                            right: `${header.column.getAfter('right')}px`,
                            position: 'sticky',
                            zIndex: 10,
                          } : {})
                        }}
                        className={cn(
                          // @ts-ignore - Custom meta property
                          header.column.columnDef.meta?.headerClassName,
                          header.column.getIsPinned() === 'left' && "!bg-white"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={cn(
                              "absolute -right-1 top-0 h-full w-3 cursor-col-resize select-none touch-none opacity-0 hover:opacity-100 z-30",
                              header.column.getIsResizing() && "opacity-100"
                            )}
                            style={{
                              background: header.column.getIsResizing() ? 'var(--primary)' : 'transparent',
                              borderLeft: '1px solid var(--border)',
                              borderRight: '1px solid var(--border)'
                            }}
                          />
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          ...(cell.column.getIsPinned() ? {
                            left: `${cell.column.getStart('left')}px`,
                            right: `${cell.column.getAfter('right')}px`,
                            position: 'sticky',
                            zIndex: 5,
                          } : {})
                        }}
                        className={cn(
                          // @ts-ignore - Custom meta property
                          cell.column.columnDef.meta?.cellClassName,
                          cell.column.getIsPinned() === 'left' && "!bg-white"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
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