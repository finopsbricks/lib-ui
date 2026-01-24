/**
 * AppBreadcrumbs Stories - User Journey Pattern
 */

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
