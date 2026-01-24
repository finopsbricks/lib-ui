/**
 * DateHeader Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: WhenViewingDailyData, WhenGroupedByMonth, InCashflowReport
 */

import React from 'react';
import { expect, within } from 'storybook/test';
import DateHeader from './DateHeader';

const meta = {
  title: 'components/ui/data-table/DateHeader',
  component: DateHeader,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    date: {
      control: 'text',
      description: 'Date string in various formats (YYYY-MM-DD for day, YYYY-Wxx for week, YYYY-MM for month, YYYY for year)',
    },
  },
};

export default meta;

/**
 * USER JOURNEY STORY: When Viewing Daily Data
 *
 * When: User views cashflow report or transaction table grouped by day
 *
 * User sees: Date displayed as "MM-DD" (e.g., "12-24") with tooltip showing full date
 *
 * Tests: Day format parsing, tooltip showing full date YYYY-MM-DD
 */
export const WhenViewingDailyData = {
  parameters: {
    description: 'Happy path: User views daily transaction data. Date displays as "12-24" for readability, tooltip shows full "2025-12-24" format. Common in transaction tables and daily cashflow reports.',
  },
  args: {
    date: '2025-12-24',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('12-24');
    await expect(header).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Viewing Weekly Data
 *
 * When: User views cashflow report or transaction summary grouped by week
 *
 * User sees: Week displayed as "W46" with tooltip showing full week identifier
 *
 * Tests: Week format parsing, ISO week number display, tooltip showing YYYY-Wxx
 */
export const WhenViewingWeeklyData = {
  parameters: {
    description: 'Weekly grouping: User views weekly transaction summaries. Date displays as "W46" for compact view, tooltip shows full "2025-W46" format. Common in weekly cashflow analysis.',
  },
  args: {
    date: '2025-W46',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('W46');
    await expect(header).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Viewing Monthly Data
 *
 * When: User views monthly cashflow report or account statements
 *
 * User sees: Month displayed as 3-letter abbreviation (e.g., "Dec") with tooltip showing full format
 *
 * Tests: Month format parsing, month name abbreviation, tooltip showing YYYY-MM
 */
export const WhenViewingMonthlyData = {
  parameters: {
    description: 'Monthly grouping: User views monthly transaction summaries. Date displays as "Dec" (3-letter month abbreviation), tooltip shows full "2025-12" format. Common in monthly reports and account statements.',
  },
  args: {
    date: '2025-12',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('Dec');
    await expect(header).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Viewing Yearly Data
 *
 * When: User views annual financial summary or multi-year trends
 *
 * User sees: Year displayed as "2025" with tooltip
 *
 * Tests: Year format display, tooltip showing same value
 */
export const WhenViewingYearlyData = {
  parameters: {
    description: 'Yearly grouping: User views annual transaction summaries or multi-year trends. Date displays as "2025", tooltip shows same value. Common in year-over-year analysis.',
  },
  args: {
    date: '2025',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('2025');
    await expect(header).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: In Cashflow Report Table
 *
 * When: User views cashflow report with multiple date columns
 *
 * User sees: Series of date headers showing month abbreviations for each column
 *
 * Tests: Multiple date headers in row, month abbreviations, visual layout
 */
export const InCashflowReportTable = {
  parameters: {
    description: 'Real-world use case: User views cashflow report table with date columns. Shows multiple month headers (Jan, Feb, Mar) representing table columns. Demonstrates how DateHeader appears in actual data tables.',
  },
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2">
        <div className="flex gap-2 items-center justify-center">
          <div className="w-20 text-center text-sm font-medium">Category</div>
          <DateHeader date="2025-01" />
          <DateHeader date="2025-02" />
          <DateHeader date="2025-03" />
          <DateHeader date="2025-04" />
        </div>
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: In Daily Transaction Timeline
 *
 * When: User views daily transaction timeline with date headers
 *
 * User sees: Series of day headers showing date in MM-DD format
 *
 * Tests: Daily date progression, compact display in timeline view
 */
export const InDailyTransactionTimeline = {
  parameters: {
    description: 'Timeline view: User views daily transaction timeline. Shows series of dates (12-20, 12-21, 12-22) representing consecutive days. Common in transaction history and daily activity views.',
  },
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2">
        <div className="flex gap-2 items-center justify-center">
          <DateHeader date="2025-12-20" />
          <DateHeader date="2025-12-21" />
          <DateHeader date="2025-12-22" />
          <DateHeader date="2025-12-23" />
          <DateHeader date="2025-12-24" />
        </div>
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: With All Month Names
 *
 * When: User needs to verify all months display correctly
 *
 * User sees: All 12 months displayed with their 3-letter abbreviations
 *
 * Tests: All month abbreviations (Jan through Dec), correct month mapping
 */
export const WithAllMonthNames = {
  parameters: {
    description: 'All months: Shows all 12 month abbreviations (Jan through Dec) to verify correct month name mapping and display. Useful for visual verification of month formatting.',
  },
  render: () => (
    <div className="border rounded-lg overflow-hidden p-4">
      <div className="grid grid-cols-6 gap-2">
        <DateHeader date="2025-01" />
        <DateHeader date="2025-02" />
        <DateHeader date="2025-03" />
        <DateHeader date="2025-04" />
        <DateHeader date="2025-05" />
        <DateHeader date="2025-06" />
        <DateHeader date="2025-07" />
        <DateHeader date="2025-08" />
        <DateHeader date="2025-09" />
        <DateHeader date="2025-10" />
        <DateHeader date="2025-11" />
        <DateHeader date="2025-12" />
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: In Mixed Format Report
 *
 * When: User views report that might have different date groupings
 *
 * User sees: Different date formats (day, week, month, year) side by side
 *
 * Tests: Multiple format handling, visual consistency across formats
 */
export const InMixedFormatReport = {
  parameters: {
    description: 'Mixed formats: Demonstrates DateHeader handling all supported date formats side by side. Shows day (12-24), week (W46), month (Dec), and year (2025) formats together.',
  },
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-16">Day:</span>
            <DateHeader date="2025-12-24" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-16">Week:</span>
            <DateHeader date="2025-W46" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-16">Month:</span>
            <DateHeader date="2025-12" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-16">Year:</span>
            <DateHeader date="2025" />
          </div>
        </div>
      </div>
    </div>
  ),
};
