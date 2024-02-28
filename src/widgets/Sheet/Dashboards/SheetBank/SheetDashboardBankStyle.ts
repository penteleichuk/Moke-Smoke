import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(160),
  },
  text: {
    textAlign: 'center',
  },
});
