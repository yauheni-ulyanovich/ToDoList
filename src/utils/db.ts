import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { Todo } from '../redux/todosSlice';

interface MyDb extends DBSchema {
  todosStore: {
    key: string;
    value: Todo[];
  };
  appStore: {
    key: string;
    value: 'light' | 'dark' | undefined;
  };
}

const TODOS_STORE = 'todosStore';
const APP_STORE = 'appStore';

let db: IDBPDatabase<MyDb>;

export async function initDb() {
  db = await openDB<MyDb>('myAppDatabase', 1, {
    upgrade(db) {
      db.createObjectStore(TODOS_STORE);
      db.createObjectStore(APP_STORE);
    },
  });
}

export const saveToDb = async (
  key: 'todos' | 'mode',
  value: Todo[] | 'light' | 'dark' | undefined
) => {
  await initDb();
  if (key === 'todos') {
    await db.put(TODOS_STORE, value as Todo[], key);
  } else {
    await db.put(APP_STORE, value as 'light' | 'dark', key);
  }
};

export const loadFromDb = (key: 'todos' | 'mode') => {
  if (key === 'todos') {
    return db.get(TODOS_STORE, key);
  } else {
    return db.get(APP_STORE, key);
  }
};
