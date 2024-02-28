import { StyleSheet } from 'react-native';
import { CONTENT_IN_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    gap: moderateScale(5),
  },
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderRadius: CONTENT_IN_RADIUS,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    borderWidth: 1,
  },
  error: {
    marginTop: moderateScale(5),
  },
});
