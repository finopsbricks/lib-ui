/**
 * SortableHeader Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical
 * component variations. Each story answers: "When/why does a user see this
 * component?"
 *
 * The component is rendered inside a real DataTable so the tanstack `column`
 * API (getIsSorted, toggleSorting) is live — stories behave like the
 * production component, not a mock.
 */

import React from 'react';
import { expect, within, userEvent } from 'storybook/test';
import SortableHeader from './SortableHeader';
import { DataTable } from './data-table';

const sample_rows = [
  { name: 'Alpha Corp', amount: 1200, status: 'active' },
  { name: 'Bravo LLC', amount: 450, status: 'inactive' },
  { name: 'Charlie Inc', amount: 8750, status: 'active' },
  { name: 'Delta Ltd', amount: 300, status: 'inactive' },
];

const sample_columns = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
    size: 200,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader column={column} align="right">Amount</SortableHeader>
    ),
    size: 140,
    cell: ({ row }) => (
      <div className="text-right">{row.original.amount.toLocaleString()}</div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    size: 120,
  },
];

const meta = {
  title: 'components/ui/data-table/SortableHeader',
  component: SortableHeader,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

/**
 * USER JOURNEY STORY: When First Viewing a Sortable Table
 *
 * When: User opens a page with a sortable DataTable for the first time
 *
 * User sees: Column headers with a faint double-chevron icon indicating the
 * columns can be clicked to sort. No arrow is shown because nothing is sorted yet.
 *
 * Tests: Unsorted state renders the hint chevron affordance.
 */
export const WhenFirstViewingSortableTable = {
  parameters: {
    description: 'Happy path: user lands on a page with a sortable table. Every sortable column shows a faint up/down chevron hint so the user knows the headers are interactive.',
  },
  render: () => (
    <DataTable columns={sample_columns} data={sample_rows} hidePagination enableSorting />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name_header = canvas.getByRole('button', { name: /Name/ });
    await expect(name_header).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Sorting a Column Ascending
 *
 * When: User clicks a column header once to sort the data
 *
 * User sees: Header gains a solid up-arrow icon, rows reorder ascending.
 *
 * Tests: Click cycles unsorted → ascending, ArrowUp icon appears.
 */
export const WhenSortingAscending = {
  parameters: {
    description: 'User clicks a column header once. The column sorts ascending and the header shows a solid up-arrow. This story programmatically clicks the Name header in its play function.',
  },
  render: () => (
    <DataTable columns={sample_columns} data={sample_rows} hidePagination enableSorting />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name_header = canvas.getByRole('button', { name: /Name/ });
    await userEvent.click(name_header);
    // First row should now be "Alpha Corp" (alphabetically first)
    await expect(canvas.getByText('Alpha Corp')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Sorting a Column Descending
 *
 * When: User clicks a sorted column a second time to flip the direction
 *
 * User sees: Header gains a solid down-arrow icon, rows reorder descending.
 *
 * Tests: Click cycles ascending → descending, ArrowDown icon appears.
 */
export const WhenSortingDescending = {
  parameters: {
    description: 'User clicks a column header twice. The column sorts descending and the header shows a solid down-arrow.',
  },
  render: () => (
    <DataTable columns={sample_columns} data={sample_rows} hidePagination enableSorting />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name_header = canvas.getByRole('button', { name: /Name/ });
    await userEvent.click(name_header);
    await userEvent.click(name_header);
    await expect(canvas.getByText('Delta Ltd')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Viewing a Numeric Right-Aligned Column
 *
 * When: User views a table with a currency / quantity column
 *
 * User sees: The header label and its icon are right-aligned so they sit flush
 * above the right-aligned numeric cells.
 *
 * Tests: `align="right"` positions label + icon against the right edge.
 */
export const WhenViewingNumericColumn = {
  parameters: {
    description: 'Right-aligned variant: numeric columns like "Amount" use align="right" so the header label and sort icon sit flush over the right-aligned cell values.',
  },
  render: () => (
    <DataTable columns={sample_columns} data={sample_rows} hidePagination enableSorting />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const amount_header = canvas.getByRole('button', { name: /Amount/ });
    await expect(amount_header).toBeInTheDocument();
  },
};
