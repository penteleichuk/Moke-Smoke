import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HowMuchSchema } from './../types/howMuch';

export const initialState: HowMuchSchema = {
  value: 20,
};

export const howMuchSlice = createSlice({
  name: 'howMuch',
  initialState,
  reducers: {
    setValueHowMuch: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setValueHowMuch } = howMuchSlice.actions;
export const howMuchReducer = howMuchSlice.reducer;
