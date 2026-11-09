/**
 * AppBreadcrumbs Stories - User Journey Pattern
 */

import { within, expect } from 'storybook/test';
import AppBreadcrumbs from './AppBreadcrumbs';
import { SidebarProvider } from '../primitives/sidebar';

const meta = {
  title: 'components/AppBreadcrumbs',
  component: AppBreadcrumbs,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    breadcrumbs: {
      description: 'Array of breadcrumb objects with text and optional href',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
};

export default meta;

/**
 * USER JOURNEY STORY 1: Navigating Deep In App
 */
export const NavigatingDeepInApp = {
  args: {
    breadcrumbs: [
      { text: 'Home', href: '/' },
      { text: 'Organization', href: '/orgs/1' },
      { text: 'Transactions', href: '/orgs/1/transactions' },
      { text: 'Current Transaction' }
    ]
  }
};

/**
 * USER JOURNEY STORY 2: On Home Page
 */
export const OnHomePage = {
  args: {
    breadcrumbs: []
  }
};

/**
 * USER JOURNEY STORY 3: With Long Path
 */
export const WithLongPath = {
  args: {
    breadcrumbs: [
      { text: 'Home', href: '/' },
      { text: 'Organizations', href: '/orgs' },
      { text: 'Acme Corporation', href: '/orgs/1' },
      { text: 'Accounts', href: '/orgs/1/accounts' },
      { text: 'HDFC Bank Savings Account', href: '/orgs/1/accounts/123' },
      { text: 'Statements', href: '/orgs/1/accounts/123/statements' },
      { text: 'January 2024 Statement' }
    ]
  }
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    breadcrumbs: [
      { text: 'Home', href: '/' },
      { text: 'Organization', href: '/orgs/1' },
      { text: 'Transactions', href: '/orgs/1/transactions' },
      { text: 'Current Transaction' }
    ]
  }
};

const PHONE = { viewport: { value: 'iphone13', isRotated: false } }; // 390 wide

const THREAD_TRAIL = [
  { text: 'Orgs', href: '/orgs' },
  { text: 'Kumar & Rao Associates', href: '/orgs/kumar-rao' },
  { text: 'Mail', href: '/orgs/kumar-rao/mail' },
  { text: 'Northwind Logistics International Pvt Ltd', href: '/orgs/kumar-rao/mail/mb2?status=waiting' },
  { text: 'Re: GSTR-2B mismatch for September' },
];

/**
 * USER JOURNEY STORY 5: On desktop, deep in the app — the whole trail, no separate back link.
 */
export const OnDesktopDeepInApp = {
  args: { breadcrumbs: THREAD_TRAIL },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'Mail' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Northwind Logistics International Pvt Ltd' })).toBeVisible();
    await expect(canvas.getByText('Re: GSTR-2B mismatch for September')).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByTestId('breadcrumb-parent')).not.toBeVisible();
  },
};

/**
 * USER JOURNEY STORY 6: On a phone, deep in the app — one link back to the parent page, kept to one line.
 */
export const OnPhoneDeepInApp = {
  args: { breadcrumbs: THREAD_TRAIL },
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const back = canvas.getByRole('link', { name: 'Back to Northwind Logistics International Pvt Ltd' });
    await expect(back).toBeVisible();
    await expect(back).toHaveAttribute('href', '/orgs/kumar-rao/mail/mb2?status=waiting');
    await expect(back.getBoundingClientRect().height).toBeLessThanOrEqual(40);
    await expect(canvas.getByRole('link', { name: 'Mail', hidden: true })).not.toBeVisible();
    await expect(canvas.getByText('Re: GSTR-2B mismatch for September')).not.toBeVisible();
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
};

/**
 * USER JOURNEY STORY 7: On a phone, on a top-level page — nothing to go back to, so the page's name.
 */
export const OnPhoneTopLevel = {
  args: { breadcrumbs: [{ text: 'Statements' }] },
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Statements')).toBeVisible();
    await expect(canvas.queryByTestId('breadcrumb-parent')).toBeNull();
  },
};

/**
 * USER JOURNEY STORY 8: One pixel below sm (639) — still the phone bar: one link back to the parent.
 */
export const JustBelowSmDeepInApp = {
  args: { breadcrumbs: THREAD_TRAIL },
  globals: { viewport: { value: 'below_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('breadcrumb-parent')).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Mail', hidden: true })).not.toBeVisible();
  },
};

/**
 * USER JOURNEY STORY 9: At sm (640), e.g. half a laptop screen — the whole trail, no back link.
 */
export const AtSmDeepInApp = {
  args: { breadcrumbs: THREAD_TRAIL },
  globals: { viewport: { value: 'at_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'Mail' })).toBeVisible();
    await expect(canvas.getByTestId('breadcrumb-parent')).not.toBeVisible();
  },
};
