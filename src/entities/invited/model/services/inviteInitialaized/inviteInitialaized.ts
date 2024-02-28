import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvitedApi } from './../../api/InvitedApi';

export const inviteInitialaized = createAsyncThunk(
  'invited/invite',
  async (_, thunkAPI) => {
    const { activation } = thunkAPI.getState() as StateSchema;

    if (!activation.isActivation) {
      try {
        const { _id: invitedId, code: token } = await InvitedApi.install();

        return { invitedId, token };
      } catch (e) {
        return thunkAPI.rejectWithValue({});
      }
    }

    return {};
  },
);
