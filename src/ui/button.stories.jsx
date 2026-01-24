/**
 * Button Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: ReadyToClick, WhileProcessing, WhenActionFails
 */

import React from 'react';
import { expect, within } from 'storybook/test';
import { Button } from './button';
import { Upload, Trash2, Save } from 'lucide-react';

const meta = {
  title: 'components/ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the button',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      description: 'Size variant of the button',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interaction',
    },
    as_child: {
      control: 'boolean',
      description: 'Renders as child element instead of button',
    },
  },
};

export default meta;

/**
 * USER JOURNEY STORY: Ready To Click
 *
 * When: User sees a primary action button ready to be clicked
 *
 * User sees: Standard blue button with clear label, ready for interaction
 *
 * Tests: Default button appearance, enabled state, primary variant styling
 */
export const ReadyToClick = {
  parameters: {
    description: 'Happy path: User sees a primary action button ready to be clicked. Most common button state across the application. Uses default variant with primary blue color.',
  },
  args: {
    children: 'Upload Statement',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
  },
};

/**
 * USER JOURNEY STORY: While Processing
 *
 * When: User clicked button and action is being processed (uploading file, saving data, etc.)
 *
 * User sees: Button with loading spinner, disabled, showing "Processing..." or similar text
 *
 * Tests: Loading state, disabled interaction, spinner visibility
 */
export const WhileProcessing = {
  parameters: {
    description: 'Loading state: User clicked button and action is processing. Button shows spinner, is disabled, and provides visual feedback that work is in progress. Common during file uploads, data saves, API calls.',
  },
  args: {
    children: 'Processing...',
    loading: true,
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();

    const spinner = canvasElement.querySelector('.animate-spin');
    await expect(spinner).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY: When Action Is Dangerous
 *
 * When: User is about to perform destructive action (delete account, remove statement, clear data)
 *
 * User sees: Red button indicating dangerous action, prompts caution
 *
 * Tests: Destructive variant styling, warning color, clear visual differentiation
 */
export const WhenActionIsDangerous = {
  parameters: {
    description: 'Destructive action: User sees red button for dangerous operations like deleting accounts or removing data. Uses destructive variant to signal caution and prevent accidental clicks.',
  },
  args: {
    children: 'Delete Account',
    variant: 'destructive',
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      <Button {...args}>
        <Trash2 className="size-4" />
        {args.children}
      </Button>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: When Action Is Disabled
 *
 * When: User sees button but cannot click it (lacks permissions, invalid form state, etc.)
 *
 * User sees: Grayed out button that is not interactive
 *
 * Tests: Disabled state styling, non-interactive behavior
 */
export const WhenActionIsDisabled = {
  parameters: {
    description: 'Disabled state: User sees button but cannot interact with it due to permissions, form validation, or business rules. Button appears grayed out with reduced opacity.',
  },
  args: {
    children: 'Save Changes',
    disabled: true,
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

/**
 * USER JOURNEY STORY: With Icon And Text
 *
 * When: User sees button with both icon and label for enhanced clarity
 *
 * User sees: Button with icon on left and text label, common for primary actions
 *
 * Tests: Icon placement, text alignment, proper spacing
 */
export const WithIconAndText = {
  parameters: {
    description: 'Icon + text pattern: Common button style with icon and label. Icon provides visual recognition, text provides clarity. Used for primary actions like upload, save, download.',
  },
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args}>
        <Upload className="size-4" />
        Upload Statement
      </Button>
      <Button {...args} variant="outline">
        <Save className="size-4" />
        Save Changes
      </Button>
      <Button {...args} variant="destructive">
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  ),
};

/**
 * USER JOURNEY STORY: With Secondary Actions
 *
 * When: User sees secondary/tertiary actions that are less prominent than primary action
 *
 * User sees: Outline or ghost buttons for less important actions
 *
 * Tests: Visual hierarchy, outline/ghost variants, subtle styling
 */
export const WithSecondaryActions = {
  parameters: {
    description: 'Visual hierarchy: Shows secondary and tertiary actions using outline and ghost variants. Creates clear visual priority between primary action (filled) and supporting actions (outline/ghost).',
  },
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Save Changes</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Reset</Button>
    </div>
  ),
};
