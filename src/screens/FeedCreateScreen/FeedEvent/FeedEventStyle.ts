import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(200),
    height: moderateScale(140),
  },
  title: {
    marginBottom: moderateScale(10),
  },
  description: {
    textAlign: 'center',
  },
});
