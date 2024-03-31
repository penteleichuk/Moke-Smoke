import { currencies } from 'shared/lib/intl/getCurrencySymbol/model/const/currency';

export const getCurrenciesValues = () => {
  return ['system', ...Object.keys(currencies)];
};
