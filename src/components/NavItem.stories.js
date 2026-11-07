/**
 * NavItem Stories — User Journey Pattern
 *
 * These stories represent real user scenarios.
 * Each story answers: "When/why does a user see this component in this state?"
 *
 * NavItem renders sidebar navigation links with support for collapsible sub-menus
 * and popover menus when the sidebar is collapsed.
 *
 * Stories:
 * - WhenViewingSimpleLink: A basic nav item without sub-items
 * - WhenViewingSectionWithSubItems: A nav item with expandable sub-items
 */
import { within, expect, userEvent, waitFor } from 'storybook/test';
import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '../primitives/sidebar';
import { LayoutDashboard, BarChart3 } from 'lucide-react';
import NavItem from './NavItem';

export default {
  title: 'components/NavItem',
  component: NavItem,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Story />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset><div className="p-3"><SidebarTrigger /></div></SidebarInset>
      </SidebarProvider>
    ),
  ],
};

export const WhenViewingSimpleLink = {
  args: {
    item: {
      title: 'Overview',
      url: '/orgs/abc123/overview',
      icon: LayoutDashboard,
      slug: 'overview',
    },
    pathname: '/orgs/abc123/overview',
  },
};

export const WhenViewingSectionWithSubItems = {
  args: {
    item: {
      title: 'Reports',
      url: '/orgs/abc123/reports',
      icon: BarChart3,
      slug: 'reports',
      items: [
        { title: 'Daily Cash Position', url: '/orgs/abc123/reports/balance' },
        { title: 'Data Coverage', url: '/orgs/abc123/reports/data-coverage' },
        { title: 'Cashflow', url: '/orgs/abc123/reports/cashflow' },
      ],
    },
    pathname: '/orgs/abc123/reports/balance',
  },
};

const PHONE = { viewport: { value: 'iphone13', isRotated: false } }; // 390 wide

/**
 * Open the phone sheet from the trigger and return it. Link clicks are kept from navigating the
 * Storybook frame; NavItem's own click handler still runs.
 */
const openSheet = async (canvasElement) => {
  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) event.preventDefault();
  }, { capture: true });
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Toggle Sidebar' }));
  return within(document.body).findByRole('dialog');
};

/**
 * On a phone the sidebar is a sheet over the page: picking a link closes it, so the new page shows.
 */
export const OnPhoneLinkClosesSheet = {
  args: WhenViewingSimpleLink.args,
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const sheet = await openSheet(canvasElement);
    await userEvent.click(await within(sheet).findByRole('link', { name: 'Overview' }));
    await waitFor(() => expect(within(document.body).queryByRole('dialog')).toBeNull());
  },
};

/** The same for a link inside an expanded section. */
export const OnPhoneSubItemClosesSheet = {
  args: WhenViewingSectionWithSubItems.args,
  globals: PHONE,
  play: async ({ canvasElement }) => {
    const sheet = await openSheet(canvasElement);
    await userEvent.click(await within(sheet).findByRole('link', { name: 'Cashflow' }));
    await waitFor(() => expect(within(document.body).queryByRole('dialog')).toBeNull());
  },
};
