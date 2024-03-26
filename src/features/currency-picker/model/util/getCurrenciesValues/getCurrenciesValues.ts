import { currencies } from 'shared/utils/getCurrencySymbol/model/const/currency';

export const getCurrenciesValues = () => {
  return ['system', ...Object.keys(currencies)];
};
