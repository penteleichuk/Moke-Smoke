import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from './../types/notification';

export const initialState: NotificationSchema = {
  isEnabled: true,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationIsEnabled: (
      state,
      action: PayloadAction<{ isEnabled: boolean }>,
    ) => {
      state.isEnabled = action.payload.isEnabled;
    },
    toggleNotification: state => {
      state.isEnabled = !state.isEnabled;
    },
  },
});

export const { setNotificationIsEnabled, toggleNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
