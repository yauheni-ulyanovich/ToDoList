import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import appReducer from './appSlice';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const store = configureStore({
  reducer: {
    todosList: todosReducer,
    config: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
