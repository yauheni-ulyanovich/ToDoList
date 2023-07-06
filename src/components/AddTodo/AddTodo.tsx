import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/todosSlice';

const useStyles = makeStyles(() =>
  createStyles({
    addTodo: {
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      padding: '10px',
    },
  })
);

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

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
      className={classes.addTodo}
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
