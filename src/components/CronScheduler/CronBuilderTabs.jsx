'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../primitives/tabs';
import { Clock, Hash, CalendarDays, CalendarRange } from 'lucide-react';
import { cn } from '../../lib/utils';
import CronFieldEditor from './CronFieldEditor';

/**
 * CronBuilderTabs Component
 *
 * Tab-based visual builder for editing each cron field.
 * Provides intuitive UI for constructing cron expressions without memorizing syntax.
 *
 * @param {Object} props
 * @param {Object} props.builderState - Current builder state
 * @param {Function} props.onStateChange - Callback when any field changes
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <CronBuilderTabs
 *   builderState={parsedCron}
 *   onStateChange={(newState) => updateCron(buildCronExpression(newState))}
 * />
 */
export default function CronBuilderTabs({
  builderState,
  onStateChange,
  className,
}) {
  // Handle field change
  const handleFieldChange = (fieldName, fieldConfig) => {
    const newState = {
      ...builderState,
      [fieldName]: fieldConfig,
    };
    onStateChange(newState);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Visual Builder</p>
        <p className="text-xs text-muted-foreground">
          Configure each time field
        </p>
      </div>

      <Tabs defaultValue="hours" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="minutes" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Min
          </TabsTrigger>
          <TabsTrigger value="hours" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Hour
          </TabsTrigger>
          <TabsTrigger value="days" className="text-xs">
            <Hash className="h-3 w-3 mr-1" />
            Day
          </TabsTrigger>
          <TabsTrigger value="months" className="text-xs">
            <CalendarDays className="h-3 w-3 mr-1" />
            Month
          </TabsTrigger>
          <TabsTrigger value="weekdays" className="text-xs">
            <CalendarRange className="h-3 w-3 mr-1" />
            DOW
          </TabsTrigger>
        </TabsList>

        <TabsContent value="minutes" className="space-y-3 mt-3">
          <CronFieldEditor
            fieldType="minutes"
            fieldConfig={builderState.minutes}
            onChange={(config) => handleFieldChange('minutes', config)}
          />
        </TabsContent>

        <TabsContent value="hours" className="space-y-3 mt-3">
          <CronFieldEditor
            fieldType="hours"
            fieldConfig={builderState.hours}
            onChange={(config) => handleFieldChange('hours', config)}
          />
        </TabsContent>

        <TabsContent value="days" className="space-y-3 mt-3">
          <CronFieldEditor
            fieldType="days"
            fieldConfig={builderState.days}
            onChange={(config) => handleFieldChange('days', config)}
          />
        </TabsContent>

        <TabsContent value="months" className="space-y-3 mt-3">
          <CronFieldEditor
            fieldType="months"
            fieldConfig={builderState.months}
            onChange={(config) => handleFieldChange('months', config)}
          />
        </TabsContent>

        <TabsContent value="weekdays" className="space-y-3 mt-3">
          <CronFieldEditor
            fieldType="weekdays"
            fieldConfig={builderState.weekdays}
            onChange={(config) => handleFieldChange('weekdays', config)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
