import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  animation: {
    height: moderateScale(120),
    marginVertical: moderateScale(10),
  },
  text: {
    textAlign: 'center',
  },
});
