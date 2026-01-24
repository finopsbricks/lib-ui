/**
 * DatePicker Stories - User Journey Pattern
 */

import React from 'react';
import { expect, within, userEvent, waitFor, screen } from 'storybook/test';
import DatePicker from './DatePicker';

const meta = {
  title: 'components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

/**
 * USER JOURNEY STORY 1: Before Selecting Date
 */
export const BeforeSelectingDate = {
  args: {
    name: 'date',
    placeholder: 'Select a date',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateButton = canvas.getByRole('button', { name: /select a date/i });
    await expect(dateButton).toBeInTheDocument();
    await expect(dateButton).toHaveClass(/text-muted-foreground/);
  },
};

/**
 * USER JOURNEY STORY 2: With Calendar Open
 */
export const WithCalendarOpen = {
  args: {
    name: 'date',
    placeholder: 'Pick a date',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateButton = canvas.getByRole('button', { name: /pick a date/i });
    await userEvent.click(dateButton);
    await waitFor(() => {
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
    });
  },
};

/**
 * USER JOURNEY STORY 3: After Selecting Date
 */
export const AfterSelectingDate = {
  args: {
    name: 'date_from',
    placeholder: 'Select start date',
    defaultValue: '2024-01-15',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateButton = canvas.getByRole('button', { name: /jan 15, 2024/i });
    await expect(dateButton).toBeInTheDocument();
    await expect(dateButton).not.toHaveClass(/text-muted-foreground/);
    const hiddenInput = canvasElement.querySelector('input[type="hidden"][name="date_from"]');
    await expect(hiddenInput).toHaveValue('2024-01-15');
  },
};

/**
 * USER JOURNEY STORY 4: With Pre-Selected Date
 */
export const WithPreSelectedDate = {
  args: {
    name: 'transaction_date',
    placeholder: 'Select transaction date',
    defaultValue: '2024-12-25',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateButton = canvas.getByRole('button', { name: /dec 25, 2024/i });
    await expect(dateButton).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 5: With Clear Date Option
 */
export const WithClearDateOption = {
  args: {
    name: 'date_to',
    placeholder: 'Select end date',
    defaultValue: '2024-02-20',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dateButton = canvas.getByRole('button', { name: /feb 20, 2024/i });
    await userEvent.click(dateButton);
    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear date/i });
      expect(clearButton).toBeInTheDocument();
    });
  },
};

/**
 * USER JOURNEY STORY 6: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    name: 'test_date',
    placeholder: 'Choose a date...',
  },
};
