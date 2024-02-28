import { createSlice } from '@reduxjs/toolkit';
import { inviteInitialaized } from './../services/inviteInitialaized/inviteInitialaized';
import { InvitedSchema } from './../types/invited';

export const initialState: InvitedSchema = {};

export const invitedSlice = createSlice({
  name: 'invited',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(inviteInitialaized.fulfilled, (state, action) => {
      state.invitedId = action.payload.invitedId;
      state.token = action.payload.token;
    });
  },
});

export const invitedReducer = invitedSlice.reducer;
