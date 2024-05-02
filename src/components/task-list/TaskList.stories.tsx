import type { Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { TaskList } from './TaskList';
import * as TaskStories from '../task/Task.stories';
import { Task } from '../../entities';

type MockedStateType = {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export const MockedState: MockedStateType = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Test Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Test Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Test Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Test Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Test Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Test Task 6' }
  ],
  status: 'idle',
  error: null
};

type MockStoreType = {
  taskboxState: MockedStateType;
  children: React.ReactNode;
};

const MockStore = ({ taskboxState, children }: MockStoreType) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex(task => task.id === id);

              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            }
          }
        }).reducer
      }
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof TaskList> = {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/
};

export default meta;

export const Default: Meta<typeof TaskList> = {
  decorators: [story => <MockStore taskboxState={MockedState}>{story()}</MockStore>]
};

export const WithPinnedTasks: Meta<typeof TaskList> = {
  decorators: [
    story => {
      const pinnedTasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }
      ];

      return <MockStore taskboxState={{ ...MockedState, tasks: pinnedTasks }}>{story()}</MockStore>;
    }
  ]
};

export const Loading: Meta<typeof TaskList> = {
  decorators: [story => <MockStore taskboxState={{ ...MockedState, status: 'loading' }}>{story()}</MockStore>]
};

export const Empty: Meta<typeof TaskList> = {
  decorators: [story => <MockStore taskboxState={{ ...MockedState, tasks: [] }}>{story()}</MockStore>]
};
