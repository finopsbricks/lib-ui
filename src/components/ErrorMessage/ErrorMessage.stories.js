/**
 * ErrorMessage Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: WhenRateLimitExceeded, WhenUnauthorized, WhenServerFails
 */

import ErrorMessage from './ErrorMessage';

export default {
  title: 'components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * USER JOURNEY STORY 1: When Rate Limit Exceeded
 *
 * When: User made too many requests in a short period (API rate limiting).
 *       Application needs to show error explaining the limit and when to retry.
 *
 * User sees: Full-screen error page with 429 status code, rate limit message,
 *            Reset and Home buttons for recovery options.
 *
 * Tests: 429 status handling, rate limit error message, retry/home button display.
 */
export const WhenRateLimitExceeded = {
  args: {
    error: new Error('Rate limit exceeded'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
  },
  parameters: {
    description: 'API rate limit: User exceeded request quota. Shows 429 error with explanation and retry/home options. Common when user rapidly refreshes or makes many API calls.',
  },
};

WhenRateLimitExceeded.args.error.status = 429;

/**
 * USER JOURNEY STORY 2: When Unauthorized
 *
 * When: User tried to access a resource without proper authentication (session expired,
 *       logged out, or insufficient permissions).
 *
 * User sees: Full-screen 401 error explaining unauthorized access, with options to
 *            reset (re-authenticate) or go home.
 *
 * Tests: 401 status handling, unauthorized message, authentication recovery flow.
 */
export const WhenUnauthorized = {
  args: {
    error: new Error('Unauthorized access'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
  },
  parameters: {
    description: 'Authentication error: User session expired or lacks permissions. Shows 401 error with re-authentication options. Common when session times out or user tries to access restricted resources.',
  },
};

WhenUnauthorized.args.error.status = 401;

/**
 * USER JOURNEY STORY 3: When Server Fails
 *
 * When: Application encountered an internal server error (500) during request processing.
 *       Backend issue that user cannot directly fix.
 *
 * User sees: Full-screen 500 error message explaining server failure, with retry and home options.
 *            Indicates problem is on server side, not user's fault.
 *
 * Tests: 500 status handling, server error messaging, retry functionality.
 */
export const WhenServerFails = {
  args: {
    error: new Error('Internal server error'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
  },
  parameters: {
    description: 'Server error: Internal server error (500) occurred. Shows error page explaining server-side issue with retry and home options. Common during backend failures, database issues, or service outages.',
  },
};

WhenServerFails.args.error.status = 500;

/**
 * USER JOURNEY STORY 4: When Network Fails
 *
 * When: User's network connection failed or API endpoint is unreachable.
 *       Could be client network issue, DNS failure, or API server down.
 *
 * User sees: Error page explaining network connection failure, with retry and home buttons.
 *            User can retry after checking their connection.
 *
 * Tests: Network error handling, connection failure messaging, retry after network restored.
 */
export const WhenNetworkFails = {
  args: {
    error: new Error('Network connection failed'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
  },
  parameters: {
    description: 'Network error: Connection failed - could be user\'s internet, DNS, or API unreachable. Shows network error message with retry option. Common when user loses internet or API endpoint is down.',
  },
};

/**
 * USER JOURNEY STORY 5: When Unexpected Error Occurs
 *
 * When: Application encountered an unexpected error without specific status code.
 *       Generic catch-all for errors that don't fit other categories.
 *
 * User sees: Generic error page with "Something went wrong" message and recovery options
 *            (reset/home). Fallback error display for unknown errors.
 *
 * Tests: Generic error handling, fallback error display, basic recovery options.
 */
export const WhenUnexpectedErrorOccurs = {
  args: {
    error: new Error('Something went wrong'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
  },
  parameters: {
    description: 'Generic error: Unexpected error without specific status code. Shows generic error page with basic recovery options. Fallback for unknown errors or exceptions.',
  },
};

/**
 * USER JOURNEY STORY 6: With Debug Information
 *
 * When: Developer or support team needs detailed error information (stack trace, error details)
 *       to debug production issues. Debug mode enabled.
 *
 * User sees: Error page with additional debug panel showing stack trace and error details.
 *            Useful for development, staging, or when support needs error details.
 *
 * Tests: Debug info display, stack trace rendering, toggling debug mode, development tools.
 */
export const WithDebugInfo = {
  args: {
    error: (() => {
      const err = new Error('Error with stack trace');
      err.stack = `Error: Error with stack trace
    at Object.<anonymous> (/app/src/component.js:42:15)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)`;
      return err;
    })(),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
    showDebugInfo: true,
  },
  parameters: {
    description: 'Development mode: Error with debug information panel showing stack trace. Useful for developers debugging issues or support team investigating production errors. Debug panel can be toggled on/off.',
  },
};

/**
 * USER JOURNEY STORY 7: Without Reset Option
 *
 * When: Error occurred where retry/reset is not applicable or allowed.
 *       Only option is to navigate home.
 *
 * User sees: Error page without reset button, only Home button available.
 *            Indicates error cannot be retried.
 *
 * Tests: Error display without reset button, home-only recovery option.
 */
export const WithoutResetOption = {
  args: {
    error: new Error('Error without reset button'),
    showHomeButton: true,
  },
  parameters: {
    description: 'No retry option: Error that cannot be retried. Only Home button available. Common for errors where retry would not help (missing resource, deleted data, etc.).',
  },
};

/**
 * USER JOURNEY STORY 8: Without Home Navigation
 *
 * When: Error occurred in a context where navigating home is not desired or applicable.
 *       Only retry option available.
 *
 * User sees: Error page with reset button only, no home button.
 *            User must retry or use browser navigation.
 *
 * Tests: Error display without home button, reset-only recovery option.
 */
export const WithoutHomeNavigation = {
  args: {
    error: new Error('Error without home button'),
    reset: () => alert('Reset clicked'),
    showHomeButton: false,
  },
  parameters: {
    description: 'No home option: Error with only reset/retry button. Home button hidden. Common in embedded contexts or where home navigation is not desired.',
  },
};

/**
 * USER JOURNEY STORY 9: Developer Interactive
 *
 * When: Developer is manually testing error page with different error types and configurations.
 *
 * User sees: Interactive error page to test various error scenarios, status codes,
 *            and button combinations.
 *
 * Tests: Manual testing of complete functionality:
 *        - Test different error status codes (401, 429, 500, etc.)
 *        - Test with/without reset button
 *        - Test with/without home button
 *        - Test debug info toggle
 *        - Test error messages and stack traces
 */
export const DeveloperInteractive = {
  args: {
    error: new Error('Test error message'),
    reset: () => alert('Reset clicked'),
    showHomeButton: true,
    showDebugInfo: false,
  },
  parameters: {
    description: 'Interactive testing: For developer manual testing of error page configurations. Test different error types, status codes, button combinations (reset/home), and debug mode. Modify error.status to test specific HTTP status codes (401, 429, 500, etc.).',
  },
};
