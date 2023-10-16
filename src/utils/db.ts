import Dexie from 'dexie';
import { Theme } from '../redux/appSlice';
import { Todo } from '../redux/todosSlice';

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

export const saveTheme = async (
  mode: Theme.LIGHT | Theme.DARK | undefined
): Promise<void> => {
  await db.appConfig.put({ id: 1, mode });
};
