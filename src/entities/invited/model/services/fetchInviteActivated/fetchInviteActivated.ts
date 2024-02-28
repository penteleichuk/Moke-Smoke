import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActivateInvitedProps, InvitedApi } from './../../api/InvitedApi';

export const fetchInviteActivated = createAsyncThunk(
  'invited/activated',
  async (args: ActivateInvitedProps, thunkAPI) => {
    try {
      await InvitedApi.activate(args);
      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue({});
    }
  },
);
