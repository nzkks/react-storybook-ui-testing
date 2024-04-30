import type { Meta } from '@storybook/react';
import { TaskList } from './TaskList';
import * as TaskStories from '../task/Task.stories';

const meta: Meta<typeof TaskList> = {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs']
};

export default meta;

export const Default = {
  args: {
    tasks: [
      { ...TaskStories.Default.args.task, id: '1', title: 'Test Task 1' },
      { ...TaskStories.Default.args.task, id: '2', title: 'Test Task 2' },
      { ...TaskStories.Default.args.task, id: '3', title: 'Test Task 3' },
      { ...TaskStories.Default.args.task, id: '4', title: 'Test Task 4' },
      { ...TaskStories.Default.args.task, id: '5', title: 'Test Task 5' },
      { ...TaskStories.Default.args.task, id: '6', title: 'Test Task 6' }
    ]
  }
};

export const WithPinnedTasks = {
  args: {
    tasks: [...Default.args.tasks.slice(0, 5), { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }]
  }
};

export const Loading = {
  args: {
    tasks: [],
    loading: true
  }
};

export const Empty = {
  args: {
    ...Loading.args,
    loading: false
  }
};
