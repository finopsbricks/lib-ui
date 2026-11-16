/**
 * Pagination Stories - User Journey Pattern
 *
 * The one server pager: Previous / Next links through the URL's `page`,
 * keeping every other search param. Reads "Page x of y · N rows" with
 * `total`, "Page x" with `hasMore`, "Page x of y" with the older `pageCount`.
 */

import { expect, within } from 'storybook/test';
import Pagination from './Pagination';

const desktop = { viewport: { value: 'desktop', isRotated: false } };
const phone = { viewport: { value: 'iphone13', isRotated: false } };

const at = (query) => ({
  nextjs: { navigation: { pathname: '/orgs/acme/statements', query } },
});

export default {
  title: 'components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  argTypes: {
    total: { control: { type: 'number', min: 0 }, description: 'Total rows across all pages' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Rows per page' },
    hasMore: { control: 'boolean', description: 'A next page exists (for lists that cannot count)' },
    page: { control: { type: 'number', min: 1 }, description: 'Current page; defaults to the URL' },
    pageCount: { control: { type: 'number', min: 0 }, description: 'Older API: number of pages' },
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 900 }}><Story /></div>],
};

/**
 * USER JOURNEY STORY: Paging Through A Filtered, Sorted List
 *
 * When: The user is on page 3 of a filtered list sorted by file name.
 * User sees: "Page 3 of 6 · 597 rows"; Previous and Next keep the filter and sort.
 */
export const PagingThroughAFilteredSortedList = {
  globals: desktop,
  args: { total: 597, pageSize: 100 },
  parameters: at({ accounts: '12', sort_by: 'file_name', sort_order: 'ASC', page: '3' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Pagination' });
    await expect(nav).toHaveTextContent('Page 3 of 6 · 597 rows');
    await expect(nav.querySelector('[aria-current="page"]')).not.toBeNull();
    await expect(canvas.getByRole('link', { name: /Previous/ })).toHaveAttribute(
      'href', '/orgs/acme/statements?accounts=12&sort_by=file_name&sort_order=ASC&page=2');
    await expect(canvas.getByRole('link', { name: /Next/ })).toHaveAttribute(
      'href', '/orgs/acme/statements?accounts=12&sort_by=file_name&sort_order=ASC&page=4');
  },
};

/**
 * USER JOURNEY STORY: On The First Page
 *
 * When: The list opens (no page in the URL).
 * User sees: Previous is greyed out and isn't a link; Next goes to page 2.
 */
export const OnTheFirstPage = {
  globals: desktop,
  args: { total: 597, pageSize: 100 },
  parameters: at({}),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('link', { name: /Previous/ })).toBeNull();
    await expect(canvas.getByText('Previous').closest('[aria-disabled="true"]')).not.toBeNull();
    await expect(canvas.getByRole('link', { name: /Next/ })).toHaveAttribute('href', '/orgs/acme/statements?page=2');
  },
};

/**
 * USER JOURNEY STORY: Going Back To Page One
 *
 * When: The user is on page 2 and presses Previous.
 * User sees: a clean URL with no page param.
 */
export const GoingBackToPageOne = {
  globals: desktop,
  args: { total: 597, pageSize: 100 },
  parameters: at({ page: '2' }),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: /Previous/ })).toHaveAttribute('href', '/orgs/acme/statements');
  },
};

/**
 * USER JOURNEY STORY: On The Last Page
 */
export const OnTheLastPage = {
  globals: desktop,
  args: { total: 597, pageSize: 100 },
  parameters: at({ page: '6' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Pagination' })).toHaveTextContent('Page 6 of 6');
    await expect(canvas.queryByRole('link', { name: /Next/ })).toBeNull();
  },
};

/**
 * USER JOURNEY STORY: Everything Fits On One Page
 *
 * When: There are fewer rows than a page, or none.
 * User sees: both controls disabled; Next never links to an empty page.
 */
export const EverythingFitsOnOnePage = {
  globals: desktop,
  args: { total: 12, pageSize: 100 },
  parameters: at({}),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Pagination' })).toHaveTextContent('Page 1 of 1 · 12 rows');
    await expect(canvas.queryAllByRole('link')).toHaveLength(0);
  },
};

/**
 * USER JOURNEY STORY: A List That Can't Count
 *
 * When: The query can't count its rows (a running-balance view) and passes hasMore.
 * User sees: "Page 2"; Next is there while hasMore is true.
 */
export const AListThatCantCount = {
  globals: desktop,
  args: { hasMore: true },
  parameters: at({ page: '2' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Pagination' });
    await expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent(/^Page 2$/);
    await expect(canvas.getByRole('link', { name: /Next/ })).toHaveAttribute('href', '/orgs/acme/statements?page=3');
  },
};

/**
 * USER JOURNEY STORY: Older Callers Passing pageCount
 *
 * When: An app still passes { pageCount, currentPage } (activity, staff queue).
 * User sees: "Page 3 of 10", working links. pageCount 0 no longer enables Next.
 */
export const OlderCallersPassingPageCount = {
  globals: desktop,
  args: { pageCount: 10, currentPage: 3 },
  parameters: at({}),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Pagination' })).toHaveTextContent('Page 3 of 10');
    await expect(canvas.getByRole('link', { name: /Next/ })).toHaveAttribute('href', '/orgs/acme/statements?page=4');
  },
};

export const OlderCallersWithNoPages = {
  globals: desktop,
  args: { pageCount: 0 },
  parameters: at({}),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('link', { name: /Next/ })).toBeNull();
  },
};

/**
 * USER JOURNEY STORY: Paging On A Phone
 *
 * When: A 390px phone, with a five-digit row count.
 * User sees: the count and both controls fit; nothing scrolls sideways.
 */
export const PagingOnAPhone = {
  globals: phone,
  args: { total: 12345, pageSize: 100 },
  parameters: at({ page: '42' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const nav = canvas.getByRole('navigation', { name: 'Pagination' });
    await expect(nav).toHaveTextContent('Page 42 of 124 · 12,345 rows');
    await expect(nav.getBoundingClientRect().right).toBeLessThanOrEqual(390);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(390);
  },
};
