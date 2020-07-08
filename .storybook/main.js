const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    'storybook-addon-react-docgen',
  ],
};
