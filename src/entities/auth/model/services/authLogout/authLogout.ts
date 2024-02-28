import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from 'entities/user';
import {
  USER_LOCALSTORAGE_ACCESS_TOKEN,
  USER_LOCALSTORAGE_REFRESH_TOKEN,
} from 'shared/const/localstorage';

export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    AsyncStorage.removeItem(USER_LOCALSTORAGE_ACCESS_TOKEN);
    AsyncStorage.removeItem(USER_LOCALSTORAGE_REFRESH_TOKEN);

    dispatch(userLogout());
  },
);
