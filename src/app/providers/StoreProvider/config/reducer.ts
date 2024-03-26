import { combineReducers } from '@reduxjs/toolkit';
import { themeReducer } from 'app/providers/ThemeProvider';
import { authReducer } from 'entities/auth';
import { invitedReducer } from 'entities/invited';
import { notificationReducer } from 'entities/notification';
import { subscriptionReducer } from 'entities/subscription';
import { userReducer } from 'entities/user';
import { currencyReducer } from 'features/currency-picker';
import { languageReducer } from 'features/language-picker';
import { progressReducer } from 'features/open-card-progres';
import { activationReducer } from 'features/passed-activation';
import { playerReducer } from 'features/player/player-control';
import { chatReducer } from 'features/send-message-chat';
import { howMuchReducer } from 'features/setting/set-how-much-smoke';
import { vibrationReducer } from 'features/setting/toggle-vibration';
import { trackerReducer } from 'features/tracker-initial';
import { tabNavigationReducer } from 'widgets/tab-navigation/model/slices/tabNavigationSlice';

export const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  notification: notificationReducer,
  vibration: vibrationReducer,
  currency: currencyReducer,
  howMuch: howMuchReducer,
  chat: chatReducer,
  player: playerReducer,
  tracker: trackerReducer,
  progress: progressReducer,
  auth: authReducer,
  user: userReducer,
  activation: activationReducer,
  invited: invitedReducer,
  tabNavigation: tabNavigationReducer,
  subscription: subscriptionReducer,
});
