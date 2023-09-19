import Dexie from 'dexie';
import { Theme } from '../redux/appSlice';

import { Todo } from '../redux/todosSlice';
import {createAsyncThunk} from "@reduxjs/toolkit";

interface AppConfigData {
  id: number;
  mode: Theme.LIGHT | Theme.DARK | undefined;
}

export class ToDoDatabase extends Dexie {
  todos!: Dexie.Table<Todo, string>;
  appConfig!: Dexie.Table<AppConfigData, number>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      todos: '&++id,text,completed,timestamp',
      appConfig: '++id,mode',
    });
  }
}

export const db = new ToDoDatabase('todoDatabase');

export const saveTodosState = async (state: Todo[]) => {
  try {
    await db.todos.clear();
    await db.todos.bulkPut(state);
  } catch (error) {
    console.error('Error saving state to database:', error);
  }
};

export const fetchTodos = createAsyncThunk<Todo[], void>('todos/fetchTodos', async () => {
  const todos = await db.todos.toArray();
  return todos;
});

export const saveTheme = async (
  mode: Theme.LIGHT | Theme.DARK | undefined
): Promise<void> => {
  await db.appConfig.put({ id: 1, mode });
};

export const fetchTheme = createAsyncThunk(
  'appConfig/fetchTheme',
  async (prefersColorScheme: Theme.LIGHT | Theme.DARK | undefined) => {
    const config = await db.appConfig.toArray();
    const mode = config && config[0] && config[0].mode;
    return mode || prefersColorScheme;
  }
);
