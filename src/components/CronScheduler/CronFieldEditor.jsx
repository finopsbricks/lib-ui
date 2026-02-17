'use client';

import React from 'react';
import { Label } from '../../primitives/label';
import { RadioGroup, RadioGroupItem } from '../../primitives/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../primitives/select';
import { Badge } from '../../primitives/badge';
import { cn } from '../../lib/utils';

// Field metadata
const FIELD_META = {
  minutes: {
    label: 'Minutes',
    min: 0,
    max: 59,
    commonIntervals: [5, 10, 15, 30],
    commonValues: [0, 15, 30, 45],
  },
  hours: {
    label: 'Hours',
    min: 0,
    max: 23,
    commonIntervals: [1, 2, 3, 6, 12],
    commonValues: [0, 6, 9, 12, 18],
    format12Hour: true,
  },
  days: {
    label: 'Days',
    min: 1,
    max: 31,
    commonValues: [1, 15],
  },
  months: {
    label: 'Months',
    min: 1,
    max: 12,
    names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  weekdays: {
    label: 'Weekdays',
    min: 0,
    max: 7,
    names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    commonRanges: [
      { label: 'Weekdays (Mon-Fri)', values: [1, 2, 3, 4, 5] },
      { label: 'Weekend (Sat-Sun)', values: [0, 6] },
    ],
  },
};

/**
 * CronFieldEditor Component
 *
 * Reusable editor for a single cron field (minutes, hours, days, months, weekdays).
 * Provides radio options for different modes and appropriate controls for each.
 *
 * @param {Object} props
 * @param {string} props.fieldType - Field type (minutes, hours, days, months, weekdays)
 * @param {Object} props.fieldConfig - Current field configuration
 * @param {Function} props.onChange - Callback when field changes
 *
 * @example
 * <CronFieldEditor
 *   fieldType="hours"
 *   fieldConfig={{ mode: 'specific', values: [9] }}
 *   onChange={(config) => updateField(config)}
 * />
 */
export default function CronFieldEditor({
  fieldType,
  fieldConfig,
  onChange,
}) {
  const meta = FIELD_META[fieldType];
  const { mode, values = [], step } = fieldConfig;

  // Handle mode change
  const handleModeChange = (newMode) => {
    if (newMode === 'every') {
      onChange({ mode: 'every', values: [] });
    } else if (newMode === 'interval') {
      onChange({ mode: 'interval', step: meta.commonIntervals?.[0] || 1, values: [] });
    } else if (newMode === 'specific') {
      // Set default value based on field type
      const defaultValue = meta.commonValues?.[0] || meta.min;
      onChange({ mode: 'specific', values: [defaultValue] });
    }
  };

  // Handle specific value change
  const handleSpecificChange = (value) => {
    const numValue = parseInt(value, 10);
    onChange({ mode: 'specific', values: [numValue] });
  };

  // Handle interval step change
  const handleIntervalChange = (value) => {
    const numValue = parseInt(value, 10);
    onChange({ mode: 'interval', step: numValue, values: [] });
  };

  // Handle multiple value toggle
  const handleMultipleToggle = (value) => {
    const numValue = parseInt(value, 10);
    const currentValues = values || [];

    if (currentValues.includes(numValue)) {
      // Remove value
      const newValues = currentValues.filter((v) => v !== numValue);
      if (newValues.length === 0) {
        // Don't allow empty selection - keep at least one
        return;
      }
      onChange({ mode: 'specific', values: newValues });
    } else {
      // Add value
      onChange({ mode: 'specific', values: [...currentValues, numValue] });
    }
  };

  // Format value for display (12-hour format for hours)
  const formatValue = (value) => {
    if (fieldType === 'hours' && meta.format12Hour) {
      if (value === 0) return '12 AM';
      if (value < 12) return `${value} AM`;
      if (value === 12) return '12 PM';
      return `${value - 12} PM`;
    }

    if (meta.names) {
      // For months, values are 1-12 but array is 0-indexed
      if (fieldType === 'months' && value >= 1 && value <= 12) {
        return meta.names[value - 1];
      }
      // For weekdays, values are 0-6 (and 7 for Sunday) - direct mapping
      if (fieldType === 'weekdays' && value >= 0 && value <= 6) {
        return meta.names[value];
      }
    }

    return value.toString();
  };

  // Get description of current selection
  const getSelectionDescription = () => {
    if (mode === 'every') {
      return `Every ${meta.label.toLowerCase()}`;
    }

    if (mode === 'interval') {
      return `Every ${step} ${meta.label.toLowerCase()}`;
    }

    if (mode === 'specific' && values.length > 0) {
      if (values.length === 1) {
        return `At ${formatValue(values[0])}`;
      }
      return `${values.length} ${meta.label.toLowerCase()} selected`;
    }

    return 'Select values';
  };

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <RadioGroup value={mode} onValueChange={handleModeChange}>
        <div className="space-y-2">
          {/* Every option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="every" id={`${fieldType}-every`} />
            <Label htmlFor={`${fieldType}-every`} className="font-normal cursor-pointer">
              Every {meta.label.toLowerCase()}
            </Label>
          </div>

          {/* Interval option (for minutes/hours) */}
          {meta.commonIntervals && (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="interval" id={`${fieldType}-interval`} />
              <Label htmlFor={`${fieldType}-interval`} className="font-normal cursor-pointer flex-1">
                Every N {meta.label.toLowerCase()}
              </Label>
              {mode === 'interval' && (
                <Select
                  value={step?.toString()}
                  onValueChange={handleIntervalChange}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {meta.commonIntervals.map((interval) => (
                      <SelectItem key={interval} value={interval.toString()}>
                        {interval}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Specific option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id={`${fieldType}-specific`} />
            <Label htmlFor={`${fieldType}-specific`} className="font-normal cursor-pointer">
              Specific {meta.label.toLowerCase()}
            </Label>
          </div>
        </div>
      </RadioGroup>

      {/* Specific value selector */}
      {mode === 'specific' && (
        <div className="space-y-2 pl-6">
          {/* Common ranges for weekdays */}
          {fieldType === 'weekdays' && meta.commonRanges && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Quick select:</p>
              <div className="flex gap-2">
                {meta.commonRanges.map((range) => {
                  const isActive = range.values.every((v) => values.includes(v)) &&
                    range.values.length === values.length;

                  return (
                    <Badge
                      key={range.label}
                      variant={isActive ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => onChange({ mode: 'specific', values: range.values })}
                    >
                      {range.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Multi-select badges for all field types */}
          {(fieldType === 'minutes' || fieldType === 'hours' || fieldType === 'days' || fieldType === 'months' || fieldType === 'weekdays') && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {values.length > 0 ? `Selected: ${values.length}` : 'Click to select'}
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                {Array.from({ length: meta.max - meta.min + 1 }, (_, i) => meta.min + i).map((value) => {
                  // Skip Sunday (7) for weekdays - 0 is already Sunday
                  if (fieldType === 'weekdays' && value === 7) return null;

                  const isSelected = values.includes(value);

                  return (
                    <Badge
                      key={value}
                      variant={isSelected ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleMultipleToggle(value.toString())}
                    >
                      {formatValue(value)}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current selection summary */}
      <div className="pt-2 border-t">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{meta.label}:</span> {getSelectionDescription()}
        </p>
      </div>
    </div>
  );
}
