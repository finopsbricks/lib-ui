/**
 * Table Stories - User Journey Pattern
 */

import Table from './Table';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../primitives/table';

const meta = {
  title: 'components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['topHeader', 'sideHeader'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['soft', 'outlined', 'plain'],
    },
    hoverRow: {
      control: 'boolean',
    },
  },
};

export default meta;

const SampleTableContent = () => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead>Transaction</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Amazon Purchase</TableCell>
        <TableCell>2024-01-15</TableCell>
        <TableCell>Shopping</TableCell>
        <TableCell>$125.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Salary Deposit</TableCell>
        <TableCell>2024-01-01</TableCell>
        <TableCell>Income</TableCell>
        <TableCell>$5,000.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Grocery Store</TableCell>
        <TableCell>2024-01-10</TableCell>
        <TableCell>Food</TableCell>
        <TableCell>$89.45</TableCell>
      </TableRow>
    </TableBody>
  </>
);

/**
 * USER JOURNEY STORY 1: Displaying Transaction Data
 */
export const DisplayingTransactionData = {
  args: {
    type: 'topHeader',
    size: 'sm',
    variant: 'soft',
  },
  render: (args) => (
    <Table {...args}>
      <SampleTableContent />
    </Table>
  ),
};

/**
 * USER JOURNEY STORY 2: Showing Account Details
 */
export const ShowingAccountDetails = {
  args: {
    type: 'sideHeader',
    size: 'sm',
    variant: 'soft',
  },
  render: (args) => (
    <Table {...args}>
      <TableBody>
        <TableRow>
          <TableCell>Account Type</TableCell>
          <TableCell>Checking</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bank</TableCell>
          <TableCell>Chase Bank</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Balance</TableCell>
          <TableCell>$2,450.75</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * USER JOURNEY STORY 3: With Interactive Rows
 */
export const WithInteractiveRows = {
  args: {
    type: 'topHeader',
    size: 'sm',
    variant: 'soft',
    hoverRow: true,
  },
  render: (args) => (
    <Table {...args}>
      <SampleTableContent />
    </Table>
  ),
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    type: 'topHeader',
    size: 'sm',
    variant: 'soft',
    hoverRow: false,
  },
  render: (args) => (
    <Table {...args}>
      <SampleTableContent />
    </Table>
  ),
};
