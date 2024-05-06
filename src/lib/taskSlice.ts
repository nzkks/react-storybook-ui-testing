import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, Todo } from '../entities';

type InitialState = {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: InitialState = {
  tasks: [],
  status: 'idle',
  error: null
};

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
  const data = await response.json();
  const result = data.map((task: Todo) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX'
  }));

  return result;
});

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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, state => {
        state.status = 'failed';
        state.error = 'Something went wrong';
        state.tasks = [];
      });
  }
});

export default TasksSlice.reducer;
export const { updateTaskState } = TasksSlice.actions;
