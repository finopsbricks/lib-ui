/**
 * Pagination Stories - User Journey Pattern
 */

import Pagination from './Pagination';

export default {
  title: 'components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pageCount: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages available for navigation',
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Current page number (overrides URL-based page detection)',
    },
  },
};

/**
 * USER JOURNEY STORY 1: On Middle Page
 */
export const OnMiddlePage = {
  args: {
    pageCount: 10,
    currentPage: 3,
  },
};

/**
 * USER JOURNEY STORY 2: On First Page
 */
export const OnFirstPage = {
  args: {
    pageCount: 10,
    currentPage: 1,
  },
};

/**
 * USER JOURNEY STORY 3: On Last Page
 */
export const OnLastPage = {
  args: {
    pageCount: 10,
    currentPage: 10,
  },
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    pageCount: 20,
    currentPage: 5,
  },
};
