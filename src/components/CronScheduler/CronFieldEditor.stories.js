import React, { useState } from 'react';
import CronFieldEditor from './CronFieldEditor';

export default {
  title: 'Components/CronScheduler/CronFieldEditor',
  component: CronFieldEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reusable editor for individual cron fields (minutes, hours, days, months, weekdays). Provides mode selection (every/interval/specific) and appropriate controls for each field type.',
      },
    },
  },
  tags: ['autodocs'],
};

// Wrapper component to handle state
function InteractiveWrapper({ fieldType, initialConfig }) {
  const [fieldConfig, setFieldConfig] = useState(initialConfig);

  return (
    <div className="w-[480px] p-4 border rounded-lg bg-background">
      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium">Field Type: {fieldType}</p>
        <p className="text-sm font-medium">Current Config:</p>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
          {JSON.stringify(fieldConfig, null, 2)}
        </pre>
      </div>
      <CronFieldEditor
        fieldType={fieldType}
        fieldConfig={fieldConfig}
        onChange={setFieldConfig}
      />
    </div>
  );
}

// Minutes
export const MinutesEvery = {
  render: () => (
    <InteractiveWrapper
      fieldType="minutes"
      initialConfig={{ mode: 'every', values: [] }}
    />
  ),
};

export const MinutesInterval = {
  render: () => (
    <InteractiveWrapper
      fieldType="minutes"
      initialConfig={{ mode: 'interval', step: 15, values: [] }}
    />
  ),
};

export const MinutesSpecific = {
  render: () => (
    <InteractiveWrapper
      fieldType="minutes"
      initialConfig={{ mode: 'specific', values: [0, 15, 30, 45] }}
    />
  ),
};

// Hours
export const HoursEvery = {
  render: () => (
    <InteractiveWrapper
      fieldType="hours"
      initialConfig={{ mode: 'every', values: [] }}
    />
  ),
};

export const HoursSpecific = {
  render: () => (
    <InteractiveWrapper
      fieldType="hours"
      initialConfig={{ mode: 'specific', values: [9] }}
    />
  ),
};

// Weekdays
export const WeekdaysEvery = {
  render: () => (
    <InteractiveWrapper
      fieldType="weekdays"
      initialConfig={{ mode: 'every', values: [] }}
    />
  ),
};

export const WeekdaysWeekdaysOnly = {
  render: () => (
    <InteractiveWrapper
      fieldType="weekdays"
      initialConfig={{ mode: 'specific', values: [1, 2, 3, 4, 5] }}
    />
  ),
};

export const WeekdaysWeekendOnly = {
  render: () => (
    <InteractiveWrapper
      fieldType="weekdays"
      initialConfig={{ mode: 'specific', values: [0, 6] }}
    />
  ),
};

// Months
export const MonthsQuarterly = {
  render: () => (
    <InteractiveWrapper
      fieldType="months"
      initialConfig={{ mode: 'specific', values: [1, 4, 7, 10] }}
    />
  ),
};

// Interactive Demo
export const InteractiveDemo = {
  render: () => {
    const [selectedField, setSelectedField] = useState('hours');
    const [configs, setConfigs] = useState({
      minutes: { mode: 'specific', values: [0] },
      hours: { mode: 'specific', values: [9] },
      days: { mode: 'every', values: [] },
      months: { mode: 'every', values: [] },
      weekdays: { mode: 'specific', values: [1, 2, 3, 4, 5] },
    });

    const handleFieldChange = (newConfig) => {
      setConfigs({
        ...configs,
        [selectedField]: newConfig,
      });
    };

    const buildCronString = () => {
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
        buildField(configs.minutes),
        buildField(configs.hours),
        buildField(configs.days),
        buildField(configs.months),
        buildField(configs.weekdays),
      ];

      return parts.join(' ');
    };

    return (
      <div className="w-[600px] space-y-4">
        <div className="p-4 border rounded-lg bg-muted">
          <h3 className="font-semibold mb-2">Generated Cron Expression:</h3>
          <code className="text-lg font-mono bg-background px-3 py-2 rounded border">
            {buildCronString()}
          </code>
        </div>

        <div className="flex gap-2">
          {['minutes', 'hours', 'days', 'months', 'weekdays'].map((field) => (
            <button
              key={field}
              onClick={() => setSelectedField(field)}
              className={`px-3 py-2 text-sm rounded border transition-colors ${
                selectedField === field
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted border-border'
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <CronFieldEditor
            fieldType={selectedField}
            fieldConfig={configs[selectedField]}
            onChange={handleFieldChange}
          />
        </div>
      </div>
    );
  },
};
