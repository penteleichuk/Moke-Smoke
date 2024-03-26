import { StyleSheet } from 'react-native';
import { CONTENT_IN_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: CONTENT_IN_RADIUS,
    padding: moderateScale(8),
    gap: moderateScale(5),
  },
});
