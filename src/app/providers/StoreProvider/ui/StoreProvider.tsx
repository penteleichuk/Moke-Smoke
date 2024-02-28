import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './../config/store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  return <Provider store={store}>{props.children}</Provider>;
};
