import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const LIGHT = 'light';
export const DARK = 'dark';

interface appState {
  mode: 'light' | 'dark' | undefined;
}

export const saveState = (mode: 'light' | 'dark' | undefined) => {
  try {
    localStorage.setItem('mode', mode || LIGHT);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const loadState = (): appState => {
  try {
    const mode = localStorage.getItem('mode');
    if (!mode) {
      return {
        mode: undefined,
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

const initialState: appState = loadState();

const appSlice = createSlice({
  name: 'appConfig',
  initialState,
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
