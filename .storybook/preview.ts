import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/styles/index.scss'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1131',
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
