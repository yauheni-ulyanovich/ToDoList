import './App.scss';

import React from 'react';
import Header from './components/Header';
import TodosList from './components/TodosList';
import AddTodo from './components/AddTodo';
import { Box } from '@mui/material';

const DEFAULT_CLASSNAME = 'app-wrapper';

const App: React.FC = () => {
  return (
    <div className={DEFAULT_CLASSNAME}>
      <Header title={'ToDo List'} />
      <Box
        className={`${DEFAULT_CLASSNAME}__todo-list-wrapper`}
        sx={{ width: '100%', maxWidth: 360 }}
      >
        <AddTodo />
        <TodosList />
      </Box>
    </div>
  );
};

export default App;
