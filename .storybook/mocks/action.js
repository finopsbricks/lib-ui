// Universal mock for all action.js files in Storybook
// This file automatically mocks any server action to prevent database dependency errors

const { fn } = require('storybook/test');

console.log('🎭 Universal action mock loaded');

// Create mock for any action name
const createMockAction = (functionName) => {
  return fn()
    .mockImplementation(async (...args) => {
      console.log(`🎭 Mock ${functionName} called with:`, args);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return a generic success response
      const mockResponse = {
        success: true,
        message: `Mock ${functionName} completed successfully`,
      };
      return mockResponse;
    })
    .mockName(functionName);
};

// Cache for mock instances
const mockCache = {};

// Proxy that creates mocks on demand for any export
const handler = {
  get(target, prop) {
    if (typeof prop === 'string') {
      // Cache to ensure same mock instance for repeated imports
      if (!mockCache[prop]) {
        mockCache[prop] = createMockAction(prop);
      }
      return mockCache[prop];
    }
    return undefined;
  }
};

// Use module.exports with Proxy to support both named and default exports
module.exports = new Proxy({}, handler);

// Using CommonJS instead of ES modules because:
// 1. ES modules require static exports, but we need dynamic named exports via Proxy
// 2. CommonJS allows the Proxy to intercept any property access, enabling true dynamic mocking
