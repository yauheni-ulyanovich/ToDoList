import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { todosSlice } from '../redux/todosSlice';
import { db } from './db';

export function useTodos() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadTodos() {
      const todos = await db.todos.toArray();
      dispatch(todosSlice.actions.todosLoaded(todos));
    }

    loadTodos();
  }, [dispatch]);
}
