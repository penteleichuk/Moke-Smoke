import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressSchema } from './../types/progress';

export const initialState: ProgressSchema = {
  selectId: 0,
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressId: (state, action: PayloadAction<{ id: number }>) => {
      state.selectId = action.payload.id;
    },
  },
});

export const { setProgressId } = progressSlice.actions;

export const progressReducer = progressSlice.reducer;
