const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  // Run tests in parallel for better performance
  workers: 2,

  async preVisit(page, context) {
    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1366, height: 768 });
  },

  async postVisit(page, context) {
    try {
      const storyContext = await getStoryContext(page, context);

      // Skip accessibility testing for stories without play functions
      if (!storyContext.parameters?.test?.disableSnapshots) {
        // Take screenshot for visual regression testing (optional)
        // await page.screenshot({
        //   path: `screenshots/${context.id}.png`,
        //   fullPage: true
        // });
      }
    } catch (error) {
      // Handle cases where getStoryContext is not available
      console.warn(`Could not get story context for ${context.id}:`, error.message);
    }

    // Test for console errors
    const errors = await page.evaluate(() => {
      return window.__errors || [];
    });

    if (errors.length > 0) {
      console.warn(`⚠️  Console errors in ${context.id}:`, errors);
    }
  },

  // Ignore stories that shouldn't be tested
  stories: [
    '!**/*.ignore.*', // Ignore files with .ignore. in the name
  ],

  // Playwright configuration
  use: {
    // Use chromium for consistent testing
    channel: 'chromium',

    // Set a reasonable timeout
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Test configuration
  testDir: '../src',
  testMatch: '**/*.stories.@(js|jsx|ts|tsx)',

  // Retry failed tests
  retries: 1,
};
