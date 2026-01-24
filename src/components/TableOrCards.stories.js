/**
 * TableOrCards Stories - User Journey Pattern
 */

import { useState } from 'react';
import TableOrCards from './TableOrCards';

export default {
  title: 'components/TableOrCards',
  component: TableOrCards,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    viewAs: {
      control: 'select',
      options: ['table', 'cards'],
      description: 'Currently selected view mode',
    },
    setViewAs: {
      action: 'view changed',
      description: 'Callback when view mode changes',
    },
  },
};

/**
 * USER JOURNEY STORY 1: On Statements List Page
 */
export const OnStatementsListPage = {
  args: {
    viewAs: 'table',
  },
  render: (args) => {
    const [viewAs, setViewAs] = useState(args.viewAs);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bank Statements</h2>
          <TableOrCards
            viewAs={viewAs}
            setViewAs={setViewAs}
          />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600">
            Current view: <span className="font-medium text-gray-900">{viewAs === 'table' ? 'Table View' : 'Card View'}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {viewAs === 'table'
              ? 'Showing statements in compact table format with sortable columns'
              : 'Showing statements as visual cards with key information highlighted'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 2: When Preferring Card View
 */
export const WhenPreferringCardView = {
  args: {
    viewAs: 'cards',
  },
  render: (args) => {
    const [viewAs, setViewAs] = useState(args.viewAs);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <TableOrCards
            viewAs={viewAs}
            setViewAs={setViewAs}
          />
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 font-medium">Card View Active</p>
          <p className="text-xs text-blue-700 mt-1">
            Displaying transactions as visual cards with icons, colors, and key metrics highlighted.
            Better for visual scanning and mobile devices.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 3: In Page Header Context
 */
export const InPageHeaderContext = {
  args: {
    viewAs: 'cards',
  },
  render: (args) => {
    const [viewAs, setViewAs] = useState(args.viewAs);
    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">Bank Statements</h1>
            <p className="text-sm text-gray-600">Upload and manage your financial statements</p>
          </div>
          <div className="flex items-center gap-2">
            <TableOrCards
              viewAs={viewAs}
              setViewAs={setViewAs}
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Upload Statement
            </button>
          </div>
        </div>
        <div className="p-4">
          {viewAs === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                <h3 className="font-medium">HDFC_Jan_2024.pdf</h3>
                <p className="text-xs text-gray-500 mt-1">Uploaded Jan 15, 2024</p>
                <span className="inline-block mt-2 text-xs text-green-600">Complete</span>
              </div>
              <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                <h3 className="font-medium">ICICI_Dec_2023.csv</h3>
                <p className="text-xs text-gray-500 mt-1">Uploaded Dec 28, 2023</p>
                <span className="inline-block mt-2 text-xs text-green-600">Complete</span>
              </div>
              <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                <h3 className="font-medium">SBI_Feb_2024.xlsx</h3>
                <p className="text-xs text-gray-500 mt-1">Uploaded Feb 3, 2024</p>
                <span className="inline-block mt-2 text-xs text-green-600">Complete</span>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg bg-white overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">File Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Upload Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">HDFC_Jan_2024.pdf</td>
                    <td className="px-4 py-3 text-sm">Jan 15, 2024</td>
                    <td className="px-4 py-3 text-sm text-green-600">Complete</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">ICICI_Dec_2023.csv</td>
                    <td className="px-4 py-3 text-sm">Dec 28, 2023</td>
                    <td className="px-4 py-3 text-sm text-green-600">Complete</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">SBI_Feb_2024.xlsx</td>
                    <td className="px-4 py-3 text-sm">Feb 3, 2024</td>
                    <td className="px-4 py-3 text-sm text-green-600">Complete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    viewAs: 'table',
  },
  render: (args) => {
    const [viewAs, setViewAs] = useState(args.viewAs);
    return (
      <div className="space-y-4">
        <TableOrCards
          viewAs={viewAs}
          setViewAs={setViewAs}
        />
        <div className="p-4 bg-gray-50 rounded-lg border max-w-md">
          <p className="text-sm text-gray-600">
            Current viewAs value: <code className="bg-gray-200 px-1 rounded font-mono">{viewAs}</code>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Click toggle to switch views. Check that setViewAs callback fires with "table" or "cards".
          </p>
        </div>
      </div>
    );
  },
};
