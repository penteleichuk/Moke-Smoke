import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from 'shared/config/i18n';
import { getLocalize } from 'shared/lib/intl/getLocalize';

export interface LanguageState {
  localize: LanguageType;
}

export const initialState: LanguageState = {
  localize: getLocalize<LanguageType>(),
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<LanguageType>) => {
      state.localize = payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
