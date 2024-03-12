import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'entities/auth';
import { invitedReducer } from 'entities/invited';
import { notificationReducer } from 'entities/notification';
import { subscriptionReducer } from 'entities/subscription';
import { themeReducer } from 'entities/theme';
import { userReducer } from 'entities/user';
import { currencyReducer } from 'features/CurrencyPicker';
import { languageReducer } from 'features/LanguagePicker';
import { progressReducer } from 'features/OpenCardProgress';
import { activationReducer } from 'features/PassedActivation';
import { playerReducer } from 'features/PlayerControl';
import { chatReducer } from 'features/SendMessageChat';
import { howMuchReducer } from 'features/SetHowMuchSmoke';
import { vibrationReducer } from 'features/ToggleVibration';
import { trackerReducer } from 'features/TrackerInitial';
import { tabNavigationReducer } from 'widgets/TabNavigation/model/slices/tabNavigationSlice';

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
