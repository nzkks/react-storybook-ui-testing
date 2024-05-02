import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../entities';

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' }
];

type InitialState = {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: InitialState = {
  tasks: defaultTasks,
  status: 'idle',
  error: null
};

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{ id: string; newTaskState: string }>) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex(task => task.id === id);

      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    }
  }
});

export default TasksSlice.reducer;
export const { updateTaskState } = TasksSlice.actions;
