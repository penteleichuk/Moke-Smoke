import { StyleSheet } from 'react-native';
import { CONTENT_IN_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    borderRadius: CONTENT_IN_RADIUS,
    gap: moderateScale(10),
  },
});
