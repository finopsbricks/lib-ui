'use client';

import React from 'react';
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

export default function AppBreadcrumbs({ breadcrumbs = [] }) {
  return (
    <header className="sticky top-0 z-10 bg-background flex border-b h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
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
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={breadcrumb.href || "#"}>
                        {breadcrumb.text}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
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
