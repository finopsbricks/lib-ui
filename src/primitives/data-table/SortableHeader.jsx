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
 * @param {Object} props
 * @param {any} props.column - tanstack/react-table column instance
 * @param {React.ReactNode} props.children - Header label to render inside the button
 * @param {'left' | 'right'} [props.align='left'] - Text alignment; use 'right' for numeric columns
 * @returns {React.JSX.Element}
 */
export default function SortableHeader({ column, children, align = "left" }) {
  const sorted = column.getIsSorted();
  const alignment = align === "right" ? "justify-end w-full" : "";

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(
        "inline-flex items-center gap-1 h-8 cursor-pointer hover:text-foreground",
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
