import { currencies } from './model/const/currency';

export const getCurrencySymbol = (country: string) => {
  if (currencies.hasOwnProperty(country)) {
    return currencies[country].symbol;
  }
  return currencies.USD.symbol;
};
