import { Preview } from '@storybook/react';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';

import '../src/index.css';

initialize();

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  loaders: [mswLoader]
};

export default preview;
