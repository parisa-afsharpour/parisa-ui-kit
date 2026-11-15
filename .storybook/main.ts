import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    '../src/components/**/*.stories.@(ts|tsx)'
  ],

  addons: [
    "@storybook/addon-docs",
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
  },
}

export default config