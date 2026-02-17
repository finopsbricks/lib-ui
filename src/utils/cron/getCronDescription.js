import cronstrue from 'cronstrue';

/**
 * Convert cron expression to human-readable description
 *
 * @param {string} expression - Cron expression (5 fields: minute hour day month weekday)
 * @returns {string} Human-readable description or error message
 *
 * @example
 * getCronDescription('0 9 * * 1-5');
 * // Returns: "At 9:00 AM, Monday through Friday"
 *
 * @example
 * getCronDescription('0 * * * *');
 * // Returns: "At minute 0"
 *
 * @example
 * getCronDescription('invalid');
 * // Returns: "Invalid cron expression"
 */
export function getCronDescription(expression) {
  if (!expression || typeof expression !== 'string') {
    return 'Invalid cron expression';
  }

  try {
    return cronstrue.toString(expression.trim(), {
      use24HourTimeFormat: false,  // Use 12-hour format (9:00 AM instead of 09:00)
      verbose: false,              // Concise output
      throwExceptionOnParseError: true
    });
  } catch (err) {
    return 'Invalid cron expression';
  }
}
