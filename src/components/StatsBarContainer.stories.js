/**
 * StatsBarContainer Stories - User Journey Pattern
 */

import StatsBarContainer from './StatsBarContainer';

export default {
  title: 'components/StatsBarContainer',
  component: StatsBarContainer,
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
};

const mockFinancialStats = [
  { type: 'metric', label: 'Total Balance', value: 245000, color: 'success' },
  { type: 'divider' },
  { type: 'metric', label: 'Monthly Inflow', value: 850000, color: 'success' },
  { type: 'metric', label: 'Monthly Outflow', value: -125000, color: 'warning' },
  { type: 'divider' },
  { type: 'metric', label: 'Net Income', value: 725000, color: 'success' },
];

/**
 * USER JOURNEY STORY 1: On Dashboard Page
 */
export const OnDashboardPage = {
  args: {
    items: mockFinancialStats,
  },
};

/**
 * USER JOURNEY STORY 2: When No Data Available
 */
export const WhenNoDataAvailable = {
  args: {
    items: [],
  },
};

/**
 * USER JOURNEY STORY 3: Showing Transaction Summary
 */
export const ShowingTransactionSummary = {
  args: {
    items: [
      { type: 'metric', label: 'Profit', value: 125000, color: 'success' },
      { type: 'metric', label: 'Loss', value: -25000, color: 'danger' },
      { type: 'divider' },
      { type: 'metric', label: 'Pending', value: 15000, color: 'warning' },
      { type: 'metric', label: 'Processed', value: 85000, color: 'neutral' },
    ],
  },
};

/**
 * USER JOURNEY STORY 4: With Action Buttons
 */
export const WithActionButtons = {
  args: {
    items: [
      { type: 'metric', label: 'Balance', value: 125000, color: 'success' },
      { type: 'divider' },
      { type: 'metric', label: 'Transactions', value: 45 },
    ],
    children: (
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          Export
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
          Refresh
        </button>
      </div>
    ),
  },
};

/**
 * USER JOURNEY STORY 5: On Account Overview
 */
export const OnAccountOverview = {
  args: {
    items: [
      { type: 'metric', label: 'HDFC Savings', value: 125000, color: 'success' },
      { type: 'metric', label: 'ICICI Current', value: 85000, color: 'success' },
      { type: 'metric', label: 'SBI Salary', value: 45000, color: 'success' },
      { type: 'metric', label: 'Axis Savings', value: 25000, color: 'success' },
      { type: 'divider' },
      { type: 'metric', label: 'Kotak Current', value: 15000, color: 'success' },
      { type: 'metric', label: 'IDFC First', value: 95000, color: 'success' },
      { type: 'metric', label: 'Yes Bank', value: 65000, color: 'success' },
      { type: 'metric', label: 'IndusInd', value: 35000, color: 'success' },
      { type: 'divider' },
      { type: 'metric', label: 'Total Balance', value: 490000, color: 'success' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-80 mx-auto bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * USER JOURNEY STORY 6: On Long-Running Account Detail
 */
export const OnLongRunningAccountDetail = {
  args: {
    items: [
      { type: 'metric', label: 'First Trans Date', value: <>2019-11-30</>, color: 'neutral' },
      { type: 'metric', label: 'Last Trans Date', value: <>2025-10-30</>, color: 'neutral' },
      { type: 'divider' },
      { type: 'metric', label: 'Active for', value: <>2161 days</>, color: 'success' },
      { type: 'metric', label: 'Last Txn was', value: <>42 days ago</>, color: 'warning' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-96 mx-auto bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * USER JOURNEY STORY 7: On Liability Report With Long Labels
 */
export const OnLiabilityReportWithLongLabels = {
  args: {
    items: [
      { type: 'metric', label: 'Total Liability', value: 1250000, color: 'warning' },
      { type: 'metric', label: 'Change in Liability', value: -85000, color: 'success' },
      { type: 'divider' },
      { type: 'metric', label: 'Txns that matches', value: 47, color: 'neutral' },
      { type: 'metric', label: 'Categories', value: 5, color: 'neutral' },
    ],
  },
};

/**
 * USER JOURNEY STORY 8: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    items: mockFinancialStats,
  },
};
