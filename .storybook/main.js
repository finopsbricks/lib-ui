const path = require('path');

const config = {
  framework: "@storybook/nextjs",
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    // "@storybook/addon-a11y",  // Disabled - not a priority
    "storybook/viewport",
  ],

  staticDirs: [
    "../public"
  ],

  webpackFinal: async (config) => {
    console.log('🔧 Configuring webpack aliases for Storybook...');

    // Use NormalModuleReplacementPlugin to universally mock ALL action.js imports
    const webpack = require('webpack');
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\/action(?:\.js)?$/,
        path.resolve(__dirname, 'mocks/action.js')
      )
    );

    console.log('✅ Universal action mocking configured - all action.js imports will be mocked');

    return config;
  }
};

export default config;
