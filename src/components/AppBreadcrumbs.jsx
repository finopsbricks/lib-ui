'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { SidebarTrigger } from '../primitives/sidebar';
import { Separator } from '../primitives/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../primitives/breadcrumb';

/**
 * The breadcrumb bar at the top of every signed-in page: the sidebar trigger, then the trail. From
 * `sm` (640px) up the trail shows every level. On phones a page below the top level shows one link back to
 * its parent instead (the page header names the current page), so a detail page has a way back up.
 * @param {{ breadcrumbs?: Array<{ text: React.ReactNode, href?: string }> }} props - Top level first; the last item is the current page
 * @returns {React.JSX.Element}
 */
export default function AppBreadcrumbs({ breadcrumbs = [] }) {
  const parent = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;
  return (
    <header className="sticky top-0 z-10 bg-background flex border-b h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb className="min-w-0">
          {parent && (
            <BreadcrumbLink
              href={parent.href || "#"}
              data-testid="breadcrumb-parent"
              className="-ml-1 flex min-h-9 min-w-0 items-center gap-1 pr-1 text-sm text-muted-foreground sm:hidden"
            >
              <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate"><span className="sr-only">Back to </span>{parent.text}</span>
            </BreadcrumbLink>
          )}
          <BreadcrumbList className={parent ? "hidden sm:flex" : undefined}>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              if (isLast) {
                return (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>
                  </BreadcrumbItem>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden sm:block">
                      <BreadcrumbLink href={breadcrumb.href || "#"}>
                        {breadcrumb.text}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:block" />
                  </React.Fragment>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
