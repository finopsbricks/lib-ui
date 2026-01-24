/**
 * MultiSelect Stories - User Journey Pattern
 */

import React from 'react';
import { expect, within, userEvent, waitFor, screen } from 'storybook/test';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '350px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const flatOptions = [
  { value: '1', label: 'HDFC Savings Account' },
  { value: '2', label: 'ICICI Credit Card' },
  { value: '3', label: 'SBI Current Account' },
  { value: '4', label: 'Axis Bank Account' },
  { value: '5', label: 'AMEX Credit Card' },
];

const groupedOptions = [
  {
    label: 'Bank Accounts',
    options: [
      { value: '1', label: 'HDFC Savings', description: 'Primary savings account ending in 1234' },
      { value: '2', label: 'ICICI Salary', description: 'Salary account ending in 5678' },
    ],
  },
  {
    label: 'Credit Cards',
    options: [
      { value: '5', label: 'HDFC Regalia', description: 'Regalia credit card ending in 7890' },
      { value: '6', label: 'ICICI Amazon Pay', description: 'Amazon co-branded card ending in 2345' },
    ],
  },
];

/**
 * USER JOURNEY STORY 1: With No Selections
 */
export const WithNoSelections = {
  args: {
    name: 'accounts',
    placeholder: 'Select accounts...',
    options: flatOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectButton = canvas.getByRole('combobox', { name: /select accounts/i });
    await expect(selectButton).toBeInTheDocument();
    await expect(selectButton).toHaveClass(/text-muted-foreground/);
  },
};

/**
 * USER JOURNEY STORY 2: With Single Selection
 */
export const WithSingleSelection = {
  args: {
    name: 'accounts',
    placeholder: 'Select accounts...',
    defaultValue: '1',
    options: flatOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectButton = canvas.getByRole('combobox', { name: /hdfc savings account/i });
    await expect(selectButton).toBeInTheDocument();
    await expect(selectButton).not.toHaveClass(/text-muted-foreground/);
  },
};

/**
 * USER JOURNEY STORY 3: With Multiple Selections
 */
export const WithMultipleSelections = {
  args: {
    name: 'accounts',
    placeholder: 'Select accounts...',
    defaultValue: '1,2,5',
    options: flatOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectButton = canvas.getByRole('combobox', { name: /3 items selected/i });
    await expect(selectButton).toBeInTheDocument();
    const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"][name="accounts"]');
    await expect(hiddenInputs).toHaveLength(3);
  },
};

/**
 * USER JOURNEY STORY 4: With Grouped Options
 */
export const WithGroupedOptions = {
  args: {
    name: 'accounts',
    placeholder: 'Select accounts...',
    defaultValue: '1,5',
    options: groupedOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectButton = canvas.getByRole('combobox', { name: /2 items selected/i });
    await expect(selectButton).toBeInTheDocument();
    await userEvent.click(selectButton);
    await waitFor(() => {
      expect(screen.getByText('Bank Accounts')).toBeInTheDocument();
      expect(screen.getByText('Credit Cards')).toBeInTheDocument();
    });
  },
};

/**
 * USER JOURNEY STORY 5: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    name: 'test_accounts',
    placeholder: 'Select accounts for testing...',
    options: groupedOptions,
  },
};
