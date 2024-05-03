import type { Meta } from '@storybook/react';
import { Provider } from 'react-redux';

import InboxScreen from './InboxScreen';
import store from '../../lib/store';

const meta: Meta<typeof InboxScreen> = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [story => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs']
};
export default meta;

export const Default: Meta<typeof InboxScreen> = {};

export const Error: Meta<typeof InboxScreen> = {};
