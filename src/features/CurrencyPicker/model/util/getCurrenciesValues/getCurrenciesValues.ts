import { currencies } from 'shared/lib/utils/getCurrencySymbol/model/const/currency';

export const getCurrenciesValues = () => {
  return ['system', ...Object.keys(currencies)];
};
