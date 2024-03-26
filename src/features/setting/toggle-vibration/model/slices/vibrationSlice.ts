import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VibrationSchema } from './../types/vibration';

export const initialState: VibrationSchema = {
  isEnabled: true,
};

export const vibrationSlice = createSlice({
  name: 'vibration',
  initialState,
  reducers: {
    setVibrationIsEnabled: (
      state,
      action: PayloadAction<{ isEnabled: boolean }>,
    ) => {
      state.isEnabled = action.payload.isEnabled;
    },
    toggleVibration: state => {
      state.isEnabled = !state.isEnabled;
    },
  },
});

export const { setVibrationIsEnabled, toggleVibration } =
  vibrationSlice.actions;
export const vibrationReducer = vibrationSlice.reducer;
