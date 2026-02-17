'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../../primitives/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../primitives/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../primitives/tabs';
import { cn } from '../../lib/utils';
import {
  validateCron,
  getCronDescription,
  getNextRuns,
  parseCronExpression,
  buildCronExpression,
  createDefaultState,
} from '../../utils/cron';
import CronPresetButtons from './CronPresetButtons';
import CronPreview from './CronPreview';
import CronRawInput from './CronRawInput';
import CronBuilderTabs from './CronBuilderTabs';

/**
 * CronScheduler Component
 *
 * A customizable cron expression builder with visual and raw input modes.
 * Outputs standard 5-field cron expressions with timezone awareness.
 *
 * @param {Object} props
 * @param {string} props.name - Form field name (required)
 * @param {string} [props.defaultValue] - Initial cron expression (5 fields)
 * @param {Object} props.timezone - Timezone object with .name property (required)
 * @param {Function} [props.onChange] - Callback when cron changes
 * @param {string} [props.placeholder] - Trigger button placeholder
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled] - Disable the component
 *
 * @example
 * <CronScheduler
 *   name="schedule"
 *   defaultValue="0 9 * * 1-5"
 *   timezone={{ name: 'America/Chicago' }}
 *   onChange={(cron) => console.log('New schedule:', cron)}
 * />
 */
export default function CronScheduler({
  name,
  defaultValue = '0 9 * * *',
  timezone,
  onChange,
  placeholder = 'Select schedule...',
  className,
  disabled = false,
}) {
  // Core state
  const [cronExpression, setCronExpression] = useState(defaultValue || '0 9 * * *');
  const [mode, setMode] = useState('presets'); // 'presets' | 'visual' | 'raw'
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Builder state (for visual mode)
  const [builderState, setBuilderState] = useState(() => {
    try {
      return parseCronExpression(defaultValue || '0 9 * * *');
    } catch (err) {
      return createDefaultState();
    }
  });

  // Validation state
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState(null);

  // Preview state
  const [humanReadable, setHumanReadable] = useState('');
  const [nextRuns, setNextRuns] = useState([]);

  // Refs to avoid infinite loops with onChange
  const onChangeRef = useRef(onChange);
  const isInitialMount = useRef(true);
  const lastNotifiedValue = useRef(defaultValue || '0 9 * * *');

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync with defaultValue changes
  useEffect(() => {
    if (defaultValue && defaultValue !== cronExpression) {
      setCronExpression(defaultValue);

      // Also update builder state
      try {
        const parsed = parseCronExpression(defaultValue);
        setBuilderState(parsed);
      } catch (err) {
        // Invalid expression, keep current builder state
        console.warn('Could not parse default value:', err);
      }
    }
  }, [defaultValue]);

  // Validate and update preview whenever cron changes
  useEffect(() => {
    if (!cronExpression) {
      setIsValid(false);
      setValidationError('Cron expression is required');
      setHumanReadable('');
      setNextRuns([]);
      return;
    }

    // Validate
    const validation = validateCron(cronExpression);
    setIsValid(validation.valid);
    setValidationError(validation.error);

    if (validation.valid) {
      // Generate human-readable description
      const description = getCronDescription(cronExpression);
      setHumanReadable(description);

      // Calculate next 5 runs in timezone
      if (timezone?.name) {
        const runs = getNextRuns(cronExpression, timezone, 5);
        setNextRuns(runs);
      }
    } else {
      setHumanReadable('');
      setNextRuns([]);
    }
  }, [cronExpression, timezone?.name]);

  // Notify parent of changes (only when user changes value, not on mount)
  useEffect(() => {
    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only notify if value actually changed and is valid
    if (onChangeRef.current && isValid && cronExpression !== lastNotifiedValue.current) {
      lastNotifiedValue.current = cronExpression;
      onChangeRef.current(cronExpression);
    }
  }, [cronExpression, isValid]);

  // Handle cron expression updates (from raw input or presets)
  const handleCronChange = (newExpression) => {
    setCronExpression(newExpression);

    // Try to sync builder state
    try {
      const parsed = parseCronExpression(newExpression);
      setBuilderState(parsed);
    } catch (err) {
      // Invalid or complex expression - keep current builder state
      console.warn('Could not parse expression for visual builder:', err);
    }
  };

  // Handle builder state changes (from visual builder)
  const handleBuilderStateChange = (newState) => {
    setBuilderState(newState);

    // Build cron expression from state
    try {
      const newExpression = buildCronExpression(newState);
      setCronExpression(newExpression);
    } catch (err) {
      console.error('Error building cron expression:', err);
    }
  };

  // Handle mode changes with validation
  const handleModeChange = (newMode) => {
    if (newMode === 'visual') {
      // Switching to visual - try to parse current cron
      try {
        const parsed = parseCronExpression(cronExpression);
        setBuilderState(parsed);
        setMode('visual');
      } catch (err) {
        // Can't parse - show error and stay in current mode
        alert('Current expression is too complex for visual builder. Please simplify or continue editing as raw text.');
        return; // Don't change mode
      }
    } else {
      // Presets or Raw mode - no validation needed
      setMode(newMode);
    }
  };

  // Clear schedule
  const handleClear = () => {
    setCronExpression(''); // Clear for manual-only execution
  };

  // Close popover
  const handleDone = () => {
    setPopoverOpen(false);
  };

  // Generate trigger button text
  const getTriggerText = () => {
    if (!isValid) {
      return 'Invalid schedule';
    }

    if (humanReadable) {
      return humanReadable;
    }

    return placeholder;
  };

  return (
    <>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={cronExpression}
        aria-invalid={!isValid}
      />

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal h-auto min-h-10 px-3 py-2',
              !isValid && 'border-destructive',
              !humanReadable && 'text-muted-foreground',
              className
            )}
          >
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate flex-1">{getTriggerText()}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[480px] p-0 max-h-[600px] overflow-y-auto"
          align="start"
        >
          <div className="flex flex-col">
            {/* 3-Tab Layout */}
            <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                <TabsTrigger value="presets">Quick Presets</TabsTrigger>
                <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                <TabsTrigger value="raw">Raw Input</TabsTrigger>
              </TabsList>

              {/* Quick Presets Tab */}
              <TabsContent value="presets" className="p-4 space-y-4 m-0">
                <CronPresetButtons
                  currentCron={cronExpression}
                  onSelectPreset={handleCronChange}
                />
              </TabsContent>

              {/* Visual Builder Tab */}
              <TabsContent value="visual" className="p-4 space-y-4 m-0">
                <CronBuilderTabs
                  builderState={builderState}
                  onStateChange={handleBuilderStateChange}
                />
              </TabsContent>

              {/* Raw Input Tab */}
              <TabsContent value="raw" className="p-4 space-y-4 m-0">
                <CronRawInput
                  value={cronExpression}
                  onChange={handleCronChange}
                  isValid={isValid}
                  validationError={validationError}
                />
              </TabsContent>
            </Tabs>

            {/* Preview Section - Full width separator */}
            <div className="border-t">
              <div className="px-4 py-4 space-y-3">
                <h3 className="text-sm font-semibold">Preview</h3>
                <CronPreview
                  isValid={isValid}
                  validationError={validationError}
                  humanReadable={humanReadable}
                  nextRuns={nextRuns}
                  timezone={timezone}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleDone}
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
