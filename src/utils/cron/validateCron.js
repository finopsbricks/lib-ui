import { CronExpressionParser } from 'cron-parser';

/**
 * Validate a cron expression
 *
 * @param {string} expression - Cron expression to validate (5 fields: minute hour day month weekday)
 * @returns {{valid: boolean, error: string|null}} Validation result with valid flag and error message
 *
 * @example
 * validateCron('0 9 * * *');
 * // Returns: { valid: true, error: null }
 *
 * @example
 * validateCron('invalid');
 * // Returns: { valid: false, error: 'Invalid cron expression' }
 */
export function validateCron(expression) {
  if (!expression || typeof expression !== 'string') {
    return {
      valid: false,
      error: 'Cron expression is required'
    };
  }

  try {
    // Parse expression to validate
    // Note: cron-parser expects 6 fields (second minute hour day month weekday)
    // but we use 5 fields (minute hour day month weekday), so prepend '0' for seconds
    const fields = expression.trim().split(/\s+/);
    const cronExpr = fields.length === 5 ? `0 ${expression.trim()}` : expression.trim();

    CronExpressionParser.parse(cronExpr);

    return {
      valid: true,
      error: null
    };
  } catch (err) {
    // Clean up error message
    let errorMessage = err.message || 'Invalid cron expression';

    // Remove 'Error: ' prefix if present
    errorMessage = errorMessage.replace(/^Error:\s*/i, '');

    return {
      valid: false,
      error: errorMessage
    };
  }
}
