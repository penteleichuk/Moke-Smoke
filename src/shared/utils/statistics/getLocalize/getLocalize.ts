import { getLocales } from 'react-native-localize';

export const getLocalize = <T extends string = 'en'>(): T => {
  const locales = getLocales();
  const languageCode = locales[0]?.languageCode || 'en';
  return languageCode as T;
};
