import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(50),
    overflow: 'hidden',
  },
  animated: {
    flex: 1,
    borderRadius: moderateScale(50),
  },
});
