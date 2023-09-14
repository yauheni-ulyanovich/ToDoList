import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { db } from '../utils/db';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timestamp: number;
}

interface TodosState {
  todos: Todo[];
  status?: string;
  error?: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await db.todos.toArray();
  return todos;
});

export const saveState = async (state: Todo[]) => {
  try {
    await db.todos.clear();
    await db.todos.bulkPut(state);
  } catch (error) {
    console.error('Error saving state to database:', error);
  }
};

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todosList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
        timestamp: Date.now()
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = Status.SUCCEEDED;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
