/**
 * PageHeader Stories - User Journey Pattern
 */

import PageHeader from './PageHeader';
import { Button } from '../primitives/button';
import { within, expect } from 'storybook/test';

const PHONE = { viewport: { value: 'iphone13', isRotated: false } };

/** Title and actions sit on one row when their boxes overlap vertically. */
const shareRow = (a, b) => {
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  return ra.top < rb.bottom && rb.top < ra.bottom;
};

const meta = {
  title: 'components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

/**
 * USER JOURNEY STORY 1: When Viewing List Page
 */
export const WhenViewingListPage = {
  args: {
    header: 'Bank Statements',
  },
};

/**
 * USER JOURNEY STORY 2: When Actions Available
 */
export const WhenActionsAvailable = {
  args: {
    header: 'User Settings',
    RightButtons: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="default" size="sm">Save Changes</Button>
      </div>
    ),
  },
};

/**
 * USER JOURNEY STORY 3: With Detailed Title
 */
export const WithDetailedTitle = {
  args: {
    header: {
      main: 'HDFC Bank Statement',
      secondary: 'January 2024 - Processed',
    },
  },
};

/**
 * USER JOURNEY STORY 4: With Multiple Actions
 */
export const WithMultipleActions = {
  args: {
    header: 'Transaction Review',
    RightButtons: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Export CSV</Button>
        <Button variant="secondary" size="sm">Duplicate</Button>
        <Button variant="default" size="sm">Submit Transaction</Button>
      </div>
    ),
  },
};

/**
 * USER JOURNEY STORY 5: On Section Subheader
 */
export const OnSectionSubheader = {
  args: {
    header: 'Recent Transactions',
    level: 'h3',
    RightButtons: () => <Button size="sm" variant="outline">View All</Button>,
  },
};

/**
 * USER JOURNEY STORY 6: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    header: 'Page Title',
    level: 'h1',
    RightButtons: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Action 1</Button>
        <Button variant="default" size="sm">Action 2</Button>
      </div>
    ),
  },
};

/**
 * USER JOURNEY STORY 7: On Phone With One Action
 * ui/page-header-mobile.md: title and actions share one row at 390.
 */
export const OnPhoneWithOneAction = {
  args: {
    header: 'Transactions',
    RightButtons: () => <Button variant="outline" size="sm">Export CSV</Button>,
  },
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const title = canvas.getByRole('heading', { name: 'Transactions' });
    const button = canvas.getByRole('button', { name: 'Export CSV' });
    await expect(shareRow(title, button)).toBe(true);
  },
};

/**
 * USER JOURNEY STORY 8: On Phone With Two Actions
 */
export const OnPhoneWithTwoActions = {
  args: WhenActionsAvailable.args,
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const title = canvas.getByRole('heading', { name: 'User Settings' });
    await expect(shareRow(title, canvas.getByRole('button', { name: 'Cancel' }))).toBe(true);
    await expect(shareRow(title, canvas.getByRole('button', { name: 'Save Changes' }))).toBe(true);
  },
};

/**
 * USER JOURNEY STORY 9: On Phone With Long Title
 * The title truncates; the action stays on the row and on screen.
 */
export const OnPhoneWithLongTitle = {
  args: {
    header: 'HDFC Bank Current Account Statement Reconciliation',
    RightButtons: () => <Button variant="outline" size="sm">Export CSV</Button>,
  },
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const title = canvas.getByRole('heading');
    const button = canvas.getByRole('button', { name: 'Export CSV' });
    await expect(shareRow(title, button)).toBe(true);
    await expect(button.getBoundingClientRect().right).toBeLessThanOrEqual(window.innerWidth);
    await expect(title.scrollWidth).toBeGreaterThan(title.clientWidth);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
};

/**
 * USER JOURNEY STORY 10: On Phone With Many Actions
 * Actions too wide to sit beside the title wrap onto their own row.
 */
export const OnPhoneWithManyActions = {
  args: WithMultipleActions.args,
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(window.innerWidth).toBe(390);
    const title = canvas.getByRole('heading', { name: 'Transaction Review' });
    const button = canvas.getByRole('button', { name: 'Export CSV' });
    await expect(button.getBoundingClientRect().top).toBeGreaterThanOrEqual(title.getBoundingClientRect().bottom);
  },
};

/**
 * USER JOURNEY STORY 11: On Desktop With Many Actions
 */
export const OnDesktopWithManyActions = {
  args: WithMultipleActions.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('heading', { name: 'Transaction Review' });
    for (const name of ['Export CSV', 'Duplicate', 'Submit Transaction']) {
      await expect(shareRow(title, canvas.getByRole('button', { name }))).toBe(true);
    }
  },
};
