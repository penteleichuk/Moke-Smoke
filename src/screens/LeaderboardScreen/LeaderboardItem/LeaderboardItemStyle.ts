import { StyleSheet } from 'react-native';
import {
  CONTENT_PADDING,
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    paddingVertical: CONTENT_PADDING,
    marginHorizontal: MAIN_HORIZONTAL,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: moderateScale(10),
  },
  count: {
    marginRight: moderateScale(10),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(5),
    gap: moderateScale(5),
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
    paddingHorizontal: CONTENT_PADDING,
    borderRadius: CONTENT_RADIUS,
    gap: moderateScale(5),
  },
});
