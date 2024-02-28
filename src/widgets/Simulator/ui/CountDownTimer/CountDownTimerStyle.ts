import { StyleSheet } from 'react-native';
import { CONTENT_IN_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONTENT_IN_RADIUS,
    minWidth: moderateScale(90),
  },
  anim: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});
