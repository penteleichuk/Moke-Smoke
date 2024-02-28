import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: moderateScale(60),
    height: moderateScale(60),
    alignItems: 'center',
  },
  desc: {
    alignItems: 'center',
  },
});
