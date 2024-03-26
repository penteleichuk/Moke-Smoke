import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackerSchema } from './../types/tracker';

export const initialState: TrackerSchema = {
  isInitial: false,
};

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    setTrackerInitial: (state, action: PayloadAction<boolean>) => {
      state.isInitial = action.payload;
    },
  },
});

export const { setTrackerInitial } = trackerSlice.actions;

export const trackerReducer = trackerSlice.reducer;
