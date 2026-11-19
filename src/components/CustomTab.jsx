'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '../primitives/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../primitives/tabs';
import { cn } from '../lib/utils';

/**
 * Our implementation of tabs. This is the tab format that we will be using across the app.
 * The active tab is in the URL (`?tab=`); with no tab in the URL, the first tab is selected.
 * @param {Object} props
 * @param {Array<{ slug: string, name: React.ReactNode, body: React.ReactNode, stats?: number | string }>} props.tabs
 * @param {string} [props.variant] - visual variant; only 'plain' today
 * @param {string} [props.tabName] - the query parameter that holds the active tab
 * @param {boolean} [props.keepMounted] - render every panel once and hide the inactive ones, so their
 *   DOM and state (a loaded iframe, typed input) survive tab switches. Default: only the active panel is mounted.
 * @returns {React.JSX.Element}
 */
export default function CustomTab({tabs=[], variant='plain', tabName='tab', keepMounted=false}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get(tabName);
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get(tabName);
    if (tabParam) {
      const index = tabs.findIndex(tab => tab.slug === tabParam);
      return index !== -1 ? tabs[index].slug : (tabs[0]?.slug || '');
    }
    return tabs[0]?.slug || '';
  });

  // Follow the URL when its tab changes, including Back to a URL with no tab (the first tab).
  // Keyed on the param's value, not on `tabs`, which callers rebuild on every render.
  useEffect(() => {
    const tabExists = tabParam && tabs.find(tab => tab.slug === tabParam);
    setActiveTab(tabExists ? tabParam : (tabs[0]?.slug || ''));
  }, [tabParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(tabName, newValue);
    window.history.pushState(null, '', `?${newSearchParams.toString()}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full flex flex-col flex-1 min-h-0"
    >
      <div className="w-full border-b border-border bg-background">
        <TabsList
          className={cn(
            "h-auto bg-transparent p-0 justify-start rounded-none border-0",
            "overflow-x-auto flex-nowrap min-w-fit w-fit",
            "[-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.slug}
              value={tab.slug}
              className={cn(
                "relative rounded-none border-0 bg-transparent px-4 py-3",
                "text-sm font-medium text-muted-foreground transition-all",
                "hover:text-foreground focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[state=active]:text-foreground data-[state=active]:bg-transparent",
                "data-[state=active]:shadow-none",
                "sm:text-xs sm:px-3 sm:py-2",
                "flex items-center gap-2 whitespace-nowrap min-h-[40px]",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
                "after:bg-transparent after:transition-colors",
                "data-[state=active]:after:bg-primary"
              )}
            >
              {tab.name}
              {!isNaN(tab.stats) && (
                <Badge size='sm' variant='outline' className="ml-1">
                  {tab.stats}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.slug}
          value={tab.slug}
          forceMount={keepMounted || undefined}
          className={cn(
            "mt-0 bg-background flex-1 min-h-0 flex flex-col",
            keepMounted && "data-[state=inactive]:hidden",
          )}
        >
          {tab.body}
        </TabsContent>
      ))}
    </Tabs>
  )
}
