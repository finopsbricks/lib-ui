/**
 * PageHeader Stories - User Journey Pattern
 */

import PageHeader from './PageHeader';
import { Button } from '../primitives/button';

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
