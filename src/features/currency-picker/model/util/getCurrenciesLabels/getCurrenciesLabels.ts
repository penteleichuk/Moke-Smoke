import { currencies } from 'shared/lib/intl/getCurrencySymbol/model/const/currency';

export const getCurrenciesLabels = (first: string) => {
  const currencyValues = Object.values(currencies);
  return [
    first,
    ...currencyValues.map(currency => `${currency.name} - ${currency.symbol}`),
  ];
};
