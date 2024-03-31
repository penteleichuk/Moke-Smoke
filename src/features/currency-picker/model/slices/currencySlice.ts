import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAppCurrencies } from 'shared/lib/intl/getAppCurrencies';
import { CurrencySchema } from './../types/currency';

export const initialState: CurrencySchema = {
  currency: getAppCurrencies(),
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
