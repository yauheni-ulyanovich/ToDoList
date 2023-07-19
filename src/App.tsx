import './App.scss';

import React, {useMemo, createContext, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';

import { switchTheme, saveState, LIGHT, DARK } from './redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

const ColorModeContext = createContext({
  toggleColorMode: (mode: 'light' | 'dark' | undefined) => {},
});

const App = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.config.mode);

  const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? DARK
    : LIGHT;

  useEffect(() => {
    if (!mode) {
      dispatch(switchTheme(prefersColorScheme));
    }
  }, []);

  useEffect(() => {
    if (mode) {
      saveState(mode);
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode: 'light' | 'dark' | undefined) => {
        dispatch(switchTheme(mode === LIGHT ? DARK : LIGHT));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'background.default',
            height: '100vh',
            padding: '50px',
          }}
        >
          <Card
            sx={{
              maxWidth: '25vw',
              margin: '0 auto',
              border: 1,
              borderColor: 'text.primary',
              borderRadius: '5px',
            }}
          >
            <CardHeader title={'ToDo List'}></CardHeader>
            <CardContent>
              <AddTodo />
              <TodoList />
            </CardContent>
            <CardActions>
              <IconButton
                sx={{ ml: 1, margin: 'auto 0 0' }}
                onClick={() => colorMode.toggleColorMode(mode)}
                color='inherit'
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
