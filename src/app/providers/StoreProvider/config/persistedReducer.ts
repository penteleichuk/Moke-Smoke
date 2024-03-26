import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMigrate, persistReducer } from 'redux-persist';
import { rootReducer } from './reducer';

const rootMigrations = {
  22: (state: any) => ({
    ...state,
  }),
};

const persistConfig = {
  key: 'app',
  version: 22,
  storage: AsyncStorage,
  migrate: createMigrate(rootMigrations),
  // blacklist: [],
  whitelist: [
    'auth',
    'user',
    'language',
    'theme',
    'notification',
    'vibration',
    'activation',
    'settings',
    'currency',
    'howMuch',
    'player',
    'tracker',
  ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
