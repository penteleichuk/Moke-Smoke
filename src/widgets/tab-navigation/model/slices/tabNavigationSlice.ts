import { createSlice } from '@reduxjs/toolkit';
import { TabNavigationSchema } from './../types/tab-navigation';

const currentDate = new Date();

export const initialState: TabNavigationSchema = {
  review: new Date(currentDate.setHours(currentDate.getHours() + 1)),
};

export const tabNavigationSlice = createSlice({
  name: 'tab_navigation',
  initialState,
  reducers: {
    setReview: state => {
      state.review = new Date(
        currentDate.setHours(currentDate.getHours() + 48),
      );
    },
  },
});

export const { setReview } = tabNavigationSlice.actions;
export const tabNavigationReducer = tabNavigationSlice.reducer;
