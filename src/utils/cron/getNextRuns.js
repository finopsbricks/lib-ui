import { CronExpressionParser } from 'cron-parser';

/**
 * Calculate next execution times for a cron expression in a specific timezone
 *
 * @param {string} expression - Cron expression (5 fields: minute hour day month weekday)
 * @param {Object|string} timezone - Timezone object with .name property OR IANA timezone string
 * @param {number} [count=5] - Number of next executions to calculate
 * @returns {Date[]} Array of Date objects representing next executions (empty if error)
 *
 * @example
 * // With timezone object
 * getNextRuns('0 9 * * *', { name: 'America/Chicago' }, 3);
 * // Returns: [Date, Date, Date] for next 3 days at 9am Chicago time
 *
 * @example
 * // With timezone string
 * getNextRuns('0 * * * *', 'America/New_York', 5);
 * // Returns: [Date, Date, Date, Date, Date] for next 5 hours
 */
export function getNextRuns(expression, timezone, count = 5) {
  if (!expression || typeof expression !== 'string') {
    return [];
  }

  // Extract timezone name from object or use string directly
  const timezoneName = typeof timezone === 'object' && timezone?.name
    ? timezone.name
    : timezone;

  if (!timezoneName) {
    return [];
  }

  try {
    // cron-parser expects 6 fields (second minute hour day month weekday)
    // but we use 5 fields (minute hour day month weekday), so prepend '0' for seconds
    const fields = expression.trim().split(/\s+/);
    const cronExpr = fields.length === 5 ? `0 ${expression.trim()}` : expression.trim();

    const interval = CronExpressionParser.parse(cronExpr, {
      currentDate: new Date(),
      tz: timezoneName
    });

    const runs = [];
    for (let i = 0; i < count; i++) {
      const next = interval.next();
      runs.push(next.toDate());
    }

    return runs;
  } catch (err) {
    // Invalid expression or timezone
    return [];
  }
}

/**
 * Format a Date object in a specific timezone for display
 *
 * @param {Date} date - Date to format
 * @param {Object|string} timezone - Timezone object with .name property OR IANA timezone string
 * @param {Object} [options] - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 *
 * @example
 * formatDateInTimezone(new Date(), 'America/Chicago');
 * // Returns: "Nov 25, 2025, 9:00 AM"
 */
export function formatDateInTimezone(date, timezone, options = {}) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Extract timezone name from object or use string directly
  const timezoneName = typeof timezone === 'object' && timezone?.name
    ? timezone.name
    : timezone;

  if (!timezoneName) {
    return date.toLocaleString('en-US', options);
  }

  try {
    // Add timeZone to options, but don't override with dateStyle/timeStyle
    // if specific format options are provided
    const formatOptions = {
      timeZone: timezoneName,
      ...options
    };

    // Only use dateStyle/timeStyle if no specific format options are provided
    if (!options.weekday && !options.month && !options.day && !options.hour) {
      formatOptions.dateStyle = options.dateStyle || 'medium';
      formatOptions.timeStyle = options.timeStyle || 'short';
    }

    return date.toLocaleString('en-US', formatOptions);
  } catch (err) {
    // Invalid timezone, fallback to default
    return date.toLocaleString('en-US', options);
  }
}
