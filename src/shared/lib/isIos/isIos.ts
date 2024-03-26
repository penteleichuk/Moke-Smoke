import { Platform } from 'react-native';

export const isIos = () => {
  return Platform.OS === 'ios' ? true : false;
};
