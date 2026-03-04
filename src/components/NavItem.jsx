'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '../primitives/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../primitives/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover';

/**
 * @param {{
 *   item: { title: string, url: string, icon?: React.ComponentType, items?: Array },
 *   pathname: string
 * }} props
 */
export default function NavItem({ item, pathname }) {
  const { state } = useSidebar();
  const is_collapsed = state === "collapsed";
  const section_path = pathname.split('/').splice(0, 4).join('/');
  const is_section_active = section_path === item.url;

  if (item.items) {
    const is_expanded = pathname.startsWith(item.url + '/');

    if (is_collapsed) {
      return (
        <SidebarMenuItem>
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={is_section_active}
                className="w-full"
              >
                {item.icon && <item.icon size={16} />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-72 p-3">
              <div className="space-y-1">
                <div className="px-2 py-1 text-sm font-semibold text-foreground border-b border-border mb-2">
                  {item.title}
                </div>
                {item.items.map((sub_item) => (
                  <SubMenuPopoverItem key={sub_item.title} item={sub_item} pathname={pathname} />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      );
    }

    return (
      <Collapsible defaultOpen={is_expanded} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={is_section_active}
              className="w-full"
            >
              {item.icon && <item.icon size={16} />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((sub_item) => (
                <NavSubItem key={sub_item.title} item={sub_item} pathname={pathname} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title} isActive={is_section_active}>
        <Link href={item.url}>
          {item.icon && <item.icon size={16} />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/**
 * @param {{
 *   item: { title: string, url?: string, items?: Array },
 *   pathname: string
 * }} props
 */
export function NavSubItem({ item, pathname }) {
  if (item.items) {
    const is_expanded = item.url
      ? pathname.startsWith(item.url + '/')
      : item.items.some((i) => pathname === i.url);

    return (
      <Collapsible defaultOpen={is_expanded} className="group/collapsible">
        <SidebarMenuSubItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="w-full">
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((nested_item) => (
                <SidebarMenuSubItem key={nested_item.title}>
                  <SidebarMenuSubButton asChild isActive={pathname === nested_item.url}>
                    <Link href={nested_item.url}>
                      <span>{nested_item.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuSubItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={pathname === item.url}>
        <Link href={item.url}>
          <span>{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

/**
 * @param {{
 *   item: { title: string, url?: string, items?: Array },
 *   pathname: string
 * }} props
 */
export function SubMenuPopoverItem({ item, pathname }) {
  if (item.items) {
    const is_expanded = item.url
      ? pathname.startsWith(item.url + '/')
      : item.items.some((i) => pathname === i.url);

    return (
      <Collapsible defaultOpen={is_expanded} className="group/collapsible">
        <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md">
          <span>{item.title}</span>
          <ChevronRight className="h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-3 space-y-1 mt-1">
            {item.items.map((nested_item) => (
              <Link
                key={nested_item.title}
                href={nested_item.url}
                className={`block px-2 py-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
                  pathname === nested_item.url ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
              >
                {nested_item.title}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.url}
      className={`block px-2 py-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
        pathname === item.url ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
      }`}
    >
      {item.title}
    </Link>
  );
}
