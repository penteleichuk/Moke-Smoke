import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userInitialized } from 'entities/user';
import {
  USER_LOCALSTORAGE_ACCESS_TOKEN,
  USER_LOCALSTORAGE_REFRESH_TOKEN,
} from 'shared/api/const/localstorage';
import { AuthLoginResponse } from './../../types/auth';

export const fetchAuth = createAsyncThunk(
  'auth/login',
  async (props: AuthLoginResponse, { dispatch }) => {
    AsyncStorage.setItem(USER_LOCALSTORAGE_ACCESS_TOKEN, props.accessToken);
    AsyncStorage.setItem(USER_LOCALSTORAGE_REFRESH_TOKEN, props.refreshToken);

    dispatch(userInitialized({ isAuth: true, user: { ...props.user } }));
  },
);
