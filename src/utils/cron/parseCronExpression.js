/**
 * Parse a cron expression into structured builder state
 *
 * Converts a 5-field cron expression into an object structure
 * suitable for visual builder editing.
 *
 * @param {string} expression - Cron expression (5 fields: minute hour day month weekday)
 * @returns {Object} Parsed cron state
 *
 * @example
 * parseCronExpression('0 9 * * 1-5');
 * // Returns:
 * // {
 * //   minutes: { mode: 'specific', values: [0] },
 * //   hours: { mode: 'specific', values: [9] },
 * //   days: { mode: 'every', values: [] },
 * //   months: { mode: 'every', values: [] },
 * //   weekdays: { mode: 'range', values: [1, 2, 3, 4, 5] }
 * // }
 */
export function parseCronExpression(expression) {
  if (!expression || typeof expression !== 'string') {
    throw new Error('Invalid cron expression');
  }

  const fields = expression.trim().split(/\s+/);

  if (fields.length !== 5) {
    throw new Error('Cron expression must have exactly 5 fields');
  }

  const [minuteStr, hourStr, dayStr, monthStr, weekdayStr] = fields;

  return {
    minutes: parseField(minuteStr, 0, 59),
    hours: parseField(hourStr, 0, 23),
    days: parseField(dayStr, 1, 31),
    months: parseField(monthStr, 1, 12),
    weekdays: parseField(weekdayStr, 0, 7), // 0 and 7 are both Sunday
  };
}

/**
 * Parse a single cron field
 *
 * @private
 * @param {string} field - Cron field string
 * @param {number} min - Minimum valid value
 * @param {number} max - Maximum valid value
 * @returns {Object} Parsed field with mode and values
 */
function parseField(field, min, max) {
  // Wildcard - "every"
  if (field === '*') {
    return { mode: 'every', values: [] };
  }

  // Interval - "*/5" or "*/15"
  if (field.startsWith('*/')) {
    const step = parseInt(field.slice(2), 10);
    if (isNaN(step) || step <= 0) {
      throw new Error(`Invalid interval: ${field}`);
    }
    return { mode: 'interval', step, values: [] };
  }

  // Range - "1-5" or "9-17"
  if (field.includes('-') && !field.includes(',')) {
    const [start, end] = field.split('-').map(v => parseInt(v, 10));

    if (isNaN(start) || isNaN(end)) {
      throw new Error(`Invalid range: ${field}`);
    }

    if (start < min || end > max || start > end) {
      throw new Error(`Range out of bounds: ${field}`);
    }

    // Expand range to array of values
    const values = [];
    for (let i = start; i <= end; i++) {
      values.push(i);
    }

    return { mode: 'specific', values };
  }

  // List - "1,3,5" or "0,15,30,45"
  if (field.includes(',')) {
    const values = field.split(',').map(v => {
      const num = parseInt(v.trim(), 10);
      if (isNaN(num) || num < min || num > max) {
        throw new Error(`Invalid value in list: ${v}`);
      }
      return num;
    });

    return { mode: 'specific', values };
  }

  // Single value - "9" or "1"
  const value = parseInt(field, 10);
  if (isNaN(value) || value < min || value > max) {
    throw new Error(`Invalid value: ${field}`);
  }

  return { mode: 'specific', values: [value] };
}

/**
 * Check if a parsed cron state represents a common preset
 *
 * @param {Object} parsed - Parsed cron state
 * @returns {string|null} Preset ID or null
 */
export function detectPreset(parsed) {
  const { minutes, hours, days, months, weekdays } = parsed;

  // Every hour - "0 * * * *"
  if (
    minutes.mode === 'specific' &&
    minutes.values.length === 1 &&
    minutes.values[0] === 0 &&
    hours.mode === 'every' &&
    days.mode === 'every' &&
    months.mode === 'every' &&
    weekdays.mode === 'every'
  ) {
    return 'hourly';
  }

  // Daily at 9am - "0 9 * * *"
  if (
    minutes.mode === 'specific' &&
    minutes.values.length === 1 &&
    minutes.values[0] === 0 &&
    hours.mode === 'specific' &&
    hours.values.length === 1 &&
    hours.values[0] === 9 &&
    days.mode === 'every' &&
    months.mode === 'every' &&
    weekdays.mode === 'every'
  ) {
    return 'daily';
  }

  // Weekdays at 9am - "0 9 * * 1-5"
  if (
    minutes.mode === 'specific' &&
    minutes.values.length === 1 &&
    minutes.values[0] === 0 &&
    hours.mode === 'specific' &&
    hours.values.length === 1 &&
    hours.values[0] === 9 &&
    days.mode === 'every' &&
    months.mode === 'every' &&
    weekdays.mode === 'specific' &&
    weekdays.values.length === 5 &&
    weekdays.values.every((v, i) => v === i + 1)
  ) {
    return 'weekdays';
  }

  // Weekly Monday at 9am - "0 9 * * 1"
  if (
    minutes.mode === 'specific' &&
    minutes.values.length === 1 &&
    minutes.values[0] === 0 &&
    hours.mode === 'specific' &&
    hours.values.length === 1 &&
    hours.values[0] === 9 &&
    days.mode === 'every' &&
    months.mode === 'every' &&
    weekdays.mode === 'specific' &&
    weekdays.values.length === 1 &&
    weekdays.values[0] === 1
  ) {
    return 'weekly';
  }

  return null;
}
