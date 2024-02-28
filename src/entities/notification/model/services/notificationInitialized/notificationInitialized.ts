import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationApi } from './../../api/notificationApi';

export const notificationInitialized = createAsyncThunk(
  'notification/initialized',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState() as StateSchema;

    await notifee.requestPermission();
    await messaging().registerDeviceForRemoteMessages();

    if (auth.isAuth) {
      try {
        const token = await messaging().getToken();
        notificationApi.setToken(token);
      } catch (error) {}
    }
  },
);
