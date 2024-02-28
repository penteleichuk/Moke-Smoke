import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdaptyPaywallProduct, adapty } from 'react-native-adapty';

export const subscriptionPurchase = createAsyncThunk(
  'subscription/purchase',
  async (product: AdaptyPaywallProduct, thunkAPI) => {
    try {
      const profile = await adapty.makePurchase(product);
      return {
        isPremium: profile?.accessLevels?.premium.isActive || false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  },
);
