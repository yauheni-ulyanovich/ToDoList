import React from 'react';
import Header from './components/Header';
import TodosList from './components/TodosList';
import AddTodo from './components/AddTodo';
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
      minHeight: '50vh'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.appWrapper}>
      <Header title={'ToDo List'} />
      <Box
        className={classes.todoListWrapper}
        sx={{ width: '100%', maxWidth: 360 }}
      >
        <AddTodo />
        <TodosList />
      </Box>
    </div>
  );
};

export default App;
