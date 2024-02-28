import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdaptyProfile, adapty } from 'react-native-adapty';

export const subscriptionProfile = createAsyncThunk(
  'subscription/profile',
  async (_, thunkAPI) => {
    try {
      const profile: AdaptyProfile = await adapty.getProfile();
      return {
        isPremium: profile?.accessLevels?.premium.isActive || false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  },
);
