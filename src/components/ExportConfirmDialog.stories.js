/**
 * ExportConfirmDialog Stories - User Journey Pattern
 */

import ExportConfirmDialog from './ExportConfirmDialog';
import { fn } from 'storybook/test';

export default {
  title: 'components/ExportConfirmDialog',
  component: ExportConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls whether the dialog is open',
    },
    format: {
      control: { type: 'select', options: ['csv', 'xlsx', 'json'] },
      description: 'Export format type',
    },
    currentViewCount: {
      control: { type: 'number' },
      description: 'Number of transactions in current view',
    },
    totalCount: {
      control: { type: 'number' },
      description: 'Total number of filtered transactions',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state of the dialog',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when dialog is closed',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Callback when export scope is confirmed',
    },
  },
  args: {
    open: true,
    format: 'csv',
    currentViewCount: 100,
    totalCount: 500,
    loading: false,
    onClose: fn(),
    onConfirm: fn(),
  },
};

/**
 * USER JOURNEY STORY 1: After Clicking Export
 */
export const AfterClickingExport = {
  args: {
    open: true,
    format: 'csv',
    currentViewCount: 100,
    totalCount: 500,
    loading: false,
  },
};

/**
 * USER JOURNEY STORY 2: While Exporting
 */
export const WhileExporting = {
  args: {
    open: true,
    format: 'xlsx',
    currentViewCount: 100,
    totalCount: 500,
    loading: true,
  },
};

/**
 * USER JOURNEY STORY 3: With Large Dataset
 */
export const WithLargeDataset = {
  args: {
    open: true,
    format: 'csv',
    currentViewCount: 100,
    totalCount: 14999,
    loading: false,
  },
};

/**
 * USER JOURNEY STORY 4: When Current Equals Total
 */
export const WhenCurrentEqualsTotal = {
  args: {
    open: true,
    format: 'xlsx',
    currentViewCount: 25,
    totalCount: 25,
    loading: false,
  },
};

/**
 * USER JOURNEY STORY 5: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    open: true,
    format: 'csv',
    currentViewCount: 100,
    totalCount: 1234,
    loading: false,
  },
  play: async ({ canvasElement, args }) => {
    const dialog = canvasElement.querySelector('[role="dialog"]');
    if (dialog && args.open) {
      console.log('Export confirmation dialog is open and ready for interaction');
      console.log(`Format: ${args.format}, Current: ${args.currentViewCount}, Total: ${args.totalCount}`);
    }
  },
};
