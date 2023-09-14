import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../utils/db';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

interface appState {
  mode: 'light' | 'dark' | undefined;
}

export const saveTheme = async (
  mode: 'light' | 'dark' | undefined
): Promise<void> => {
  await db.appConfig.put({ id: 1, mode });
};

export const getTheme = async (): Promise<'light' | 'dark' | undefined> => {
  const config = await db.appConfig.get(1);
  return config?.mode;
};
export const fetchTheme = createAsyncThunk(
  'appConfig/fetchTheme',
  async (prefersColorScheme: 'light' | 'dark' | undefined) => {
    const config = await db.appConfig.toArray();
    const mode = config && config[0] && config[0].mode;
    return mode || prefersColorScheme;
  }
);

const initialState: appState = {
  mode: Theme.LIGHT,
};

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
  extraReducers: (builder) => {
    builder.addCase(fetchTheme.fulfilled, (state, action) => {
      state.mode = action.payload || Theme.LIGHT;
    });
  },
});

export const { switchTheme } = appSlice.actions;
export default appSlice.reducer;
