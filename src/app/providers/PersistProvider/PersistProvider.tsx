import React, { FC } from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './../StoreProvider';

interface PersistProviderProps {
  children: React.ReactNode;
}

const persistor = persistStore(store);

export const PersistProvider: FC<PersistProviderProps> = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
