import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { saveToDb, loadFromDb, initDb } from '../utils/db';
import { AppThunk } from './store';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
}

export const saveState = async (state: Todo[]) => {
  try {
    await initDb();
    await saveToDb('todos', state);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const loadState = async (): Promise<{ todos: Todo[] }> => {
  const emptyState = {
    todos: [],
  };
  try {
    await initDb();
    const loadedState = await loadFromDb('todos');
    if (loadedState === undefined) {
      return emptyState;
    }
    return {
      // @ts-ignore
      todos: loadedState,
    };
  } catch (error) {
    console.error('Error loading state:', error);
    return emptyState;
  }
};

const initialState: TodosState = { todos: [] };

const todosSlice = createSlice({
  name: 'todosList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
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
    addMany: (state, action: PayloadAction<Todo[]>) => {
      state.todos.push(...action.payload);
    },
  },
});

export const loadTodosAsync = (): AppThunk => async (dispatch) => {
  const loadedState = await loadState();
  dispatch(todosSlice.actions.addMany(loadedState.todos));
};

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
