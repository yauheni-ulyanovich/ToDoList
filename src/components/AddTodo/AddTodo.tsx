import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/todosSlice';
import { RootState } from '../../redux/store';

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');

  const [addBtnDisabled, setAddBtnDisabled] = useState(true);

  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todosList.todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
      setAddBtnDisabled(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const addBtnIsDisabled =
      !value.length || todos.some((item) => item.text === value);
    setTodoText(value);
    setAddBtnDisabled(addBtnIsDisabled);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      alignItems='center'
      gap={1}
    >
      <TextField
        label='Add task'
        variant='outlined'
        value={todoText}
        onChange={handleChange}
        fullWidth
        size='small'
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={addBtnDisabled}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
