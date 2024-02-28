import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/StoreProvider';
import { authLogout } from 'entities/auth';
import { UserApi } from './../../api/userApi';

export const userRemove = createAsyncThunk(
  'user/buy/rating',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState() as RootState;

    if (auth.isAuth) {
      try {
        await UserApi.removeUser();
        thunkAPI.dispatch(authLogout());
      } catch (err: any) {}
    }
  },
);
