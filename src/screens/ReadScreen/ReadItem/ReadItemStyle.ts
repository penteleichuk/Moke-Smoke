import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  border: {
    height: moderateScale(130),
    padding: moderateScale(4),
    overflow: 'hidden',
    borderRadius: CONTENT_RADIUS * 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: CONTENT_RADIUS * 2,
  },
  lock: {
    opacity: 0.2,
  },
  name: {
    marginHorizontal: moderateScale(15),
  },
  timing: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: moderateScale(15),
  },
  time: {
    marginHorizontal: moderateScale(5),
  },
});
