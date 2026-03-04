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
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '../primitives/sidebar';
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
