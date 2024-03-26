import { getCurrencies } from 'react-native-localize';

export const getAppCurrencies = (): string => {
  return getCurrencies()[0] || 'USD';
};
