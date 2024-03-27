import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(10),
  },
  animation: {
    width: moderateScale(200),
    height: moderateScale(140),
  },
  text: {
    textAlign: 'center',
  },
});
