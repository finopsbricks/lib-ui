import React from 'react';
import CronScheduler from './CronScheduler';

export default {
  title: 'Components/CronScheduler',
  component: CronScheduler,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `A comprehensive cron expression builder with three modes:

**Quick Presets** - 4 common schedules (hourly, daily, weekdays, weekly)
**Visual Builder** - Tab-based interface for each cron field (all fields support multi-select)
**Raw Input** - Direct cron expression editing with validation

Features timezone-aware preview with 3 display modes: configured timezone, browser timezone, and UTC.`,
      },
    },
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};

// Mock timezone
const mockTimezone = {
  name: 'America/Chicago',
};

/**
 * Default state - Daily at 9am
 */
export const Default = {
  args: {
    name: 'schedule',
    timezone: mockTimezone,
  },
};

/**
 * With existing schedule - Weekdays at 9am
 */
export const WeekdaySchedule = {
  args: {
    name: 'schedule',
    defaultValue: '0 9 * * 1-5',
    timezone: mockTimezone,
  },
};

/**
 * Hourly schedule
 */
export const HourlySchedule = {
  args: {
    name: 'schedule',
    defaultValue: '0 * * * *',
    timezone: mockTimezone,
  },
};

/**
 * Every 15 minutes
 */
export const Every15Minutes = {
  args: {
    name: 'schedule',
    defaultValue: '*/15 * * * *',
    timezone: mockTimezone,
  },
};

/**
 * Weekly - Monday at 9am
 */
export const WeeklyMonday = {
  args: {
    name: 'schedule',
    defaultValue: '0 9 * * 1',
    timezone: mockTimezone,
  },
};

/**
 * Different timezone - Los Angeles
 */
export const DifferentTimezone = {
  args: {
    name: 'schedule',
    defaultValue: '0 9 * * *',
    timezone: {
      name: 'America/Los_Angeles',
    },
  },
};

/**
 * Invalid expression - shows validation error
 */
export const InvalidExpression = {
  args: {
    name: 'schedule',
    defaultValue: 'invalid cron',
    timezone: mockTimezone,
  },
};

/**
 * Empty/cleared state
 */
export const EmptyState = {
  args: {
    name: 'schedule',
    defaultValue: '',
    timezone: mockTimezone,
  },
};

/**
 * Disabled state
 */
export const Disabled = {
  args: {
    name: 'schedule',
    defaultValue: '0 9 * * 1-5',
    timezone: mockTimezone,
    disabled: true,
  },
};

/**
 * Interactive demo - shows preset buttons in action
 */
export const InteractiveWithPresets = {
  render: (args) => {
    const [schedule, setSchedule] = React.useState('0 9 * * 1-5');

    return (
      <div className="max-w-md space-y-4">
        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm font-medium mb-1">Current Schedule:</p>
          <p className="text-sm font-mono text-muted-foreground">{schedule}</p>
        </div>

        <CronScheduler
          {...args}
          name="schedule"
          defaultValue={schedule}
          timezone={mockTimezone}
          onChange={(cron) => setSchedule(cron)}
        />

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Explore the 3-tab interface:</p>
          <p>• <strong>Quick Presets</strong> - Click preset buttons for common schedules</p>
          <p>• <strong>Visual Builder</strong> - Configure each time field with multi-select badges</p>
          <p>• <strong>Raw Input</strong> - Edit cron expression directly</p>
          <p>• <strong>Timezone Toggle</strong> - View next runs in configured/browser/UTC time</p>
        </div>
      </div>
    );
  },
};

/**
 * In a form context
 */
export const InForm = {
  render: (args) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      alert(`Submitted schedule: ${formData.get('schedule')}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label htmlFor="report-schedule" className="text-sm font-medium">
            Report Generation Schedule
          </label>
          <CronScheduler
            {...args}
            name="schedule"
            timezone={mockTimezone}
          />
          <p className="text-sm text-muted-foreground">
            Reports will be generated automatically based on this schedule.
            Use the preset buttons for quick setup.
          </p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          Save Schedule
        </button>
      </form>
    );
  },
  args: {
    defaultValue: '0 9 * * 1-5',
  },
};

/**
 * Multiple instances - different schedules
 */
export const MultipleInstances = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Daily Report</label>
          <CronScheduler
            name="daily-report"
            defaultValue="0 9 * * *"
            timezone={mockTimezone}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Weekly Summary</label>
          <CronScheduler
            name="weekly-summary"
            defaultValue="0 9 * * 1"
            timezone={mockTimezone}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hourly Sync</label>
          <CronScheduler
            name="hourly-sync"
            defaultValue="0 * * * *"
            timezone={mockTimezone}
          />
        </div>
      </div>
    );
  },
};
