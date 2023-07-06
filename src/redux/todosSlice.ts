import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
}

const saveState = (state: Todo[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const loadState = (): TodosState => {
  const emptyState = {
    todos: [],
  };
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return emptyState;
    }
    return {
      todos: JSON.parse(serializedState),
    };
  } catch (error) {
    console.error('Error loading state:', error);
    return emptyState;
  }
};

const initialState: TodosState = loadState();

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
      saveState(state.todos);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
        saveState(state.todos);
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveState(state.todos);
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
