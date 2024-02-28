import { StyleSheet } from 'react-native';
import { CONTENT_IN_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  content: {
    position: 'relative',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  input: {
    borderRadius: CONTENT_IN_RADIUS,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(14),
  },
});
