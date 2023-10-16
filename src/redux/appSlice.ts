import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

interface appState {
  mode: Theme.LIGHT | Theme.DARK | undefined;
}

const initialState: appState = {
  mode: Theme.LIGHT,
};

export const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    switchTheme: (
      state,
      action: PayloadAction<Theme.LIGHT | Theme.DARK | undefined>
    ) => {
      state.mode = action.payload;
    },
    themeFetched: (
      state,
      action: PayloadAction<Theme.LIGHT | Theme.DARK | undefined>
    ) => {
      state.mode = action.payload || Theme.LIGHT;
    },
  },
});

export const { switchTheme } = appSlice.actions;
export default appSlice.reducer;
