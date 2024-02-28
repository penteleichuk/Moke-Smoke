import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(10),
  },
  animation: {
    justifyContent: 'center',
    width: moderateScale(160),
    height: moderateScale(160),
  },
  text: {
    textAlign: 'center',
  },
});
