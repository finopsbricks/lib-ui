'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '../../primitives/input';
import { Label } from '../../primitives/label';
import { cn } from '../../lib/utils';

/**
 * Custom debounce hook
 * @param {any} value
 * @param {number} delay
 * @returns {any}
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * CronRawInput Component
 *
 * Text input for directly editing cron expressions.
 * Debounces input changes for better performance.
 *
 * @param {Object} props
 * @param {string} props.value - Current cron expression
 * @param {Function} props.onChange - Callback when cron changes
 * @param {boolean} [props.isValid=true] - Whether current expression is valid
 * @param {string} [props.validationError] - Validation error message
 * @param {string} [props.placeholder='0 9 * * *'] - Placeholder text
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showLabel=true] - Whether to show label
 * @returns {React.JSX.Element}
 *
 * @example
 * <CronRawInput
 *   value="0 9 * * 1-5"
 *   onChange={(cron) => setCronExpression(cron)}
 *   isValid={true}
 * />
 */
export default function CronRawInput({
  value,
  onChange,
  isValid = true,
  validationError,
  placeholder = '0 9 * * *',
  className,
  showLabel = true,
}) {
  // Local state for immediate UI feedback
  const [localValue, setLocalValue] = useState(value);

  // Debounce the onChange callback
  const debouncedValue = useDebounce(localValue, 300);

  // Sync local value with prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Trigger onChange when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <Label htmlFor="cron-raw-input" className="text-sm font-medium">
          Cron Expression
        </Label>
      )}

      <Input
        id="cron-raw-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'font-mono text-sm',
          !isValid && 'border-destructive focus-visible:ring-destructive'
        )}
        aria-invalid={!isValid}
        aria-describedby={validationError ? 'cron-error' : undefined}
      />

      {!isValid && validationError && (
        <p
          id="cron-error"
          className="text-sm text-destructive"
          role="alert"
        >
          {validationError}
        </p>
      )}

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Format: minute hour day month weekday</p>
        <p className="font-mono">
          Example: <code className="px-1 py-0.5 bg-muted rounded">0 9 * * 1-5</code> = Weekdays at 9am
        </p>
      </div>
    </div>
  );
}
