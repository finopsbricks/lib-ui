/**
 * AlertBox Stories - User Journey Pattern
 */

import AlertBox from './AlertBox';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { expect, within } from 'storybook/test';

export default {
  title: 'components/AlertBox',
  component: AlertBox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['warning', 'danger', 'success', 'info'],
    },
    icon: {
      control: 'boolean',
    },
  },
};

/**
 * USER JOURNEY STORY 1: After Validation Error
 */
export const AfterValidationError = {
  args: {
    title: 'Invalid Input',
    message: 'Please enter a valid email address',
    color: 'warning',
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Invalid Input')).toBeInTheDocument();
    await expect(canvas.getByText('Please enter a valid email address')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 2: When Multiple Errors Occur
 */
export const WhenMultipleErrorsOccur = {
  args: {
    title: 'Form Validation Failed',
    message: [
      'Email address is invalid',
      'Password must be at least 8 characters',
      'Username is required',
    ],
    color: 'danger',
    icon: <XCircle />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Form Validation Failed')).toBeInTheDocument();
    await expect(canvas.getByText('Email address is invalid')).toBeInTheDocument();
    await expect(canvas.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    await expect(canvas.getByText('Username is required')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 3: When Action Succeeds
 */
export const WhenActionSucceeds = {
  args: {
    title: 'Success',
    message: 'Your changes have been saved successfully',
    color: 'success',
    icon: <CheckCircle />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Success')).toBeInTheDocument();
    await expect(canvas.getByText('Your changes have been saved successfully')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 4: When Showing Information
 */
export const WhenShowingInformation = {
  args: {
    title: 'Important Notice',
    message: 'This feature is currently in beta. Some functionality may change in future updates.',
    color: 'info',
    icon: <Info />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Important Notice')).toBeInTheDocument();
    await expect(canvas.getByText('This feature is currently in beta. Some functionality may change in future updates.')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 5: Without Title (Icon Aligned)
 */
export const WithoutTitle = {
  args: {
    message: 'This statement was created directly in the system and is not synced with your bank. It contains manually entered transaction data.',
    color: 'info',
    icon: <Info />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This statement was created directly in the system and is not synced with your bank. It contains manually entered transaction data.')).toBeInTheDocument();
    await expect(canvas.queryByRole('heading')).not.toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 6: After Upload Failure
 */
export const AfterUploadFailure = {
  args: {
    title: 'Upload Failed',
    message: 'The file you selected exceeds the maximum size limit of 10MB. Please choose a smaller file or compress the document before uploading.',
    color: 'danger',
    icon: <XCircle className="h-4 w-4" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Upload Failed')).toBeInTheDocument();
    await expect(canvas.getByText(/exceeds the maximum size limit/)).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 7: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    title: 'Test Alert',
    message: 'This is a test message for the alert component',
    color: 'info',
    icon: <Info className="h-4 w-4" />,
  },
};
