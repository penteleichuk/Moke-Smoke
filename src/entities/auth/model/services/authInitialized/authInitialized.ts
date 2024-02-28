import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userInitialized } from 'entities/user';
import { AuthApi } from './../../api/authApi';
import { authLogout } from './../authLogout/authLogout';

export const authInitialized = createAsyncThunk(
  'auth/initialized',
  async (_, { getState, dispatch }) => {
    const { auth, user } = getState() as StateSchema;

    if (auth.isAuth) {
      try {
        const data = await AuthApi.initialized(user);
        dispatch(userInitialized({ isAuth: true, user: data }));
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          dispatch(authLogout());
        }
      }

      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (!refreshToken) {
        dispatch(authLogout());
      }
    }
  },
);
