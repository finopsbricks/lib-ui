/**
 * Typography Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: WhenReadingContent, WithFinancialData, WhenTextTruncates
 */

import { Typography } from './typography'
import { User, Database, CheckCircle } from 'lucide-react'

const meta = {
  title: 'components/ui/typography',
  component: Typography,
  tags: ['shadcn'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Typography style variant',
      options: [
        'h1', 'h2', 'h3', 'h4',
        'title-lg', 'title-md', 'title-sm',
        'body-lg', 'body-md', 'body-sm', 'body-xs',
        'lead', 'large', 'small', 'muted'
      ],
    },
    color: {
      control: 'select',
      description: 'Text color',
      options: ['default', 'muted', 'success', 'warning', 'danger', 'primary', 'neutral'],
    },
    weight: {
      control: 'select',
      description: 'Font weight',
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    align: {
      control: 'select',
      description: 'Text alignment',
      options: ['left', 'center', 'right', 'justify'],
    },
    as: {
      control: 'select',
      description: 'HTML element to render',
      options: ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    no_wrap: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
  },
}

export default meta

/**
 * USER JOURNEY STORY: When Reading Page Headings
 *
 * When: User navigates to page and sees hierarchical heading structure
 *
 * User sees: Page title, section headings, subsections using h1-h4 variants
 *
 * Tests: Heading hierarchy, visual distinction between levels
 */
export const WhenReadingPageHeadings = {
  parameters: {
    description: 'Happy path: User sees page with hierarchical heading structure. Shows h1 through h4 variants used for page titles, sections, and subsections.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1 - Page Title</Typography>
      <Typography variant="h2">Heading 2 - Main Section</Typography>
      <Typography variant="h3">Heading 3 - Subsection</Typography>
      <Typography variant="h4">Heading 4 - Minor Heading</Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Reading Card Titles
 *
 * When: User views cards, panels, or sections with title text
 *
 * User sees: Title variants (title-lg, title-md, title-sm) for component headings
 *
 * Tests: Title sizing hierarchy, emphasis levels
 */
export const WhenReadingCardTitles = {
  parameters: {
    description: 'Component titles: User sees titles on cards, dialogs, and sections. Shows title-lg, title-md, and title-sm variants for different levels of emphasis.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="title-lg">Large Title - Card Header</Typography>
      <Typography variant="title-md">Medium Title - Dialog Title</Typography>
      <Typography variant="title-sm">Small Title - Section Label</Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Reading Body Content
 *
 * When: User reads regular text content in the application
 *
 * User sees: Body text variants for different content types and hierarchy
 *
 * Tests: Body text sizing, readability, hierarchy
 */
export const WhenReadingBodyContent = {
  parameters: {
    description: 'Body text: User reads regular content using body-lg, body-md, body-sm, and body-xs variants. Shows hierarchy from emphasized content to fine print.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="body-lg">Body Large - Emphasized content or important information</Typography>
      <Typography variant="body-md">Body Medium - Default body text for regular content</Typography>
      <Typography variant="body-sm">Body Small - Secondary information or metadata</Typography>
      <Typography variant="body-xs">Body Extra Small - Fine print, timestamps, or tertiary details</Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Seeing Status Messages
 *
 * When: User views success, warning, error, or informational messages
 *
 * User sees: Text colored based on message type for quick recognition
 *
 * Tests: Color variants for different message types
 */
export const WhenSeeingStatusMessages = {
  parameters: {
    description: 'Status colors: User sees color-coded text for different message types. Success (green), warning (yellow), danger (red), and other semantic colors.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography color="success">Success - Transaction processed successfully</Typography>
      <Typography color="warning">Warning - Account balance is low</Typography>
      <Typography color="danger">Danger - Invalid account number format</Typography>
      <Typography color="primary">Primary - Click here to view details</Typography>
      <Typography color="muted">Muted - Additional context or helper text</Typography>
      <Typography color="neutral">Neutral - Standard informational text</Typography>
      <Typography color="default">Default - Regular text color</Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Emphasizing Important Text
 *
 * When: User needs to distinguish text importance through font weight
 *
 * User sees: Text with varying font weights for emphasis and hierarchy
 *
 * Tests: Weight variants, visual emphasis
 */
export const WhenEmphasizingImportantText = {
  parameters: {
    description: 'Font weights: User sees text with different weights for emphasis. From normal to extrabold for varying levels of importance.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography weight="normal">Normal Weight - Regular content</Typography>
      <Typography weight="medium">Medium Weight - Subtle emphasis</Typography>
      <Typography weight="semibold">Semibold Weight - Labels and headings</Typography>
      <Typography weight="bold">Bold Weight - Strong emphasis</Typography>
      <Typography weight="extrabold">Extrabold Weight - Maximum emphasis</Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Viewing Items With Icons
 *
 * When: User sees text with accompanying icons for visual clarity
 *
 * User sees: Text with icons before (startDecorator) or after (endDecorator)
 *
 * Tests: Icon alignment, spacing, visual balance
 */
export const WhenViewingItemsWithIcons = {
  parameters: {
    description: 'Icons with text: User sees text paired with icons for visual context. Icons can appear before (startDecorator) or after (endDecorator) text. Common for status messages, menu items, and labeled actions.',
  },
  render: () => (
    <div className="space-y-4">
      <Typography
        variant="title-md"
        startDecorator={<User className="w-4 h-4" />}
      >
        User Profile
      </Typography>
      <Typography
        variant="body-sm"
        startDecorator={<Database className="w-4 h-4" />}
        color="muted"
      >
        Master Data Configuration
      </Typography>
      <Typography
        variant="body-md"
        startDecorator={<CheckCircle className="w-4 h-4" />}
        color="success"
      >
        Process Completed Successfully
      </Typography>
      <Typography
        variant="title-sm"
        endDecorator={<User className="w-4 h-4" />}
      >
        Current User
      </Typography>
      <Typography
        variant="title-sm"
        startDecorator={<User className="w-4 h-4" />}
        endDecorator={<CheckCircle className="w-4 h-4" />}
      >
        User Verified
      </Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Text Exceeds Container Width
 *
 * When: User views long text in constrained space (table cells, cards)
 *
 * User sees: Text truncated with ellipsis when it overflows container
 *
 * Tests: Text truncation, ellipsis display, title attribute for full text
 */
export const WhenTextExceedsContainerWidth = {
  parameters: {
    description: 'Text truncation: User sees long text truncated with ellipsis in space-constrained layouts. Common in table cells, card titles, and navigation items. Hover shows full text via title attribute.',
  },
  render: () => (
    <div className="w-64 space-y-4">
      <Typography variant="body-md" noWrap title="This is a very long text that should be truncated">
        This is a very long text that should be truncated when it exceeds the container width
      </Typography>
      <Typography
        variant="title-sm"
        startDecorator={<User className="w-4 h-4" />}
        noWrap
        title="Very Long User Name That Should Be Truncated"
      >
        Very Long User Name That Should Be Truncated
      </Typography>
    </div>
  ),
}

/**
 * USER JOURNEY STORY: When Viewing Account Details
 *
 * When: User views financial account information card
 *
 * User sees: Formatted account details using typography hierarchy and colors
 *
 * Tests: Real-world composition of typography variants, financial data display
 */
export const WhenViewingAccountDetails = {
  parameters: {
    description: 'Financial use case: User views account details card showing bank account information. Demonstrates typography hierarchy, colors, weights, and icons working together in real application context.',
  },
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="border rounded-lg p-4 space-y-3">
        <Typography variant="title-md" color="primary">
          Account: ICICI Bank Savings
        </Typography>
        <Typography
          variant="body-sm"
          startDecorator={<User className="w-4 h-4" />}
          color="muted"
        >
          Created by Alex Joseph
        </Typography>
        <Typography
          variant="body-sm"
          startDecorator={<Database className="w-4 h-4" />}
          color="muted"
        >
          Last Statement: January 2025
        </Typography>
        <Typography variant="body-lg" color="success" weight="semibold">
          ₹1,23,456.78 Balance
        </Typography>
        <Typography variant="body-xs" color="muted">
          Last updated: 2025-01-15 10:30 AM
        </Typography>
      </div>
    </div>
  ),
}