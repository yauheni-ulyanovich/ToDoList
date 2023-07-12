import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    todosList: todosReducer,
    config: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
