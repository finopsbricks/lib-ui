import React, { useState } from 'react';
import CronBuilderTabs from './CronBuilderTabs';
import { createDefaultState } from '../../utils/cron/buildCronExpression';

export default {
  title: 'Components/CronScheduler/CronBuilderTabs',
  component: CronBuilderTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tab-based visual builder for editing cron expressions. Provides intuitive UI for constructing schedules without memorizing cron syntax.',
      },
    },
  },
  tags: ['autodocs'],
};

// Default state (Daily at 9am)
const defaultState = createDefaultState();

// Wrapper component to handle state
function InteractiveWrapper({ initialState }) {
  const [builderState, setBuilderState] = useState(initialState);

  return (
    <div className="w-[480px] p-4 border rounded-lg bg-background">
      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium">Current State:</p>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
          {JSON.stringify(builderState, null, 2)}
        </pre>
      </div>
      <CronBuilderTabs
        builderState={builderState}
        onStateChange={setBuilderState}
      />
    </div>
  );
}

export const Default = {
  render: () => <InteractiveWrapper initialState={defaultState} />,
  parameters: {
    docs: {
      description: {
        story: 'Default state showing daily schedule at 9:00 AM. Try switching between tabs to configure different time fields.',
      },
    },
  },
};

export const HourlySchedule = {
  render: () => {
    const hourlyState = {
      minutes: { mode: 'specific', values: [0] },
      hours: { mode: 'every', values: [] },
      days: { mode: 'every', values: [] },
      months: { mode: 'every', values: [] },
      weekdays: { mode: 'every', values: [] },
    };
    return <InteractiveWrapper initialState={hourlyState} />;
  },
};

export const WeekdaySchedule = {
  render: () => {
    const weekdayState = {
      minutes: { mode: 'specific', values: [0] },
      hours: { mode: 'specific', values: [9] },
      days: { mode: 'every', values: [] },
      months: { mode: 'every', values: [] },
      weekdays: { mode: 'specific', values: [1, 2, 3, 4, 5] },
    };
    return <InteractiveWrapper initialState={weekdayState} />;
  },
};

export const IntervalSchedule = {
  render: () => {
    const intervalState = {
      minutes: { mode: 'interval', step: 15, values: [] },
      hours: { mode: 'every', values: [] },
      days: { mode: 'every', values: [] },
      months: { mode: 'every', values: [] },
      weekdays: { mode: 'every', values: [] },
    };
    return <InteractiveWrapper initialState={intervalState} />;
  },
};

export const InteractiveDemo = {
  render: () => {
    const [builderState, setBuilderState] = useState(defaultState);
    const [cronExpression, setCronExpression] = useState('0 9 * * *');

    const handleStateChange = (newState) => {
      setBuilderState(newState);
      const { minutes, hours, days, months, weekdays } = newState;

      const buildField = (config) => {
        if (config.mode === 'every') return '*';
        if (config.mode === 'interval') return `*/${config.step}`;
        if (config.mode === 'specific') {
          const sorted = [...config.values].sort((a, b) => a - b);
          return sorted.join(',');
        }
        return '*';
      };

      const parts = [
        buildField(minutes),
        buildField(hours),
        buildField(days),
        buildField(months),
        buildField(weekdays),
      ];

      setCronExpression(parts.join(' '));
    };

    return (
      <div className="w-[600px] space-y-4">
        <div className="p-4 border rounded-lg bg-muted">
          <h3 className="font-semibold mb-2">Generated Cron Expression:</h3>
          <code className="text-lg font-mono bg-background px-3 py-2 rounded border">
            {cronExpression}
          </code>
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <CronBuilderTabs
            builderState={builderState}
            onStateChange={handleStateChange}
          />
        </div>
      </div>
    );
  },
};
