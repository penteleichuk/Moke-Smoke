import { StyleSheet } from 'react-native';
import {
  CONTENT_IN_RADIUS,
  CONTENT_PADDING,
  CONTENT_RADIUS,
  TITLE_MARGIN,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: TITLE_MARGIN,
  },
  content: {
    borderRadius: CONTENT_RADIUS,
    padding: CONTENT_PADDING,
    gap: CONTENT_PADDING,
    borderWidth: 1,
  },
  anim: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: CONTENT_PADDING,
  },
  timerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONTENT_IN_RADIUS,
    minWidth: moderateScale(90),
  },
});
