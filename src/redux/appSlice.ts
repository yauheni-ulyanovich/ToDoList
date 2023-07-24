import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToDb, loadFromDb, initDb } from '../utils/db';
import { AppThunk } from './store';

export const LIGHT = 'light';
export const DARK = 'dark';

export interface appState {
  mode: 'light' | 'dark' | undefined;
}

export const saveState = async (mode: 'light' | 'dark' | undefined) => {
  try {
    await initDb();
    await saveToDb('mode', mode);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const loadState = async (
  prefersColorScheme: 'light' | 'dark'
): Promise<appState> => {
  try {
    await initDb();
    const mode = await loadFromDb('mode');
    debugger;
    if (!mode) {
      return {
        mode: prefersColorScheme || undefined,
      };
    }
    return {
      mode: mode === DARK ? DARK : LIGHT,
    };
  } catch (error) {
    console.error('Error loading state:', error);
    return {
      mode: LIGHT,
    };
  }
};

const appSlice = createSlice({
  name: 'appConfig',
  initialState: {
    mode: LIGHT,
  } as appState,
  reducers: {
    switchTheme: (
      state,
      action: PayloadAction<'light' | 'dark' | undefined>
    ) => {
      state.mode = action.payload;
    },
  },
});

export const { switchTheme } = appSlice.actions;
export default appSlice.reducer;

// Thunk action for loading theme state
export const loadThemeAsync =
  (prefersColorScheme: 'light' | 'dark'): AppThunk =>
  async (dispatch) => {
    const state = await loadState(prefersColorScheme);
    debugger;
    dispatch(switchTheme(state.mode));
  };

// Thunk action for saving theme state
export const saveThemeAsync =
  (mode: 'light' | 'dark' | undefined): AppThunk =>
  async (dispatch) => {
    await saveState(mode);
    dispatch(switchTheme(mode));
  };
