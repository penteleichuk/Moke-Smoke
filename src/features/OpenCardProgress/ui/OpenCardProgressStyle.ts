import { StyleSheet } from 'react-native';
import {
  CONTENT_PADDING,
  CONTENT_RADIUS,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
  },
  linear: {
    borderRadius: CONTENT_RADIUS,
    padding: CONTENT_PADDING + 5,
  },
  icon: {
    flex: 1,
    marginLeft: -10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    width: moderateScale(30),
    height: moderateScale(30),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(5),
  },
  gap: {
    marginLeft: moderateScale(10),
  },
  not: {
    opacity: 0.5,
  },
  lock: {
    opacity: 0.3,
  },
});
