import { ADAPTY_PLACEMENT_ID, ADAPTY_PUBLIC_KEY } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { adapty } from 'react-native-adapty';

export const subscriptionInitialaized = createAsyncThunk(
  'subscription/initialized',
  async (_, thunkAPI) => {
    try {
      await adapty.activate(ADAPTY_PUBLIC_KEY);

      const paywall = await adapty.getPaywall(ADAPTY_PLACEMENT_ID);
      const products = await adapty.getPaywallProducts(paywall);

      const eligibility =
        await adapty.getProductsIntroductoryOfferEligibility(products);
      return { products, eligibility };
    } catch (err) {
      return thunkAPI.rejectWithValue({});
    }
  },
);
