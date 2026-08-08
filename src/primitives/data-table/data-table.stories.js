/**
 * DataTable Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 */

import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { DataTable } from './data-table';

// Mirrors the real column count/shape of TransactionsTable (10 columns),
// the first consumer of tableLayout="fixed" + the resize/pin affordances
// below.
const columns = [
  { accessorKey: 'date', header: 'Date', size: 90, minSize: 70 },
  { accessorKey: 'account', header: 'Account', size: 110, minSize: 80 },
  {
    accessorKey: 'particulars',
    header: 'Particulars',
    size: 180,
    minSize: 80,
    maxSize: 700,
    cell: ({ getValue }) => (
      <div className="truncate">{getValue()}</div>
    ),
  },
  { accessorKey: 'statement', header: 'Statement', size: 90, minSize: 70 },
  { accessorKey: 'inflow', header: 'Inflow (+)', size: 80, minSize: 60 },
  { accessorKey: 'outflow', header: 'Outflow (-)', size: 80, minSize: 60 },
  { accessorKey: 'type', header: 'Type', size: 80, minSize: 60 },
  { accessorKey: 'category', header: 'Category', size: 90, minSize: 60 },
  { accessorKey: 'entity', header: 'Entity', size: 90, minSize: 60 },
  { accessorKey: 'comments', header: 'Comments', size: 110, minSize: 60 },
];

const rows = [
  { id: 1, date: '2021-03-15', account: 'ICICI 131', particulars: 'NEFT-000165359946-WISHUPTECH-FEBA 1615776780547-2309109900110017-RATN0000999', statement: 'Mar 2021', inflow: '', outflow: '₹18,500', type: 'expense', category: 'Contractor', entity: 'Wishuptech', comments: 'Retainer' },
  { id: 2, date: '2021-01-06', account: 'ICICI 131', particulars: 'NEFT-N0062113645600 49-FRAMEWORX TECHNOLOGIES PRIVATE LIMI-ALEX OCT', statement: 'Jan 2021', inflow: '₹42,000', outflow: '', type: 'income', category: 'Consulting', entity: 'Frameworx', comments: 'Oct invoice' },
  { id: 3, date: '2020-09-22', account: 'ICICI 131', particulars: 'Mob alt Chg Aug-20+GST', statement: 'Sep 2020', inflow: '', outflow: '₹118', type: 'expense', category: 'Bank fee', entity: 'ICICI', comments: '' },
];

const meta = {
  title: 'primitives/data-table/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

/**
 * USER JOURNEY STORY: After Importing Long Values
 *
 * When: A column (e.g. a bank transaction reference) contains values much
 *       wider than its column, and the user hasn't resized anything yet.
 *
 * User sees: Truncated Particulars text with a resize handle at the column
 *            border. The handle is persistently visible (not just on hover)
 *            so it's discoverable without hunting for a hidden hit zone.
 *
 * Tests: default column width truncates long content; the resize handle
 *        renders and is accessible via role="separator". Requires
 *        tableLayout="fixed" — under the default "auto" layout, a
 *        white-space:nowrap cell can never render narrower than its full
 *        content width no matter what size is declared, so nothing here
 *        would actually truncate.
 */
export const AfterImportingLongValues = {
  parameters: {
    description: 'Default state: long Particulars values are truncated at the column\'s starting width. The resize handle between columns is always faintly visible, not just on hover.',
  },
  args: {
    columns,
    data: rows,
    tableLayout: 'fixed',
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    hidePagination: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Resize handle for Particulars is present and accessible', async () => {
      const handle = canvas.getByRole('separator', { name: 'Resize particulars column' });
      await expect(handle).toBeInTheDocument();
    });

    await step('Long Particulars value is truncated at the default width', async () => {
      // The .truncate div inside the cell is what actually clips (via its
      // own overflow:hidden) — the outer <td> under tableLayout="fixed" is
      // clamped to its declared width either way and doesn't itself report
      // the un-clipped content size once a child absorbs the overflow.
      const inner = canvasElement.querySelector('[data-col-id="particulars"]:not(th) .truncate');
      await expect(inner.scrollWidth).toBeGreaterThan(inner.clientWidth);
    });
  },
};

/**
 * USER JOURNEY STORY: Double-Click To Auto-Fit
 *
 * When: User double-clicks the resize handle on a truncated column instead
 *       of dragging it wider by hand.
 *
 * User sees: The column snaps to fit its widest visible value in one move.
 *
 * Tests: double-click auto-fit resizes the column so content is no longer
 *        clipped. The measurement is probe-based (renders the cell's text
 *        into an offscreen element to measure it), not cell.scrollWidth —
 *        under tableLayout="fixed" the cell's own box is clamped to its
 *        declared size, so scrollWidth on the cell itself never reflects
 *        the content's real un-clamped width.
 */
export const DoubleClickToAutoFit = {
  parameters: {
    description: 'Double-clicking (or pressing Enter/Space on) the resize handle snaps the column to fit its widest visible value instead of requiring manual drag.',
  },
  args: {
    columns,
    data: rows,
    tableLayout: 'fixed',
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    hidePagination: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const getInner = () => canvasElement.querySelector('[data-col-id="particulars"]:not(th) .truncate');

    await step('Particulars starts truncated', async () => {
      const inner = getInner();
      await expect(inner.scrollWidth).toBeGreaterThan(inner.clientWidth);
    });

    await step('Double-click the resize handle auto-fits the column', async () => {
      const handle = canvas.getByRole('separator', { name: 'Resize particulars column' });
      await userEvent.dblClick(handle);
      await expect(getInner().scrollWidth).toBeLessThanOrEqual(getInner().clientWidth);
    });
  },
};

/**
 * USER JOURNEY STORY: Keyboard Resize
 *
 * When: A keyboard-only or screen-reader user tabs to a column border.
 *
 * User sees: The handle is focusable, arrow keys nudge the column width,
 *            and Enter auto-fits it — full keyboard parity with dragging
 *            or double-clicking.
 *
 * Tests: Tab reaches the handle; ArrowRight grows the column; Enter
 *        auto-fits it.
 */
export const KeyboardResize = {
  parameters: {
    description: 'Keyboard users can reach the resize handle via Tab, widen a column with arrow keys, and auto-fit it with Enter — the same capability mouse users get from drag/double-click.',
  },
  args: {
    columns,
    data: rows,
    tableLayout: 'fixed',
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    hidePagination: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('separator', { name: 'Resize particulars column' });
    const header = canvasElement.querySelector('th[data-col-id="particulars"]');

    await step('Arrow key widens the column', async () => {
      handle.focus();
      const before = header.getBoundingClientRect().width;
      await userEvent.keyboard('{ArrowRight}');
      await expect(header.getBoundingClientRect().width).toBeGreaterThan(before);
    });

    await step('Enter auto-fits the column', async () => {
      const getInner = () => canvasElement.querySelector('[data-col-id="particulars"]:not(th) .truncate');
      await userEvent.keyboard('{Enter}');
      await expect(getInner().scrollWidth).toBeLessThanOrEqual(getInner().clientWidth);
    });
  },
};

/**
 * USER JOURNEY STORY: Frozen Columns Stay Highlighted On Hover
 *
 * When: A table has columns pinned to either side (e.g. a checkbox column
 *       frozen left, summary columns frozen right) and the user hovers a
 *       row or selects it.
 *
 * User sees: The frozen columns highlight along with the rest of the row —
 *            they don't look "stuck" or unresponsive just because they
 *            need an opaque background to hide horizontally-scrolled
 *            content underneath.
 *
 * Tests: a right-pinned cell's background changes on hover, and reverts
 *        when the mouse leaves; the boundary between scrollable and
 *        frozen-right columns is marked with a left border.
 */
export const FrozenColumnsStayHighlightedOnHover = {
  parameters: {
    description: 'Pinned (frozen) columns pick up the same hover/selection highlight as the rest of the row instead of staying opaque white — the opaque background needed to hide scrolled-under content used to also block the highlight.',
  },
  args: {
    columns,
    data: rows,
    tableLayout: 'fixed',
    hidePagination: true,
    initialState: {
      columnPinning: { left: ['date'], right: ['category', 'entity', 'comments'] },
    },
  },
  play: async ({ canvasElement, step }) => {
    const getPinnedCell = () => canvasElement.querySelector('tbody [data-col-id="category"]');

    await step('Pinned-right column renders sticky with a boundary border', async () => {
      const cell = getPinnedCell();
      await expect(getComputedStyle(cell).position).toBe('sticky');
      await expect(getComputedStyle(cell).borderLeftWidth).not.toBe('0px');
    });

    await step('Hovering the row highlights the pinned cell too', async () => {
      const cell = getPinnedCell();
      const restBg = getComputedStyle(cell).backgroundColor;
      await userEvent.hover(cell);
      const hoverBg = getComputedStyle(cell).backgroundColor;
      await expect(hoverBg).not.toBe(restBg);
      await userEvent.unhover(cell);
      await expect(getComputedStyle(cell).backgroundColor).toBe(restBg);
    });
  },
};
