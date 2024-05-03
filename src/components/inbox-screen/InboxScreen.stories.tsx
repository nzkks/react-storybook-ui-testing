import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';

import InboxScreen from './InboxScreen';
import store from '../../lib/store';
import { MockedState } from '../task-list/TaskList.stories';

const meta: Meta<typeof InboxScreen> = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [story => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof InboxScreen>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(MockedState.tasks);
        })
      ]
    }
  }
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return new HttpResponse(null, {
            status: 403,
            headers: {
              'Content-Type': 'text/plain'
            }
          });
        })
      ]
    }
  }
};
