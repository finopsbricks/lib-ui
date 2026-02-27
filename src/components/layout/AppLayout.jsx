'use client';

import { SidebarProvider, SidebarInset } from '@fob/lib-ui';

/**
 * App layout wrapper with sidebar support
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content
 * @param {React.ComponentType} props.sidebar - Sidebar component to render
 * @param {Object} [props.sidebarProps] - Props to pass to sidebar component
 * @returns {React.JSX.Element}
 */
export default function AppLayout({ children, sidebar: Sidebar, sidebarProps = {} }) {
  return (
    <SidebarProvider>
      {Sidebar && <Sidebar {...sidebarProps} />}
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
