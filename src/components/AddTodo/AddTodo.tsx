import './AddTodo.scss';

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/todosSlice';

const DEFAULT_CLASSNAME = 'add-todo';

const AddTodo: React.FC = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '10px' }}
      className={DEFAULT_CLASSNAME}
    >
      <TextField
        label='Add task'
        variant='outlined'
        value={todoText}
        onChange={handleChange}
        fullWidth
      />
      <Button type='submit' variant='contained' color='primary'>
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
