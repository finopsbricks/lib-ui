// @ts-check
"use client";

import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Sortable column header for tanstack/react-table powered DataTable.
 *
 * Wraps the header label in a button so users get click + keyboard
 * affordance, and renders an icon reflecting the column's current sort
 * state (asc / desc / none). Unsorted columns show a faint chevrons icon
 * as a hint that the column is clickable.
 *
 * Clicking cycles asc -> desc -> back to the table's default order. Clearing
 * the sort hands the table an empty sort; `DataTable` turns that into its
 * default (`initialState.sorting`), or the rows' own order when it has none.
 *
 * `DataTable` renders this for every sortable column whose `header` is a
 * string, so you only need it for a header that isn't plain text.
 *
 * @param {Object} props
 * @param {any} props.column - tanstack/react-table column instance
 * @param {React.ReactNode} props.children - Header label to render inside the button
 * @param {'left' | 'right'} [props.align='left'] - Text alignment; use 'right' for numeric columns
 * @returns {React.JSX.Element}
 */
export default function SortableHeader({ column, children, align = "left" }) {
  const sorted = column.getIsSorted();
  const alignment = align === "right" ? "justify-end w-full" : "";

  const handleClick = () => {
    if (!sorted) column.toggleSorting(false);
    else if (sorted === "asc") column.toggleSorting(true);
    else column.clearSorting();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1 h-6 cursor-pointer hover:text-foreground",
        alignment,
      )}
    >
      {children}
      <span className="h-4 w-4 inline-flex text-muted-foreground">
        {sorted === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : sorted === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </span>
    </button>
  );
}
