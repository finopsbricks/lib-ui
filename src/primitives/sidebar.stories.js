/**
 * Sidebar Stories - User Journey Pattern
 *
 * The signed-in app shell: Sidebar (collapsible="icon") beside SidebarInset, with AppBreadcrumbs and a
 * settings page inside. From `sm` (640px) the sidebar is an icon rail beside the page; below 640 it is
 * a sheet opened from the trigger in the breadcrumb bar (design-standards components/app-sidebar › Phones).
 */
import { within, expect, userEvent, waitFor } from 'storybook/test';
import { Timer, CalendarDays, ChartColumn, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
} from './sidebar';
import NavItem from '../components/NavItem';
import AppBreadcrumbs from '../components/AppBreadcrumbs';
import SettingsContainer from '../components/SettingsContainer';
import SettingsNavigation from '../components/SettingsNavigation';

const PATHNAME = '/orgs/acme/settings/members';

const NAV = [
  { title: 'Timer', url: '/orgs/acme/timer', icon: Timer, slug: 'timer' },
  { title: 'Calendar', url: '/orgs/acme/calendar', icon: CalendarDays, slug: 'calendar' },
  { title: 'Analytics', url: '/orgs/acme/analytics', icon: ChartColumn, slug: 'analytics' },
  { title: 'Settings', url: '/orgs/acme/settings', icon: Settings, slug: 'settings' },
];

const SETTINGS_NAV = [
  { label: 'General', path: 'settings' },
  { label: 'Members', path: 'settings/members' },
  { label: 'Tags', path: 'settings/tags' },
  { label: 'API keys', path: 'settings/apikeys' },
];

const TRAIL = [
  { text: 'Orgs', href: '/orgs' },
  { text: 'Acme Consulting', href: '/orgs/acme' },
  { text: 'Settings', href: '/orgs/acme/settings' },
  { text: 'Members' },
];

function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map((item) => <NavItem key={item.slug} item={item} pathname={PATHNAME} />)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <AppBreadcrumbs breadcrumbs={TRAIL} />
        <div className="p-4">
          <SettingsContainer
            columnOne={<SettingsNavigation params={{ o_id: 'acme' }} navItems={SETTINGS_NAV} />}
            columnTwo={
              <div className="flex flex-col gap-2" data-testid="settings-content">
                <h2 className="text-lg font-semibold">Members</h2>
                <p className="text-sm text-muted-foreground">People who can sign in to Acme Consulting.</p>
              </div>
            }
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = {
  title: 'primitives/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: PATHNAME } } },
  render: () => <AppShell />,
};

export default meta;

const rail = (canvasElement) => canvasElement.querySelector('[data-slot="sidebar-container"]');

const expectSheet = async (canvasElement) => {
  await waitFor(() => expect(rail(canvasElement)).toBeNull());
  await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Toggle Sidebar' }));
  const sheet = await within(document.body).findByRole('dialog');
  await expect(within(sheet).getByRole('link', { name: 'Calendar' })).toBeVisible();
};

const expectRail = async (canvasElement) => {
  await waitFor(() => expect(rail(canvasElement)).toBeVisible());
  const inset = canvasElement.querySelector('[data-slot="sidebar-inset"]').getBoundingClientRect();
  await expect(rail(canvasElement).getBoundingClientRect().right).toBeLessThanOrEqual(inset.left + 1);
  await expect(within(canvasElement).queryByRole('dialog')).toBeNull();
  await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
};

/**
 * USER JOURNEY STORY 1: Phone (390) — no rail; the trigger opens the navigation as a sheet.
 */
export const OnPhone = {
  globals: { viewport: { value: 'iphone13', isRotated: false } },
  play: async ({ canvasElement }) => expectSheet(canvasElement),
};

/**
 * USER JOURNEY STORY 2: One pixel below sm (639) — still the phone shell: sheet, not rail.
 */
export const JustBelowSm = {
  globals: { viewport: { value: 'below_sm', isRotated: false } },
  play: async ({ canvasElement }) => expectSheet(canvasElement),
};

/**
 * USER JOURNEY STORY 3: At sm (640), e.g. half a laptop screen — the icon rail beside the page.
 */
export const AtSm = {
  globals: { viewport: { value: 'at_sm', isRotated: false } },
  play: async ({ canvasElement }) => expectRail(canvasElement),
};

/**
 * USER JOURNEY STORY 4: Desktop (1366) — the rail beside the page.
 */
export const OnDesktop = {
  play: async ({ canvasElement }) => expectRail(canvasElement),
};
