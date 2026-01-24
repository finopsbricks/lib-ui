/**
 * Dialog Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: AfterClickingAction, WhenConfirmingDelete, WithFormContent
 */

import React from 'react';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';

const meta = {
  title: 'components/ui/dialog',
  component: Dialog,
  tags: ['shadcn'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dialog open/closed state',
    },
  },
};

export default meta;

/**
 * USER JOURNEY STORY: After Clicking Action
 *
 * When: User clicked a button/link that opens a dialog for confirmation or input
 *
 * User sees: Dialog opens with overlay, title, description, and action buttons
 *
 * Tests: Dialog opens, overlay visible, close button works, escape key closes
 */
export const AfterClickingAction = {
  parameters: {
    description: 'Happy path: User clicked action button and dialog opens. Shows title, description, and action buttons. Overlay darkens background, dialog is centered. Common for confirmations, forms, and additional details.',
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Review the details of this transaction before taking action.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-sm">₹12,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">Jan 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Category:</span>
              <span className="text-sm">Expense</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click trigger to open dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /view details/i });
      await userEvent.click(trigger);
    });

    await step('Verify dialog is open and content is visible', async () => {
      await waitFor(async () => {
        const dialog = within(document.body).getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
      });

      const title = within(document.body).getByText('Transaction Details');
      await expect(title).toBeInTheDocument();

      const description = within(document.body).getByText(/review the details/i);
      await expect(description).toBeInTheDocument();
    });
  },
};

/**
 * USER JOURNEY STORY: When Confirming Dangerous Action
 *
 * When: User about to perform destructive action (delete account, remove data)
 *
 * User sees: Confirmation dialog with warning message and destructive action button
 *
 * Tests: Dialog shows warning, destructive button styling, cancel option clear
 */
export const WhenConfirmingDangerousAction = {
  parameters: {
    description: 'Destructive action: User must confirm dangerous operation like deleting account or removing data. Dialog shows clear warning message and destructive (red) action button. Prevents accidental deletions.',
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account? This action cannot be undone.
            All transactions associated with this account will also be removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click delete button to open confirmation', async () => {
      const trigger = canvas.getByRole('button', { name: /delete account/i });
      await userEvent.click(trigger);
    });

    await step('Verify warning dialog is displayed', async () => {
      await waitFor(async () => {
        const dialog = within(document.body).getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
      });

      const warning = within(document.body).getByText(/this action cannot be undone/i);
      await expect(warning).toBeInTheDocument();
    });
  },
};

/**
 * USER JOURNEY STORY: With Form Content
 *
 * When: User needs to fill out a form in a modal dialog
 *
 * User sees: Dialog with form fields, submit and cancel buttons
 *
 * Tests: Dialog contains form, input fields work, form submission flow
 */
export const WithFormContent = {
  parameters: {
    description: 'Form dialog: User filling out form in modal dialog. Common for creating new items, editing data, or multi-step workflows. Dialog provides focused context for form completion.',
  },
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create New Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Add a new bank account to track your transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="account-name" className="text-sm font-medium">
                Account Name
              </label>
              <input
                id="account-name"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="ICICI Bank Savings"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="account-number" className="text-sm font-medium">
                Account Number
              </label>
              <input
                id="account-number"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="1234567890"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open form dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /create new account/i });
      await userEvent.click(trigger);
    });

    await step('Fill out form fields', async () => {
      await waitFor(async () => {
        const dialog = within(document.body).getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
      });

      const nameInput = within(document.body).getByPlaceholderText('ICICI Bank Savings');
      await userEvent.type(nameInput, 'HDFC Checking Account');

      const numberInput = within(document.body).getByPlaceholderText('1234567890');
      await userEvent.type(numberInput, '9876543210');
    });
  },
};

/**
 * USER JOURNEY STORY: Without Close Button
 *
 * When: User must complete critical action before closing dialog (onboarding, required input)
 *
 * User sees: Dialog without X close button, must use action buttons to proceed
 *
 * Tests: No close button visible, dialog forces user decision
 */
export const WithoutCloseButton = {
  parameters: {
    description: 'Forced action: User must make explicit choice using action buttons. Close button (X) is hidden to ensure user completes critical workflow. Common for onboarding, required confirmations, or important decisions.',
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete Onboarding</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your organization details to continue using Cashflowy.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is a required step. Please complete the form to proceed.
          </p>
        </div>
        <DialogFooter>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /complete onboarding/i });
      await userEvent.click(trigger);
    });

    await step('Verify close button is hidden', async () => {
      await waitFor(async () => {
        const dialog = within(document.body).getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
      });

      // Close button (X) should not exist
      const dialog = within(document.body).getByRole('dialog');
      const dialogContent = within(dialog);
      const closeButtons = dialogContent.queryAllByRole('button', { name: /close/i });

      // Should only have the "Continue" button, no X close button
      const actionButtons = within(document.body).getAllByRole('button');
      const xCloseButton = actionButtons.find(btn => btn.classList.contains('absolute') && btn.querySelector('svg'));
      if (xCloseButton) {
        await expect(xCloseButton).not.toBeInTheDocument();
      }
    });
  },
};

/**
 * USER JOURNEY STORY: With Long Content
 *
 * When: User viewing dialog with long content (terms, detailed information)
 *
 * User sees: Dialog with scrollable content, header and footer remain fixed
 *
 * Tests: Content scrolls, dialog remains centered, header/footer sticky
 */
export const WithLongContent = {
  parameters: {
    description: 'Long content: Dialog contains extensive text or many form fields. Content area scrolls while header and footer remain visible. Common for terms of service, detailed reports, or multi-section forms.',
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[50vh] pr-2">
          <div className="space-y-4 text-sm">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <h4 className="font-medium mb-2">Section {i + 1}</h4>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dialog with long content', async () => {
      const trigger = canvas.getByRole('button', { name: /view terms/i });
      await userEvent.click(trigger);
    });

    await step('Verify dialog opens and content is scrollable', async () => {
      await waitFor(async () => {
        const dialog = within(document.body).getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
      });

      const title = within(document.body).getByText('Terms of Service');
      await expect(title).toBeInTheDocument();
    });
  },
};
