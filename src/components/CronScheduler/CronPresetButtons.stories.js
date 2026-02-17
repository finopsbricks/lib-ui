import React, { useState } from 'react';
import CronPresetButtons, { PRESETS } from './CronPresetButtons';

export default {
  title: 'Components/CronScheduler/CronPresetButtons',
  component: CronPresetButtons,
  parameters: {
    layout: 'padded',
  },
};

/**
 * Default state - no preset selected
 */
export const Default = {
  render: () => {
    const [cron, setCron] = useState('0 9 * * *');

    return (
      <div className="max-w-md space-y-4">
        <CronPresetButtons
          currentCron={cron}
          onSelectPreset={setCron}
        />

        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm font-medium mb-1">Selected Cron:</p>
          <p className="text-sm font-mono text-muted-foreground">{cron}</p>
        </div>
      </div>
    );
  },
};

/**
 * With hourly preset active
 */
export const HourlyPresetActive = {
  render: () => {
    const [cron, setCron] = useState('0 * * * *');

    return (
      <div className="max-w-md space-y-4">
        <CronPresetButtons
          currentCron={cron}
          onSelectPreset={setCron}
        />

        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm font-medium mb-1">Selected Cron:</p>
          <p className="text-sm font-mono text-muted-foreground">{cron}</p>
        </div>
      </div>
    );
  },
};

/**
 * With weekdays preset active
 */
export const WeekdaysPresetActive = {
  render: () => {
    const [cron, setCron] = useState('0 9 * * 1-5');

    return (
      <div className="max-w-md space-y-4">
        <CronPresetButtons
          currentCron={cron}
          onSelectPreset={setCron}
        />

        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm font-medium mb-1">Selected Cron:</p>
          <p className="text-sm font-mono text-muted-foreground">{cron}</p>
        </div>
      </div>
    );
  },
};

/**
 * Interactive demo with all presets
 */
export const InteractiveDemo = {
  render: () => {
    const [cron, setCron] = useState('0 9 * * *');

    return (
      <div className="max-w-md space-y-4">
        <div className="p-4 border rounded-md bg-muted/50 space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Current Schedule:</p>
            <p className="text-sm font-mono text-muted-foreground">{cron}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Click any preset below to change the schedule
            </p>
          </div>
        </div>

        <CronPresetButtons
          currentCron={cron}
          onSelectPreset={setCron}
        />

        <div className="p-4 border rounded-md space-y-2">
          <p className="text-sm font-medium">Available Presets:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {PRESETS.map((preset) => (
              <li key={preset.id} className="flex items-start gap-2">
                <span>•</span>
                <span>
                  <strong className="font-medium">{preset.label}:</strong> {preset.description}
                  <code className="ml-2 px-1 py-0.5 bg-muted rounded text-[10px]">
                    {preset.cron}
                  </code>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};
