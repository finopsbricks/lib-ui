/**
 * DataTable sorting and server mode - User Journey Pattern
 *
 * T1 (client): every column with an accessor sorts, string headers become
 * SortableHeader buttons, initialState.sorting is the default order and
 * shows its arrow, and the click cycle is asc -> desc -> default.
 *
 * T2 (mode="server"): the sort is the URL's sort_by / sort_order, a header
 * click pushes them and drops page, and Pagination renders below.
 */

import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { getRouter } from '@storybook/nextjs/navigation.mock';
import { DataTable } from './data-table';

const accounts = [
  { id: 1, name: 'HDFC Common - 2719', category: 'Bank', balance: 554573, last_txn: '2026-11-09' },
  { id: 2, name: 'ICICI CC 3000 (Amazon Pay credit card, shared with family)', category: 'Credit Card', balance: -4076485, last_txn: '2026-10-31' },
  { id: 3, name: 'SBI 4720', category: 'Bank', balance: 1151200, last_txn: '2025-03-02' },
  { id: 4, name: 'DCB Bank 7257', category: 'Bank', balance: 4683370, last_txn: '2026-11-15' },
];

const money = (v) => (v / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const columns = [
  { accessorKey: 'name', header: 'Name', size: 260, cell: ({ getValue }) => <span className="font-medium">{getValue()}</span> },
  { accessorKey: 'category', header: 'Category', size: 120 },
  {
    accessorKey: 'balance',
    header: 'Balance',
    size: 140,
    cell: ({ getValue }) => money(getValue()),
    meta: { isNumeric: true, headerClassName: 'text-right', cellClassName: 'text-right tabular-nums' },
  },
  { accessorKey: 'last_txn', header: 'Last transaction', size: 140 },
  { id: 'actions', header: '', size: 50, cell: () => <button type="button" aria-label="Actions">⋯</button>, enableSorting: false },
];

const firstColumnText = (canvasElement) =>
  [...canvasElement.querySelectorAll('tbody tr')].map((tr) => tr.querySelector('td').textContent);

const th = (canvasElement, id) => canvasElement.querySelector(`th[data-col-id="${id}"]`);

const desktop = { viewport: { value: 'desktop', isRotated: false } };
const phone = { viewport: { value: 'iphone13', isRotated: false } };

const meta = {
  title: 'primitives/data-table/Sorting and server mode',
  component: DataTable,
  parameters: { layout: 'padded' },
};

export default meta;

/**
 * USER JOURNEY STORY: Opening A List Sorted By Default
 *
 * When: A page opens a table whose default order is "highest balance first".
 * User sees: The Balance header shows a down arrow; every other sortable
 *            header shows the faint chevrons. Screen readers hear the sort.
 */
export const OpeningAListSortedByDefault = {
  globals: desktop,
  args: {
    columns,
    data: accounts,
    hidePagination: true,
    initialState: { sorting: [{ id: 'balance', desc: true }] },
  },
  play: async ({ canvasElement, step }) => {
    await step('Rows open in the default order', async () => {
      await expect(firstColumnText(canvasElement)[0]).toBe('DCB Bank 7257');
    });
    await step('The default column carries the arrow and aria-sort', async () => {
      await expect(th(canvasElement, 'balance')).toHaveAttribute('aria-sort', 'descending');
      await expect(th(canvasElement, 'name')).toHaveAttribute('aria-sort', 'none');
    });
    await step('A column that opts out has no button and no aria-sort', async () => {
      await expect(th(canvasElement, 'actions')).not.toHaveAttribute('aria-sort');
      await expect(th(canvasElement, 'actions').querySelector('button')).toBeNull();
    });
  },
};

/**
 * USER JOURNEY STORY: Sorting By A Column And Back
 *
 * When: The user clicks a plain-text header three times.
 * User sees: asc, then desc, then the table's default order again.
 */
export const SortingByAColumnAndBack = {
  globals: desktop,
  args: OpeningAListSortedByDefault.args,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole('button', { name: /^Name/ });

    await step('First click sorts ascending', async () => {
      await userEvent.click(name);
      await expect(th(canvasElement, 'name')).toHaveAttribute('aria-sort', 'ascending');
      await expect(firstColumnText(canvasElement)[0]).toBe('DCB Bank 7257');
      await expect(th(canvasElement, 'balance')).toHaveAttribute('aria-sort', 'none');
    });
    await step('Second click sorts descending', async () => {
      await userEvent.click(name);
      await expect(th(canvasElement, 'name')).toHaveAttribute('aria-sort', 'descending');
      await expect(firstColumnText(canvasElement)[0]).toBe('SBI 4720');
    });
    await step('Third click returns to the default order', async () => {
      await userEvent.click(name);
      await expect(th(canvasElement, 'name')).toHaveAttribute('aria-sort', 'none');
      await expect(th(canvasElement, 'balance')).toHaveAttribute('aria-sort', 'descending');
      await expect(firstColumnText(canvasElement)[0]).toBe('DCB Bank 7257');
    });
    await step('Clicking the default column flips it instead of sticking', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /^Balance/ }));
      await expect(th(canvasElement, 'balance')).toHaveAttribute('aria-sort', 'ascending');
      await expect(firstColumnText(canvasElement)[0]).toMatch(/^ICICI CC 3000/);
    });
  },
};

/**
 * USER JOURNEY STORY: Sorting A Table With No Default Order
 *
 * When: A table has no initialState.sorting; the rows arrive in the server's order.
 * User sees: the third click puts the rows back in that original order.
 */
export const SortingATableWithNoDefaultOrder = {
  globals: desktop,
  args: { columns, data: accounts, hidePagination: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const category = canvas.getByRole('button', { name: /^Category/ });
    await userEvent.click(category);
    await userEvent.click(category);
    await expect(firstColumnText(canvasElement)[0]).toMatch(/^ICICI CC 3000/);
    await userEvent.click(category);
    await expect(firstColumnText(canvasElement)[0]).toBe('HDFC Common - 2719');
    await expect(th(canvasElement, 'category')).toHaveAttribute('aria-sort', 'none');
  },
};

/**
 * USER JOURNEY STORY: Numeric Header Sits Over Its Numbers
 *
 * When: A right-aligned amount column has a plain string header.
 * User sees: the generated sort button is right-aligned too.
 */
export const NumericHeaderSitsOverItsNumbers = {
  globals: desktop,
  args: { columns, data: accounts, hidePagination: true },
  play: async ({ canvasElement }) => {
    const button = th(canvasElement, 'balance').querySelector('button');
    await expect(button.className).toContain('justify-end');
  },
};

const statement_columns = [
  { accessorKey: 'file_name', header: 'File name', size: 260 },
  { accessorKey: 'period_start', header: 'Period', size: 140 },
  // Not in the server's whitelist, so it opts out.
  { accessorKey: 'account', header: 'Account', size: 160, enableSorting: false },
];

const statements = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  file_name: `AccountStatement_1011202${i}_092123.xlsx`,
  period_start: `2026-0${i + 1}-01`,
  account: i % 2 ? 'SBI 4720' : 'HDFC Common - 2719',
}));

const server_args = {
  columns: statement_columns,
  data: statements,
  mode: 'server',
  total: 597,
  pageSize: 100,
  initialState: { sorting: [{ id: 'period_start', desc: true }] },
};

/**
 * USER JOURNEY STORY: Sorting A Server-Paged List
 *
 * When: The list is one page of many from the server (T2), on page 3 with a filter on.
 * User sees: clicking a header changes the URL (the filter stays, the page resets);
 *            the pager below reads "Page 3 of 6 · 597 rows".
 */
export const SortingAServerPagedList = {
  globals: desktop,
  args: server_args,
  parameters: {
    nextjs: { navigation: { pathname: '/orgs/acme/statements', query: { accounts: '12', page: '3' } } },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The default sort shows with no sort params in the URL', async () => {
      await expect(th(canvasElement, 'period_start')).toHaveAttribute('aria-sort', 'descending');
    });
    await step('A header click pushes sort_by/sort_order and drops page', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /^File name/ }));
      await expect(getRouter().push).toHaveBeenLastCalledWith(
        '/orgs/acme/statements?accounts=12&sort_by=file_name&sort_order=ASC',
        { scroll: false },
      );
    });
    await step('Rows are not re-sorted in the browser', async () => {
      await expect(firstColumnText(canvasElement)[0]).toBe('AccountStatement_10112020_092123.xlsx');
    });
    await step('A column outside the whitelist has no sort button', async () => {
      await expect(th(canvasElement, 'account').querySelector('button')).toBeNull();
    });
    await step('The server pager replaces the client footer', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Pagination' });
      await expect(nav).toHaveTextContent('Page 3 of 6 · 597 rows');
      await expect(canvas.queryByText(/rows shown/)).toBeNull();
    });
  },
};

/**
 * USER JOURNEY STORY: Opening A Shared Sorted Link
 *
 * When: The URL already has sort_by=file_name&sort_order=DESC.
 * User sees: File name shows the down arrow; the next click resets to the default.
 */
export const OpeningASharedSortedLink = {
  globals: desktop,
  args: server_args,
  parameters: {
    nextjs: { navigation: { pathname: '/orgs/acme/statements', query: { sort_by: 'file_name', sort_order: 'DESC' } } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(th(canvasElement, 'file_name')).toHaveAttribute('aria-sort', 'descending');
    await expect(th(canvasElement, 'period_start')).toHaveAttribute('aria-sort', 'none');
    await userEvent.click(canvas.getByRole('button', { name: /^File name/ }));
    await expect(getRouter().push).toHaveBeenLastCalledWith('/orgs/acme/statements', { scroll: false });
  },
};

/**
 * USER JOURNEY STORY: Opening An Old Link With A Direction In sort_by
 *
 * When: A bookmark from before header sorting has ?sort_by=DESC.
 * User sees: the default order, no error.
 */
export const OpeningAnOldLinkWithADirectionInSortBy = {
  globals: desktop,
  args: server_args,
  parameters: {
    nextjs: { navigation: { pathname: '/orgs/acme/statements', query: { sort_by: 'DESC' } } },
  },
  play: async ({ canvasElement }) => {
    await expect(th(canvasElement, 'period_start')).toHaveAttribute('aria-sort', 'descending');
  },
};

/**
 * USER JOURNEY STORY: Server-Paged List On A Phone
 *
 * When: The same T2 list on a 390px phone.
 * User sees: the pager fits the width (no sideways page scroll); the table scrolls inside its box.
 */
export const ServerPagedListOnAPhone = {
  globals: phone,
  args: server_args,
  parameters: {
    nextjs: { navigation: { pathname: '/orgs/acme/statements', query: { page: '2' } } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const nav = canvas.getByRole('navigation', { name: 'Pagination' });
    await expect(nav.getBoundingClientRect().right).toBeLessThanOrEqual(390);
    await expect(canvas.getByRole('link', { name: /Previous/ })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /Next/ })).toBeVisible();
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(390);
  },
};
