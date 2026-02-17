/**
 * Build a cron expression from structured builder state
 *
 * Converts visual builder state into a valid 5-field cron expression.
 * Attempts to generate compact expressions (e.g., "1-5" instead of "1,2,3,4,5").
 *
 * @param {Object} state - Builder state
 * @param {Object} state.minutes - Minutes configuration
 * @param {Object} state.hours - Hours configuration
 * @param {Object} state.days - Days configuration
 * @param {Object} state.months - Months configuration
 * @param {Object} state.weekdays - Weekdays configuration
 * @returns {string} Cron expression
 *
 * @example
 * buildCronExpression({
 *   minutes: { mode: 'specific', values: [0] },
 *   hours: { mode: 'specific', values: [9] },
 *   days: { mode: 'every', values: [] },
 *   months: { mode: 'every', values: [] },
 *   weekdays: { mode: 'specific', values: [1, 2, 3, 4, 5] }
 * });
 * // Returns: "0 9 * * 1-5"
 */
export function buildCronExpression(state) {
  if (!state || typeof state !== 'object') {
    throw new Error('Invalid builder state');
  }

  const { minutes, hours, days, months, weekdays } = state;

  if (!minutes || !hours || !days || !months || !weekdays) {
    throw new Error('Missing required fields in builder state');
  }

  const parts = [
    buildField(minutes, 0, 59),
    buildField(hours, 0, 23),
    buildField(days, 1, 31),
    buildField(months, 1, 12),
    buildField(weekdays, 0, 7),
  ];

  return parts.join(' ');
}

/**
 * Build a single cron field from configuration
 *
 * @private
 * @param {Object} config - Field configuration
 * @param {number} min - Minimum valid value
 * @param {number} max - Maximum valid value
 * @returns {string} Cron field string
 */
function buildField(config, min, max) {
  const { mode, values, step } = config;

  // Every - "*"
  if (mode === 'every') {
    return '*';
  }

  // Interval - "*/5"
  if (mode === 'interval') {
    if (!step || step <= 0) {
      throw new Error('Invalid interval step');
    }
    return `*/${step}`;
  }

  // Specific values - "1,3,5" or "1-5"
  if (mode === 'specific') {
    if (!values || values.length === 0) {
      throw new Error('Specific mode requires values');
    }

    // Validate all values are in range
    for (const value of values) {
      if (value < min || value > max) {
        throw new Error(`Value ${value} out of range [${min}-${max}]`);
      }
    }

    // Sort values
    const sorted = [...values].sort((a, b) => a - b);

    // Try to compact into range if possible
    const compacted = compactToRange(sorted);
    if (compacted) {
      return compacted;
    }

    // Otherwise, return as comma-separated list
    return sorted.join(',');
  }

  throw new Error(`Unknown mode: ${mode}`);
}

/**
 * Try to compact an array of values into a range expression
 *
 * @private
 * @param {number[]} values - Sorted array of values
 * @returns {string|null} Range string like "1-5" or null if can't be compacted
 */
function compactToRange(values) {
  if (values.length < 3) {
    return null; // Not worth compacting
  }

  // Check if values form a continuous sequence
  let isContinuous = true;
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) {
      isContinuous = false;
      break;
    }
  }

  if (isContinuous) {
    return `${values[0]}-${values[values.length - 1]}`;
  }

  return null;
}

/**
 * Create default builder state
 *
 * @returns {Object} Default state (daily at 9am)
 */
export function createDefaultState() {
  return {
    minutes: { mode: 'specific', values: [0] },
    hours: { mode: 'specific', values: [9] },
    days: { mode: 'every', values: [] },
    months: { mode: 'every', values: [] },
    weekdays: { mode: 'every', values: [] },
  };
}
