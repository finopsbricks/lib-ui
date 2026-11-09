/**
 * Textarea Stories - User Journey Pattern
 *
 * 16px text below `sm` (640px) so iOS Safari doesn't zoom on focus; 14px from `sm` up.
 */
import { within, expect } from 'storybook/test';
import { Textarea } from './textarea';

const meta = {
  title: 'components/ui/textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
  args: { placeholder: 'What are you working on?' },
};

export default meta;

const fontSize = (canvasElement) =>
  getComputedStyle(within(canvasElement).getByPlaceholderText('What are you working on?')).fontSize;

/**
 * USER JOURNEY STORY 1: Writing a note on a phone (390) — 16px text.
 */
export const WritingOnPhone = {
  globals: { viewport: { value: 'iphone13', isRotated: false } },
  play: async ({ canvasElement }) => expect(fontSize(canvasElement)).toBe('16px'),
};

/**
 * USER JOURNEY STORY 2: One pixel below sm (639) — still 16px.
 */
export const WritingJustBelowSm = {
  globals: { viewport: { value: 'below_sm', isRotated: false } },
  play: async ({ canvasElement }) => expect(fontSize(canvasElement)).toBe('16px'),
};

/**
 * USER JOURNEY STORY 3: At sm (640) — 14px text.
 */
export const WritingAtSm = {
  globals: { viewport: { value: 'at_sm', isRotated: false } },
  play: async ({ canvasElement }) => expect(fontSize(canvasElement)).toBe('14px'),
};
