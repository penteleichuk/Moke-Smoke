import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: CONTENT_RADIUS,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  gradient: {
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(8),
  },
  subtitle: {
    marginTop: moderateScale(5),
  },
  subtitleDecoration: {
    textDecorationLine: 'line-through',
  },
});
