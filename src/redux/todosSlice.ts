import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timestamp: Date;
}

interface TodosState {
  todos: Todo[];
  status?: string;
  error?: string;
}

export enum Status {
  SUCCEEDED = 'succeeded',
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todosList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
        timestamp: new Date(),
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todosLoaded: (state, action: PayloadAction<Todo[]>) => {
      state.status = Status.SUCCEEDED;
      state.todos = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
