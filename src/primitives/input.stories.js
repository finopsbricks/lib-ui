/**
 * Input Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: ReadyToType, WhileTyping, WhenValidationFails
 */

import React from 'react';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { Input } from './input';

const meta = {
  title: 'components/ui/input',
  component: Input,
  tags: ['shadcn'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      description: 'HTML input type',
      options: ['text', 'email', 'password', 'number', 'date', 'tel', 'url'],
    },
    size: {
      control: 'select',
      description: 'Size variant of the input',
      options: ['default', 'sm'],
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables input interaction',
    },
  },
};

export default meta;

/**
 * USER JOURNEY STORY: Ready To Type
 *
 * When: User sees an empty input field ready for text entry
 *
 * User sees: Clean input field with placeholder text, cursor appears on focus
 *
 * Tests: Default input appearance, placeholder visibility, focus behavior
 */
export const ReadyToType = {
  parameters: {
    description: 'Happy path: User sees empty input field with placeholder text ready for typing. Most common initial state for form inputs across the application.',
  },
  args: {
    type: 'text',
    placeholder: 'Enter account name...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter account name...');

    await step('Verify input is ready', async () => {
      await expect(input).toBeInTheDocument();
      await expect(input).not.toBeDisabled();
    });

    await step('Focus input and verify state', async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();
    });
  },
};

/**
 * USER JOURNEY STORY: After Entering Text
 *
 * When: User has typed text into the input field
 *
 * User sees: Input field with user-entered text, can edit or clear
 *
 * Tests: Text display, value state, editing capability
 */
export const AfterEnteringText = {
  parameters: {
    description: 'Active state: User has entered text into the field. Shows filled input with value, ready for editing or form submission.',
  },
  args: {
    type: 'text',
    placeholder: 'Enter organization name...',
    defaultValue: 'Acme Corporation',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('Acme Corporation');

    await step('Verify text is present', async () => {
      await expect(input).toHaveValue('Acme Corporation');
    });

    await step('User can edit text', async () => {
      await userEvent.click(input);
      await userEvent.keyboard(' Inc.');
      await waitFor(async () => {
        await expect(input).toHaveValue('Acme Corporation Inc.');
      });
    });
  },
};

/**
 * USER JOURNEY STORY: When Field Is Required
 *
 * When: User sees a required field that must be filled before form submission
 *
 * User sees: Input field with required indicator (typically in label or helper text)
 *
 * Tests: Required state, validation behavior
 */
export const WhenFieldIsRequired = {
  parameters: {
    description: 'Required field: User must fill this field to submit the form. Shows required indicator and triggers validation on blur or submit.',
  },
  render: () => (
    <div className="space-y-2 w-80">
      <label htmlFor="email" className="text-sm font-medium">
        Email Address <span className="text-red-500">*</span>
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <p className="text-xs text-muted-foreground">
        Required field - used for account recovery and notifications
      </p>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: When Validation Fails
 *
 * When: User entered invalid data and field shows error state
 *
 * User sees: Input with red border (aria-invalid), error styling
 *
 * Tests: Error state styling, aria-invalid attribute, visual feedback
 */
export const WhenValidationFails = {
  parameters: {
    description: 'Error state: User entered invalid data and field shows validation error. Red border and error ring provide clear visual feedback. Common for email format, required fields, or business rule violations.',
  },
  render: () => (
    <div className="space-y-2 w-80">
      <label htmlFor="email-error" className="text-sm font-medium">
        Email Address
      </label>
      <Input
        id="email-error"
        type="email"
        placeholder="you@example.com"
        defaultValue="invalid-email"
        aria-invalid="true"
      />
      <p className="text-xs text-red-600">
        Please enter a valid email address
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('invalid-email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * USER JOURNEY STORY: When Field Is Disabled
 *
 * When: User sees a field that cannot be edited (read-only scenario, permissions, etc.)
 *
 * User sees: Grayed out input that is not interactive
 *
 * Tests: Disabled state styling, non-interactive behavior
 */
export const WhenFieldIsDisabled = {
  parameters: {
    description: 'Disabled state: User cannot edit this field due to permissions, read-only mode, or business rules. Field appears grayed out with reduced opacity.',
  },
  args: {
    type: 'text',
    placeholder: 'Organization ID',
    defaultValue: 'org_12345abcde',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('org_12345abcde');
    await expect(input).toBeDisabled();
  },
};

/**
 * USER JOURNEY STORY: With Different Input Types
 *
 * When: User sees different input types for different data (email, password, number, date)
 *
 * User sees: Type-specific input fields with appropriate keyboard and validation
 *
 * Tests: Different input types, type-specific behavior, mobile keyboard optimization
 */
export const WithDifferentInputTypes = {
  parameters: {
    description: 'Input types: Shows different input types used across the application. Each type provides appropriate keyboard (mobile) and validation behavior.',
  },
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <label htmlFor="text-input" className="text-sm font-medium">
          Text Input
        </label>
        <Input
          id="text-input"
          type="text"
          placeholder="Account name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email-input" className="text-sm font-medium">
          Email Input
        </label>
        <Input
          id="email-input"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password-input" className="text-sm font-medium">
          Password Input
        </label>
        <Input
          id="password-input"
          type="password"
          placeholder="Enter password"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="number-input" className="text-sm font-medium">
          Number Input
        </label>
        <Input
          id="number-input"
          type="number"
          placeholder="Amount"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="date-input" className="text-sm font-medium">
          Date Input
        </label>
        <Input
          id="date-input"
          type="date"
        />
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: With Small Size Variant
 *
 * When: User sees compact input in space-constrained UI (tables, compact forms)
 *
 * User sees: Smaller input field with reduced padding and height
 *
 * Tests: Small size variant styling, maintains usability at smaller size
 */
export const WithSmallSizeVariant = {
  parameters: {
    description: 'Size variant: Shows small input size for space-constrained layouts like inline table editing or compact filter forms.',
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default Size</label>
        <Input
          type="text"
          placeholder="Default size input"
          size="default"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Small Size</label>
        <Input
          type="text"
          placeholder="Small size input"
          size="sm"
        />
      </div>
    </div>
  ),
};
