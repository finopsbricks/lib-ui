/**
 * SettingsContainer Stories - User Journey Pattern
 *
 * A settings page: SettingsNavigation in columnOne, the page's content in columnTwo. From sm (640px) the
 * navigation sits beside the content; on phones it is a row of links above it.
 */
import { within, expect, waitFor } from 'storybook/test';
import SettingsContainer from './SettingsContainer';
import SettingsNavigation from './SettingsNavigation';
import { Button } from '../primitives/button';

const PHONE = { viewport: { value: 'iphone13', isRotated: false } }; // 390 wide

const NAV_ITEMS = [
  { label: 'General', path: 'settings' },
  { label: 'Members', path: 'settings/members' },
  { label: 'Mailboxes', path: 'settings/mailboxes' },
  { label: 'Google OAuth key', path: 'settings/google_oauth_key' },
  { label: 'Tags', path: 'settings/tags' },
  { label: 'API keys', path: 'settings/apikeys' },
  { label: 'Feature Flags', path: 'settings/feature_flags' },
];

const atPath = (path) => ({ nextjs: { navigation: { pathname: `/orgs/acme/${path}` } } });

function MailboxesContent() {
  return (
    <div className="flex flex-col gap-3" data-testid="settings-content">
      <div>
        <h2 className="text-lg font-semibold">Connected mailboxes</h2>
        <p className="text-sm text-muted-foreground">Client mailboxes your firm reads and replies from.</p>
      </div>
      <ul className="divide-y rounded-lg border">
        {['finance.and.payables@northwind-logistics-international.com', 'accounts@citara.org'].map((address) => (
          <li key={address} className="flex flex-col gap-2 p-4">
            <span className="truncate font-medium">{address}</span>
            <span className="text-sm text-muted-foreground">Google · Synced 5 minutes ago</span>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Rename</Button>
              <Button variant="outline" size="sm">Reconnect</Button>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'components/SettingsContainer',
  component: SettingsContainer,
  parameters: { layout: 'fullscreen', ...atPath('settings/mailboxes') },
  render: () => (
    <div className="p-3">
      <SettingsContainer
        columnOne={<SettingsNavigation params={{ o_id: 'acme' }} navItems={NAV_ITEMS} />}
        columnTwo={<MailboxesContent />}
      />
    </div>
  ),
};

export default meta;

const rects = (canvasElement) => {
  const canvas = within(canvasElement);
  return {
    nav: canvas.getByRole('navigation', { name: 'Settings' }).getBoundingClientRect(),
    content: canvas.getByTestId('settings-content').getBoundingClientRect(),
  };
};

/**
 * USER JOURNEY STORY 1: Desktop — the 192px navigation beside the content, the current page marked.
 */
export const OnDesktop = {
  play: async ({ canvasElement }) => {
    const { nav, content } = rects(canvasElement);
    await expect(nav.width).toBe(192);
    await expect(nav.right).toBeLessThan(content.left);
    await expect(Math.abs(nav.top - content.top)).toBeLessThan(2);
    await expect(within(canvasElement).getByRole('link', { name: 'Mailboxes' })).toHaveAttribute('aria-current', 'page');
  },
};

/**
 * USER JOURNEY STORY 2: Phone — the navigation is a row above the content, which gets the full width.
 */
export const OnPhone = {
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const { nav, content } = rects(canvasElement);
    await expect(nav.bottom).toBeLessThanOrEqual(content.top);
    await expect(content.width).toBeGreaterThan(350);
    // One row of links, not a list; the current page is already in view, so the row starts at the first link
    await expect(nav.height).toBeLessThan(48);
    const first = within(canvasElement).getByRole('link', { name: 'General' }).getBoundingClientRect();
    await expect(first.left).toBeGreaterThanOrEqual(nav.left);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
};

/**
 * USER JOURNEY STORY 3: Phone, on a page late in the list — the row scrolls so the current page is in view.
 */
export const OnPhoneLastItem = {
  globals: PHONE,
  parameters: atPath('settings/feature_flags'),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Settings' }).getBoundingClientRect();
    const current = canvas.getByRole('link', { name: 'Feature Flags' });
    await expect(current).toHaveAttribute('aria-current', 'page');
    await waitFor(async () => {
      const box = current.getBoundingClientRect();
      await expect(box.left).toBeGreaterThanOrEqual(nav.left);
      await expect(box.right).toBeLessThanOrEqual(nav.right);
    });
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
};

/**
 * USER JOURNEY STORY 4: One pixel below sm (639) — still the phone layout: the navigation row above the content.
 */
export const JustBelowSm = {
  globals: { viewport: { value: 'below_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const { nav, content } = rects(canvasElement);
    await expect(nav.bottom).toBeLessThanOrEqual(content.top);
    await expect(nav.height).toBeLessThan(48);
  },
};

/**
 * USER JOURNEY STORY 5: At sm (640), e.g. half a laptop screen — the 192px navigation beside the content.
 */
export const AtSm = {
  globals: { viewport: { value: 'at_sm', isRotated: false } },
  play: async ({ canvasElement }) => {
    const { nav, content } = rects(canvasElement);
    await expect(nav.width).toBe(192);
    await expect(nav.right).toBeLessThan(content.left);
    await expect(Math.abs(nav.top - content.top)).toBeLessThan(2);
  },
};
