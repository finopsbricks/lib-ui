'use client';

import React from 'react';
import { Button } from '../../primitives/button';
import { Badge } from '../../primitives/badge';
import { cn } from '../../lib/utils';

/**
 * Common cron schedule presets
 */
const PRESETS = [
  {
    id: 'hourly',
    label: 'Every Hour',
    cron: '0 * * * *',
    description: 'At the start of every hour',
  },
  {
    id: 'daily',
    label: 'Daily at 9am',
    cron: '0 9 * * *',
    description: 'Once per day at 9:00 AM',
  },
  {
    id: 'weekdays',
    label: 'Weekdays at 9am',
    cron: '0 9 * * 1-5',
    description: 'Monday through Friday at 9:00 AM',
  },
  {
    id: 'weekly',
    label: 'Weekly Monday',
    cron: '0 9 * * 1',
    description: 'Every Monday at 9:00 AM',
  },
];

/**
 * CronPresetButtons Component
 *
 * Provides quick-select buttons for common cron schedules.
 * When clicked, replaces the entire cron expression with the preset.
 *
 * @param {Object} props
 * @param {string} props.currentCron - Current cron expression
 * @param {Function} props.onSelectPreset - Callback when preset is clicked
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <CronPresetButtons
 *   currentCron="0 9 * * *"
 *   onSelectPreset={(cron) => setCronExpression(cron)}
 * />
 */
export default function CronPresetButtons({
  currentCron,
  onSelectPreset,
  className,
}) {
  // Check if current cron matches a preset
  const isPresetActive = (presetCron) => {
    return currentCron?.trim() === presetCron;
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Quick Presets</p>
        <Badge variant="outline" className="text-xs">
          Common Schedules
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => {
          const isActive = isPresetActive(preset.cron);

          return (
            <Button
              key={preset.id}
              type="button"
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSelectPreset(preset.cron)}
              className={cn(
                'h-auto flex-col items-start gap-1 px-3 py-2',
                isActive && 'ring-2 ring-ring ring-offset-2'
              )}
            >
              <span className="font-medium text-sm">{preset.label}</span>
              <span className={cn(
                'text-xs font-normal',
                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
              )}>
                {preset.description}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Click a preset to quickly configure your schedule</span>
      </div>
    </div>
  );
}

/**
 * Export presets for testing and documentation
 */
export { PRESETS };
