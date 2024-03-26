import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    padding: moderateScale(8),
    borderRadius: moderateScale(15),
    bottom: 1,
    right: 1,
  },
});
