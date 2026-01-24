/**
 * SnackbarProvider Stories - User Journey Pattern
 */

import { useSnackbar, SnackbarProvider } from './SnackbarProvider';
import { Button } from '../primitives/button';

function ToastButton({ contents, color, variant = "default" }) {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar({
      content: contents || 'This is a toast message',
      color: color || 'success',
    });
  };

  return (
    <Button variant={variant} onClick={handleClick}>
      Show {color} Toast
    </Button>
  );
}

function MultipleToastsDemo() {
  const { showSnackbar, hideSnackbar } = useSnackbar();

  const showMultiple = () => {
    showSnackbar({ content: 'First toast message', color: 'info' });
    setTimeout(() => showSnackbar({ content: 'Second toast message', color: 'success' }), 500);
    setTimeout(() => showSnackbar({ content: 'Third toast message', color: 'warning' }), 1000);
  };

  const clearAll = () => {
    hideSnackbar();
  };

  return (
    <div className="space-x-2">
      <Button onClick={showMultiple}>Show Multiple Toasts</Button>
      <Button variant="outline" onClick={clearAll}>Clear All</Button>
    </div>
  );
}

function RichContentDemo() {
  const { showSnackbar } = useSnackbar();

  const showRichContent = () => {
    showSnackbar({
      content: '<strong>Quote saved successfully!</strong><br/>View it in the <em>pricing tab</em>.',
      color: 'success'
    });
  };

  return (
    <Button onClick={showRichContent}>Show Rich Content Toast</Button>
  );
}

export default {
  title: 'components/SnackbarProvider',
  component: ToastButton,
  argTypes: {
    contents: {
      control: 'text',
      description: 'Content of the toast message (supports HTML)',
      defaultValue: 'This is a toast message',
    },
    color: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'error'],
      description: 'Toast color/type with automatic icon',
      defaultValue: 'success',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Button variant for the demo',
      defaultValue: 'default',
    },
  },
};

/**
 * USER JOURNEY STORY 1: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    contents: 'Customize this toast message',
    color: 'info',
    variant: 'default',
  },
  render: (args) => (
    <SnackbarProvider>
      <ToastButton {...args} />
    </SnackbarProvider>
  ),
};

/**
 * USER JOURNEY STORY 2: Showing All Toast Types
 */
export const ShowingAllToastTypes = {
  render: () => (
    <SnackbarProvider>
      <div className="flex flex-wrap gap-2">
        <ToastButton contents="Operation completed successfully!" color="success" variant="default" />
        <ToastButton contents="Something went wrong. Please try again." color="danger" variant="destructive" />
        <ToastButton contents="Please review your input before continuing." color="warning" variant="outline" />
        <ToastButton contents="Here's some helpful information for you." color="info" variant="secondary" />
        <ToastButton contents="Processing your request..." color="error" variant="ghost" />
      </div>
    </SnackbarProvider>
  ),
};

/**
 * USER JOURNEY STORY 3: After Financial Operations
 */
export const AfterFinancialOperations = {
  render: () => (
    <SnackbarProvider>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <ToastButton
            contents="Statement imported successfully! 142 transactions added."
            color="success"
            variant="default"
          />
          <ToastButton
            contents="Failed to sync account. Check bank connection."
            color="danger"
            variant="destructive"
          />
          <ToastButton
            contents="Possible duplicate transaction detected. Review before saving."
            color="warning"
            variant="outline"
          />
          <ToastButton
            contents="Account balance synchronized from bank."
            color="info"
            variant="secondary"
          />
        </div>
      </div>
    </SnackbarProvider>
  ),
};

/**
 * USER JOURNEY STORY 4: Showing Multiple Notifications
 */
export const ShowingMultipleNotifications = {
  render: () => (
    <SnackbarProvider>
      <MultipleToastsDemo />
    </SnackbarProvider>
  ),
};

/**
 * USER JOURNEY STORY 5: With Rich Formatted Content
 */
export const WithRichFormattedContent = {
  render: () => (
    <SnackbarProvider>
      <div className="space-y-2">
        <RichContentDemo />
        <ToastButton
          contents="<strong>Important:</strong> Transaction rule <code>rule_042</code> contains <em>updated conditions</em>."
          color="warning"
          variant="outline"
        />
      </div>
    </SnackbarProvider>
  ),
};

/**
 * USER JOURNEY STORY 6: When Errors Occur
 */
export const WhenErrorsOccur = {
  render: () => (
    <SnackbarProvider>
      <div className="flex flex-wrap gap-2">
        <ToastButton
          contents="Network error: Unable to save transaction. Check connection."
          color="danger"
          variant="destructive"
        />
        <ToastButton
          contents="Validation failed: Transaction amount cannot be negative."
          color="error"
          variant="destructive"
        />
        <ToastButton
          contents="Session expired. Please log in again."
          color="warning"
          variant="outline"
        />
      </div>
    </SnackbarProvider>
  ),
};
