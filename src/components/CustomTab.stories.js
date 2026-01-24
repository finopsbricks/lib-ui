/**
 * CustomTab Stories - User Journey Pattern
 */

import CustomTab from './CustomTab';
import { expect, within, userEvent } from 'storybook/test';

export default {
  title: 'components/CustomTab',
  component: CustomTab,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'padded',
  },
  argTypes: {
    tabs: {
      control: 'array',
      description: 'Array of tab objects with slug, name, optional stats, and body content',
    },
    variant: {
      control: 'text',
      description: 'Visual variant style (currently "plain")',
    },
    tabName: {
      control: 'text',
      description: 'Query parameter name used for navigation and active tab detection',
    },
  },
};

/**
 * USER JOURNEY STORY 1: When Navigating Between Sections
 */
export const WhenNavigatingBetweenSections = {
  args: {
    tabs: [
      { slug: 'transactions', name: 'Transactions', body: 'Transaction list showing all imported transactions from this statement...' },
      { slug: 'overview', name: 'Overview', body: 'Statement overview with metadata, date range, account info...' },
      { slug: 'file', name: 'File', body: 'Original uploaded file preview or download option...' },
    ],
    variant: 'plain',
    tabName: 'tab',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /overview/i }));
    await expect(canvas.getByText(/Statement overview/)).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /file/i }));
    await expect(canvas.getByText(/Original uploaded file/)).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /transactions/i }));
    await expect(canvas.getByText(/Transaction list/)).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 2: With Count Badges
 */
export const WithCountBadges = {
  args: {
    tabs: [
      {
        slug: 'quotes',
        name: 'Quotes',
        stats: '47',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Quotes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-green-700">Approved</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-yellow-600">18</div>
                <div className="text-sm text-yellow-700">Pending Review</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-blue-700">In Progress</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        slug: 'parts',
        name: 'Parts',
        stats: '152',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Part Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-gray-600">89</div>
                <div className="text-sm text-gray-700">Machined Parts</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">34</div>
                <div className="text-sm text-orange-700">Heat Treated</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">19</div>
                <div className="text-sm text-purple-700">Assembly Parts</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border">
                <div className="text-2xl font-bold text-red-600">10</div>
                <div className="text-sm text-red-700">Special Process</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        slug: 'processes',
        name: 'Processes',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Manufacturing Processes</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">CNC Machining</span>
                <span className="text-sm text-gray-600">$45.50/hr</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Heat Treatment</span>
                <span className="text-sm text-gray-600">$12.25/kg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Surface Coating</span>
                <span className="text-sm text-gray-600">$8.75/m²</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        slug: 'activities',
        name: 'Activities',
        stats: '24',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Quote #Q-2024-0089 approved</div>
                  <div className="text-sm text-gray-600">Bearing housing assembly - $2,450.00</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">New part added: Gear Shaft</div>
                  <div className="text-sm text-gray-600">Material: Steel 4140, Heat treated</div>
                  <div className="text-xs text-gray-500">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    variant: 'plain',
    tabName: 'section',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('47')).toBeInTheDocument();
    await expect(canvas.getByText('152')).toBeInTheDocument();
    await expect(canvas.getByText('24')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /parts/i }));
    await expect(canvas.getByText('Part Inventory')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /processes/i }));
    await expect(canvas.getByText('Manufacturing Processes')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 3: When Organizing Settings
 */
export const WhenOrganizingSettings = {
  args: {
    tabs: [
      {
        slug: 'general',
        name: 'General',
        body: (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">General Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Organization Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time Zone</label>
                <select className="w-full px-3 py-2 border rounded">
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
          </div>
        ),
      },
      {
        slug: 'members',
        name: 'Members',
        stats: '8',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>john@example.com</span>
                <span className="text-sm text-gray-500">Admin</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>sarah@example.com</span>
                <span className="text-sm text-gray-500">Member</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        slug: 'api',
        name: 'API Keys',
        stats: '3',
        body: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">API Keys</h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded font-mono text-sm">
                pk_live_abc123...
              </div>
              <div className="p-3 bg-gray-50 rounded font-mono text-sm">
                pk_test_xyz789...
              </div>
            </div>
          </div>
        ),
      },
    ],
    variant: 'plain',
    tabName: 'settings',
  },
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    tabs: [
      { slug: 'tab1', name: 'Tab 1', body: 'Content of Tab 1' },
      { slug: 'tab2', name: 'Tab 2', stats: '42', body: 'Content of Tab 2 with badge' },
      { slug: 'tab3', name: 'Tab 3', body: 'Content of Tab 3' },
    ],
    variant: 'plain',
    tabName: 'tab',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /tab 2/i }));
    await expect(canvas.getByText('Content of Tab 2 with badge')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /tab 3/i }));
    await expect(canvas.getByText('Content of Tab 3')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: /tab 1/i }));
    await expect(canvas.getByText('Content of Tab 1')).toBeInTheDocument();
  },
};
