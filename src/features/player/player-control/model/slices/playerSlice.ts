import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerControlStatus } from './../const/control';

export interface SettingsState {
  status: PlayerControlStatus;
}

export const initialState: SettingsState = {
  status: PlayerControlStatus.PLAY,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerStatus: (state, action: PayloadAction<PlayerControlStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setPlayerStatus } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
