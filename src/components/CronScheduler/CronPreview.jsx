'use client';

import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '../../primitives/badge';
import { Alert, AlertDescription, AlertTitle } from '../../primitives/alert';
import { RadioGroup, RadioGroupItem } from '../../primitives/radio-group';
import { cn } from '../../lib/utils';
import { formatDateInTimezone } from '../../utils/cron';

/**
 * CronPreview Component
 *
 * Displays human-readable description and next execution times for a cron expression.
 * Shows validation errors if the expression is invalid.
 *
 * @param {Object} props
 * @param {boolean} props.isValid - Whether the cron expression is valid
 * @param {string} [props.validationError] - Validation error message
 * @param {string} [props.humanReadable] - Human-readable cron description
 * @param {Date[]} props.nextRuns - Array of next execution dates
 * @param {Object} props.timezone - Timezone object with .name property
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <CronPreview
 *   isValid={true}
 *   humanReadable="At 9:00 AM, Monday through Friday"
 *   nextRuns={[date1, date2, date3]}
 *   timezone={{ name: 'America/Chicago' }}
 * />
 */
export default function CronPreview({
  isValid,
  validationError,
  humanReadable,
  nextRuns = [],
  timezone,
  className,
}) {
  // Timezone display mode: 'plant' | 'browser' | 'utc'
  const [timezoneMode, setTimezoneMode] = useState('plant');

  // Format date based on timezone mode
  const formatRunDate = (date) => {
    const formatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    if (timezoneMode === 'utc') {
      // Show in UTC timezone
      return date.toLocaleString('en-US', {
        ...formatOptions,
        timeZone: 'UTC',
        timeZoneName: 'short',
      });
    }

    if (timezoneMode === 'browser') {
      // Use browser's local timezone (no timeZone specified)
      return date.toLocaleString('en-US', formatOptions);
    }

    // Plant timezone (default)
    return formatDateInTimezone(date, timezone, formatOptions);
  };

  // Show error state
  if (!isValid && validationError) {
    return (
      <Alert variant="destructive" className={cn('', className)}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Invalid Expression</AlertTitle>
        <AlertDescription className="text-sm">
          {validationError}
        </AlertDescription>
      </Alert>
    );
  }

  // Show valid preview
  if (isValid && (humanReadable || nextRuns.length > 0)) {
    return (
      <div className={cn('space-y-3', className)}>
        {/* Human-readable description */}
        {humanReadable && (
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium">Schedule: </span>
              <span className="text-muted-foreground">{humanReadable}</span>
            </div>
          </div>
        )}

        {/* Timezone badge */}
        {timezone?.name && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Timezone:</span>
            <Badge variant="outline" className="text-xs font-mono">
              {timezone.name}
            </Badge>
          </div>
        )}

        {/* Next runs */}
        {nextRuns.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Next {nextRuns.length} runs:</p>
              <RadioGroup
                value={timezoneMode}
                onValueChange={setTimezoneMode}
                className="flex gap-2"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="plant" id="tz-plant" className="h-3 w-3" />
                  <label htmlFor="tz-plant" className="text-xs text-muted-foreground cursor-pointer">
                    Configured
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="browser" id="tz-browser" className="h-3 w-3" />
                  <label htmlFor="tz-browser" className="text-xs text-muted-foreground cursor-pointer">
                    Browser
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="utc" id="tz-utc" className="h-3 w-3" />
                  <label htmlFor="tz-utc" className="text-xs text-muted-foreground cursor-pointer">
                    UTC
                  </label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-1 pl-6">
              {nextRuns.map((run, idx) => {
                const formattedDate = formatRunDate(run);

                return (
                  <div
                    key={idx}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-xs text-muted-foreground">•</span>
                    <span>{formattedDate}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  return null;
}
