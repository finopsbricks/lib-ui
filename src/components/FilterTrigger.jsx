// @ts-check
"use client";
import { Button, Badge, cn } from '@fob/lib-ui';
import { Filter, ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether filter panel is open
 * @param {() => void} props.onClick - Click handler for toggle button
 * @param {number} [props.applied_filters_count=0] - Number of applied filters
 * @param {'mobile' | 'desktop' | 'collapsed'} [props.variant='desktop'] - Display variant
 * @param {string} [props.className] - Optional additional CSS classes
 * @returns {React.JSX.Element}
 */
export function FilterTrigger({
  isOpen,
  onClick,
  applied_filters_count = 0,
  variant = "desktop",
  className
}) {
  const has_applied_filters = applied_filters_count > 0;

  if (variant === "mobile") {
    return (
      <Button
        onClick={onClick}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40",
          "bg-primary hover:bg-primary/90",
          has_applied_filters && "bg-blue-600 hover:bg-blue-700",
          className
        )}
        size="icon"
        data-testid="fold-filter-toggle"
      >
        <div className="relative">
          <Filter className="h-5 w-5" />
          {has_applied_filters && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {applied_filters_count}
            </Badge>
          )}
        </div>
      </Button>
    );
  }

  // Desktop collapsed trigger
  if (variant === "collapsed") {
    return (
      <div className={cn("h-full min-h-[400px] flex flex-col items-center", className)}>
        <Button
          variant="outline"
          onClick={onClick}
          size="icon"
          className={cn(
            "h-12 w-12 relative",
            has_applied_filters && "border-primary bg-primary/5"
          )}
          data-testid="fold-filter-toggle"
        >
          <ChevronRight className="h-5 w-5" data-testid="ChevronRightIcon" />
          {has_applied_filters && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {applied_filters_count}
            </Badge>
          )}
        </Button>
        <div className={"text-sm text-muted-foreground pt-1"}>Filter</div>
      </div>
    );
  }

  // Desktop expanded collapse button
  return (
    <div className={cn("flex justify-end", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        className="h-8 w-8"
        data-testid="fold-filter-toggle"
      >
        <ChevronLeft className="h-4 w-4" data-testid="ChevronLeftIcon" />
      </Button>
    </div>
  );
}