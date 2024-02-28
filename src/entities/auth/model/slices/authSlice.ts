import { createSlice } from '@reduxjs/toolkit';
import { authLogout } from './../services/authLogout/authLogout';
import { fetchAuth } from './../services/fetchAuth/fetchAuth';

export interface AuthShema {
  isAuth: boolean;
}

export const initialState: AuthShema = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAuth.fulfilled, state => {
      state.isAuth = true;
    });
    builder.addCase(authLogout.fulfilled, state => {
      state.isAuth = false;
    });
  },
});

export const authReducer = authSlice.reducer;
