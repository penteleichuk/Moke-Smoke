import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivationSchema } from './../types/activation';

export const initialState: ActivationSchema = {
  isActivation: false,
};

export const activationSlice = createSlice({
  name: 'activation',
  initialState,
  reducers: {
    setIsActivation: (state, action: PayloadAction<boolean>) => {
      state.isActivation = action.payload;
    },
  },
});

export const { setIsActivation } = activationSlice.actions;
export const activationReducer = activationSlice.reducer;
