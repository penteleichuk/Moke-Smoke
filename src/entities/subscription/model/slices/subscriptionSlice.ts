import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { subscriptionInitialaized } from './../services/subscriptionInitialaized/subscriptionInitialaized';
import { subscriptionProfile } from './../services/subscriptionProfile/subscriptionProfile';
import { subscriptionPurchase } from './../services/subscriptionPurchase/subscriptionPurchase';
import { subscriptionRestore } from './../services/subscriptionRestore/subscriptionRestore';
import { SubscriptionSchema } from './../types/subscription';

export const initialState: SubscriptionSchema = {
  isPremium: false,
  products: [],
  eligibility: {},
  isLoading: false,
  isError: false,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(subscriptionInitialaized.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.eligibility = action.payload.eligibility;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addMatcher(
      isAnyOf(
        subscriptionInitialaized.pending,
        subscriptionPurchase.pending,
        subscriptionProfile.pending,
        subscriptionRestore.pending,
      ),
      state => {
        state.isError = false;
        state.isLoading = false;
      },
    );
    builder.addMatcher(
      isAnyOf(
        subscriptionInitialaized.rejected,
        subscriptionPurchase.rejected,
        subscriptionProfile.rejected,
        subscriptionRestore.rejected,
      ),
      state => {
        state.isError = true;
        state.isLoading = false;
      },
    );
    builder.addMatcher(
      isAnyOf(
        subscriptionPurchase.fulfilled,
        subscriptionProfile.fulfilled,
        subscriptionRestore.fulfilled,
      ),
      (state, action) => {
        state.isPremium = action.payload.isPremium;
        state.isError = false;
        state.isLoading = false;
      },
    );
  },
});

export const subscriptionReducer = subscriptionSlice.reducer;
