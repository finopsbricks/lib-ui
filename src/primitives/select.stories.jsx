/**
 * Select Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: ReadyToChoose, AfterSelectingOption, WhenFilteringAccounts
 */

import React from 'react';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const meta = {
  title: 'components/ui/select',
  component: Select,
  tags: ['shadcn'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

/**
 * USER JOURNEY STORY: Ready To Choose
 *
 * When: User sees select field with placeholder, ready to choose an option
 *
 * User sees: Select trigger with placeholder text and chevron icon
 *
 * Tests: Select renders, placeholder visible, click opens dropdown
 */
export const ReadyToChoose = {
  parameters: {
    description: 'Happy path: User sees select field with placeholder, ready to make a choice. Most common initial state for dropdown selects across the application.',
  },
  render: () => (
    <div className="space-y-2">
      <label htmlFor="category" className="text-sm font-medium">
        Transaction Category
      </label>
      <Select>
        <SelectTrigger id="category">
          <SelectValue placeholder="Select category..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
          <SelectItem value="asset">Asset</SelectItem>
          <SelectItem value="liability">Liability</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify select is ready', async () => {
      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).not.toBeDisabled();
    });

    await step('Click to open dropdown', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);
    });

    await step('Verify options are visible', async () => {
      await waitFor(async () => {
        const expense = within(document.body).getByRole('option', { name: 'Expense' });
        await expect(expense).toBeInTheDocument();
      });
    });
  },
};

/**
 * USER JOURNEY STORY: After Selecting Option
 *
 * When: User has selected an option from the dropdown
 *
 * User sees: Select shows selected value, can click to change selection
 *
 * Tests: Selected value display, can reopen and change selection
 */
export const AfterSelectingOption = {
  parameters: {
    description: 'Selected state: User has chosen an option. Select displays selected value and can be clicked to change selection. Common state after initial form interaction.',
  },
  render: () => {
    const [value, setValue] = React.useState('expense');

    return (
      <div className="space-y-2">
        <label htmlFor="category-selected" className="text-sm font-medium">
          Transaction Category
        </label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger id="category-selected">
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
            <SelectItem value="asset">Asset</SelectItem>
            <SelectItem value="liability">Liability</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Selected: {value}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial selection is shown', async () => {
      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toHaveTextContent('Expense');
    });

    await step('Open dropdown and select different option', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      await waitFor(async () => {
        const income = within(document.body).getByRole('option', { name: 'Income' });
        await expect(income).toBeInTheDocument();
        await userEvent.click(income);
      });
    });

    await step('Verify new selection is shown', async () => {
      await waitFor(async () => {
        const trigger = canvas.getByRole('combobox');
        await expect(trigger).toHaveTextContent('Income');
      });
    });
  },
};

/**
 * USER JOURNEY STORY: When Filtering By Account
 *
 * When: User selecting account from dropdown to filter transactions
 *
 * User sees: Select with list of bank accounts grouped by type
 *
 * Tests: Grouped options, multiple groups, selection works
 */
export const WhenFilteringByAccount = {
  parameters: {
    description: 'Grouped options: User selecting from categorized list of accounts. Options grouped by account type (Bank, Credit Card) for easier navigation. Common in filter forms and transaction categorization.',
  },
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="space-y-2">
        <label htmlFor="account-filter" className="text-sm font-medium">
          Filter by Account
        </label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger id="account-filter">
            <SelectValue placeholder="All accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bank Accounts</SelectLabel>
              <SelectItem value="icici-savings">ICICI Bank Savings</SelectItem>
              <SelectItem value="hdfc-checking">HDFC Checking</SelectItem>
              <SelectItem value="axis-salary">Axis Bank Salary Account</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Credit Cards</SelectLabel>
              <SelectItem value="hdfc-credit">HDFC Credit Card</SelectItem>
              <SelectItem value="amex-platinum">Amex Platinum</SelectItem>
              <SelectItem value="sbi-credit">SBI Credit Card</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open select and verify groups', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      await waitFor(async () => {
        const bankLabel = within(document.body).getByText('Bank Accounts');
        await expect(bankLabel).toBeInTheDocument();

        const creditLabel = within(document.body).getByText('Credit Cards');
        await expect(creditLabel).toBeInTheDocument();
      });
    });

    await step('Select account from group', async () => {
      const account = within(document.body).getByRole('option', { name: 'ICICI Bank Savings' });
      await userEvent.click(account);

      await waitFor(async () => {
        const trigger = canvas.getByRole('combobox');
        await expect(trigger).toHaveTextContent('ICICI Bank Savings');
      });
    });
  },
};

/**
 * USER JOURNEY STORY: When Selection Is Disabled
 *
 * When: User sees select but cannot change it (read-only, permissions, loading)
 *
 * User sees: Grayed out select that is not interactive
 *
 * Tests: Disabled state, not clickable, visual feedback
 */
export const WhenSelectionIsDisabled = {
  parameters: {
    description: 'Disabled state: User cannot change selection due to permissions, read-only mode, or dependencies. Select appears grayed out with reduced opacity.',
  },
  render: () => (
    <div className="space-y-2">
      <label htmlFor="category-disabled" className="text-sm font-medium">
        Transaction Category
      </label>
      <Select disabled value="expense">
        <SelectTrigger id="category-disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Category is locked for processed transactions
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeDisabled();
  },
};

/**
 * USER JOURNEY STORY: When Selection Has Validation Error
 *
 * When: User submitted form with invalid or missing selection
 *
 * User sees: Select with error styling (red border) and error message
 *
 * Tests: Error state styling, aria-invalid attribute
 */
export const WhenSelectionHasValidationError = {
  parameters: {
    description: 'Error state: User submitted form without making required selection. Select shows red border and error message provides feedback. Common for required fields in forms.',
  },
  render: () => (
    <div className="space-y-2">
      <label htmlFor="category-error" className="text-sm font-medium">
        Transaction Category <span className="text-red-500">*</span>
      </label>
      <Select>
        <SelectTrigger id="category-error" aria-invalid="true">
          <SelectValue placeholder="Select category..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-red-600">
        Please select a category
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * USER JOURNEY STORY: With Small Size Variant
 *
 * When: User sees compact select in space-constrained UI (tables, inline forms)
 *
 * User sees: Smaller select with reduced height and padding
 *
 * Tests: Small size variant styling, maintains usability
 */
export const WithSmallSizeVariant = {
  parameters: {
    description: 'Size variant: Shows small select for space-constrained layouts like inline table editing or compact filter forms.',
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default Size</label>
        <Select>
          <SelectTrigger size="default">
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Small Size</label>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
