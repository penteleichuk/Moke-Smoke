import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorSchemeType, ThemeApp, ThemeType } from 'shared/lib/theme';

export interface ThemeSchema {
  theme: ThemeType;
  colorScheme: ColorSchemeType;
}

export const initialState: ThemeSchema = {
  theme: ThemeApp.dark,
  colorScheme: ThemeApp.dark,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<ColorSchemeType>) => {
      state.colorScheme = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setColorScheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
