/**
 * Calendar Stories - User Journey Pattern
 *
 * Two months (e.g. picking a date range) sit side by side from `sm` (640px) and stack below it.
 */
import { expect } from 'storybook/test';
import { Calendar } from './calendar';

const meta = {
  title: 'primitives/Calendar',
  component: Calendar,
  parameters: { layout: 'fullscreen' },
  args: { mode: 'range', numberOfMonths: 2, defaultMonth: new Date(2026, 9, 1) },
};

export default meta;

const monthRects = (canvasElement) =>
  [...canvasElement.querySelectorAll('.rdp-month')].map((month) => month.getBoundingClientRect());

/**
 * USER JOURNEY STORY 1: Picking a range on a phone (390) — the two months stack.
 */
export const TwoMonthsOnPhone = {
  globals: { viewport: { value: 'iphone13', isRotated: false } },
  play: async ({ canvasElement }) => {
    const [first, second] = monthRects(canvasElement);
    await expect(second.top).toBeGreaterThanOrEqual(first.bottom);
  },
};

/**
 * USER JOURNEY STORY 2: One pixel below sm (639) — the two months still stack.
 */
export const TwoMonthsJustBelowSm = {
  globals: { viewport: { value: 'below_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const [first, second] = monthRects(canvasElement);
    await expect(second.top).toBeGreaterThanOrEqual(first.bottom);
  },
};

/**
 * USER JOURNEY STORY 3: At sm (640) — the two months fit side by side.
 */
export const TwoMonthsAtSm = {
  globals: { viewport: { value: 'at_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const [first, second] = monthRects(canvasElement);
    await expect(second.left).toBeGreaterThanOrEqual(first.right);
    await expect(Math.abs(second.top - first.top)).toBeLessThan(2);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
};
