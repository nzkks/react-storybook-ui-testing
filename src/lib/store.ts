import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    taskbox: taskReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
