import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, appSlice } from '../redux/appSlice';
import { db } from './db';
import { RootState } from '../redux/store';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useTheme() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.config.mode);
  const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? Theme.DARK
    : Theme.LIGHT;

  useEffect(() => {
    async function loadTheme() {
      const config = await db.appConfig.toArray();
      const storedMode = config && config[0] && config[0].mode;
      dispatch(appSlice.actions.themeFetched(storedMode || prefersColorScheme));
    }

    loadTheme();
  }, [dispatch, prefersColorScheme]);

  return mode;
}
