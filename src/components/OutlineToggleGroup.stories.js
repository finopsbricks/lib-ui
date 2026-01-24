/**
 * OutlineToggleGroup Stories - User Journey Pattern
 */

import { useState } from 'react';
import OutlineToggleGroup from './OutlineToggleGroup';

export default {
  title: 'components/OutlineToggleGroup',
  component: OutlineToggleGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['table', 'cards', 'list'],
      description: 'Currently selected value',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when selection changes',
    },
    options: {
      control: 'object',
      description: 'Array of options with value and label properties',
    },
  },
};

/**
 * USER JOURNEY STORY 1: When Switching View Modes
 */
export const WhenSwitchingViewModes = {
  args: {
    value: 'table',
    options: [
      { value: 'table', label: 'Table' },
      { value: 'cards', label: 'Cards' }
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="space-y-4">
        <OutlineToggleGroup
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <div className="p-4 bg-gray-50 rounded-lg border max-w-md">
          <p className="text-sm text-gray-600">
            Current view: <span className="font-medium text-gray-900">{value === 'table' ? 'Table View' : 'Card View'}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {value === 'table'
              ? 'Showing data in compact table format with sortable columns'
              : 'Showing data as visual cards with key information highlighted'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 2: On Statements Page
 */
export const OnStatementsPage = {
  args: {
    value: 'cards',
    options: [
      { value: 'table', label: 'Table' },
      { value: 'cards', label: 'Cards' }
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <h2 className="text-xl font-semibold">Bank Statements</h2>
          <OutlineToggleGroup
            {...args}
            value={value}
            onValueChange={setValue}
          />
        </div>
        <div className="text-sm text-gray-600">
          {value === 'table' ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">File Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">HDFC_Jan_2024.pdf</td>
                    <td className="px-4 py-3">Jan 15, 2024</td>
                    <td className="px-4 py-3"><span className="text-green-600">Complete</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">ICICI_Dec_2023.csv</td>
                    <td className="px-4 py-3">Dec 28, 2023</td>
                    <td className="px-4 py-3"><span className="text-green-600">Complete</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">HDFC_Jan_2024.pdf</h3>
                <p className="text-xs text-gray-500 mt-1">Jan 15, 2024</p>
                <span className="inline-block mt-2 text-xs text-green-600">Complete</span>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">ICICI_Dec_2023.csv</h3>
                <p className="text-xs text-gray-500 mt-1">Dec 28, 2023</p>
                <span className="inline-block mt-2 text-xs text-green-600">Complete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 3: With Multiple Display Options
 */
export const WithMultipleDisplayOptions = {
  args: {
    value: 'grid',
    options: [
      { value: 'list', label: 'List' },
      { value: 'grid', label: 'Grid' },
      { value: 'kanban', label: 'Kanban' },
      { value: 'timeline', label: 'Timeline' }
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="space-y-4">
        <OutlineToggleGroup
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <div className="p-4 bg-gray-50 rounded-lg border max-w-md">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {value === 'list' && 'List View'}
            {value === 'grid' && 'Grid View'}
            {value === 'kanban' && 'Kanban Board'}
            {value === 'timeline' && 'Timeline View'}
          </p>
          <p className="text-xs text-gray-600">
            {value === 'list' && 'Vertical list with detailed information per row'}
            {value === 'grid' && 'Grid of cards showing key data points'}
            {value === 'kanban' && 'Drag-and-drop board organized by status columns'}
            {value === 'timeline' && 'Chronological timeline showing events over time'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 4: For Report Time Grouping
 */
export const ForReportTimeGrouping = {
  args: {
    value: 'monthly',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' }
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Cashflow Report</h3>
          <OutlineToggleGroup
            {...args}
            value={value}
            onValueChange={setValue}
          />
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-gray-600 mb-3">
            Viewing data grouped by: <span className="font-medium text-gray-900">{value}</span>
          </p>
          <div className="h-32 bg-gray-50 rounded flex items-center justify-center text-gray-500 text-sm">
            [Chart showing {value} cashflow data]
          </div>
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 5: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    value: 'table',
    options: [
      { value: 'table', label: 'Table' },
      { value: 'cards', label: 'Cards' }
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="space-y-4">
        <OutlineToggleGroup
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <div className="p-4 bg-gray-50 rounded-lg border max-w-md">
          <p className="text-sm text-gray-600">
            Selected value: <code className="bg-gray-200 px-1 rounded">{value}</code>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Try clicking different options to see state changes
          </p>
        </div>
      </div>
    );
  },
};
