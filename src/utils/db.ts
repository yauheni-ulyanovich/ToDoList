import Dexie from 'dexie';

import { Todo } from '../redux/todosSlice';

export class ToDoDatabase extends Dexie {
  todos: Dexie.Table<Todo, string>;
  appConfig: Dexie.Table<
    { id: number; mode: 'light' | 'dark' | undefined },
    number
  >;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      todos: '&++id,text,completed,timestamp',
      appConfig: '++id,mode',
    });
    // Just informing Typescript what Dexie has already done
    this.todos = this.table('todos');
    this.appConfig = this.table('appConfig');
  }
}

export const db = new ToDoDatabase('todoDatabase');
