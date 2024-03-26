import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { ChatSchema } from './../types/chat';

const SECONDS_DELAY = 15;

export const initialState: ChatSchema = {
  uuid: uuid.v4() as string,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessageDelay: state => {
      const currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() + SECONDS_DELAY);
      state.delay = currentDate;
    },
  },
});

export const { setMessageDelay } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
