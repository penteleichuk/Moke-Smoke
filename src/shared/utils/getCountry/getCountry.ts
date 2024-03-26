import * as RNLocalize from 'react-native-localize';

export const getCountry = () => {
  return RNLocalize.getCountry() || 'US';
};
