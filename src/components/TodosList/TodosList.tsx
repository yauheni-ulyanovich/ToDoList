import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Todo, removeTodo, toggleTodo, saveState } from '../../redux/todosSlice';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodosList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todosList.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    saveState(todos);
  }, [todos]);

  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id));
  };

  return (
    <List>
      {todos.map((todo: Todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            edge='start'
            checked={todo.completed}
            tabIndex={-1}
            onClick={() => handleToggle(todo.id)}
          />
          <ListItemText
            primary={todo.text}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          />
          <ListItemSecondaryAction>
            <IconButton edge='end' onClick={() => handleDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TodosList;
