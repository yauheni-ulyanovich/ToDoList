import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import { Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appWrapper: {
      backgroundColor: '#f8f9fa',
      height: '100vh'
    },
    todoListWrapper: {
      margin: '0 auto',
      border: '1px solid black',
      borderRadius: '5px',
      minHeight: '50vh',
      width: '100%',
      maxWidth: 360,
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.appWrapper}>
      <Header title={'ToDo List'} />
      <Box className={classes.todoListWrapper}>
        <AddTodo />
        <TodoList />
      </Box>
    </div>
  );
};

export default App;
