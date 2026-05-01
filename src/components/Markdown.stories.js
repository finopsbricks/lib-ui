/**
 * Markdown Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: ViewingReconciliationReport, ViewingSimpleContent, WithFinancialTable
 */

import Markdown from './Markdown';
import { expect, within } from 'storybook/test';

export default {
  title: 'components/Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
  },
};

/**
 * USER JOURNEY STORY 1: Viewing Financial Report Table
 */
export const ViewingFinancialReportTable = {
  args: {
    children: `# Balance from Transactions

**Generated:** 2026-01-24T10:49:41.513Z
**Period:** 2025-04-01 to 2025-04-10
**Opening Balance:** 1,04,584.96

| Date | Opening | Inflow | Outflow | Closing | Txns |
|-----:|--------:|-------:|--------:|--------:|-----:|
| 2025-04-01 | 1,04,584.96 | 544.00 | - | 1,05,128.96 | 1 |
| 2025-04-02 | 1,05,128.96 | - | 8,000.00 | 97,128.96 | 1 |
| 2025-04-03 | 97,128.96 | 50,000.00 | - | 1,47,128.96 | 1 |`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Balance from Transactions')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 2: Viewing Comparison Report
 */
export const ViewingComparisonReport = {
  args: {
    children: `# Statement Comparison Report

**Statement ID:** zUr5zCv69mZE

## Comparison Summary

| Metric | Count |
|--------|------:|
| Matched | 184 days |
| Mismatched | 1 days |

## Mismatches

| Date | Field | Statement | App Txns | Diff |
|-----:|-------|----------:|--------:|-----:|
| 2025-04-01 | opening | 1,05,128.96 | 1,04,584.96 | 544.00 |`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Comparison Summary')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 3: Viewing Mixed Content Document
 */
export const ViewingMixedContentDocument = {
  args: {
    children: `# Process Documentation

This document describes the reconciliation process.

## Steps

1. **Data Fetch** - Retrieve statement and transactions
2. **Balance Computation** - Calculate daily balances
3. **Comparison** - Match statement vs app data

## Status Definitions

| Status | Description |
|--------|-------------|
| Matched | All balances verified |
| Review Needed | Discrepancies found |

> **Note:** Reconciliation runs automatically when new statements are uploaded.`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Process Documentation')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 4: Viewing Simple Text Content
 */
export const ViewingSimpleTextContent = {
  args: {
    children: `# Getting Started

Welcome to the **Process Engine**. This guide will help you get started.

## Quick Start

1. Navigate to *Processes* in the sidebar
2. Click **Create Process**
3. Fill in the required fields

### Code Example

Use the \`trigger()\` function to start a process:

\`\`\`javascript
await trigger('reconciliation', { statementId: 'abc123' });
\`\`\`

For more information, visit [our documentation](https://docs.example.com).`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Getting Started')).toBeInTheDocument();
  },
};

/**
 * USER JOURNEY STORY 5: Narrow Container (Mobile/Sidebar)
 */
export const NarrowContainerWithTable = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', border: '1px solid #ccc', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: `## Daily Balances

| Date | Opening | Inflow | Outflow | Closing |
|-----:|--------:|-------:|--------:|--------:|
| 2025-04-01 | 1,04,584.96 | 544.00 | - | 1,05,128.96 |
| 2025-04-02 | 1,05,128.96 | - | 8,000.00 | 97,128.96 |`,
  },
};

/**
 * USER JOURNEY STORY 6: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    children: `# Test Document

Try editing this markdown to test different features.

## Table Alignment Test

| Left Aligned | Center | Right Aligned |
|:-------------|:------:|--------------:|
| Text here | Text | 1,234.56 |
| More text | More | 99,999.99 |`,
  },
};

/**
 * USER JOURNEY STORY 7: Custom Components Override
 *
 * Demonstrates the `components` prop for overriding react-markdown renderers.
 * This is how the orchestrator injects fob:* widget support via DocumentPaperViewer.
 */
export const WithComponentsOverride = {
  args: {
    children: `# Report with Custom Code Block

Regular markdown renders normally.

\`\`\`custom:banner
This block is intercepted by the custom pre override.
\`\`\`

\`\`\`javascript
// Regular code blocks still render normally
const x = 42;
\`\`\`
`,
    components: {
      pre: ({ children, ...props }) => {
        const class_name = children?.props?.className;
        if (class_name?.includes("language-custom:banner")) {
          return (
            <div style={{
              margin: "16px 0",
              padding: "12px 16px",
              backgroundColor: "#eff6ff",
              borderLeft: "4px solid #3b82f6",
              borderRadius: "8px",
              color: "#1e40af",
              fontSize: "14px",
            }}>
              {String(children.props.children)}
            </div>
          );
        }
        return (
          <pre style={{
            margin: "16px 0",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#f4f4f5",
            overflow: "auto",
            fontSize: "14px",
          }} {...props}>
            {children}
          </pre>
        );
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Report with Custom Code Block')).toBeInTheDocument();
    await expect(canvas.getByText(/This block is intercepted/)).toBeInTheDocument();
    await expect(canvas.getByText(/const x = 42/)).toBeInTheDocument();
  },
};
