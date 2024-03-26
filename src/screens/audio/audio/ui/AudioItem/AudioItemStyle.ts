import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    marginBottom: moderateScale(10),
  },
  content: {
    flexDirection: 'row',
    padding: moderateScale(20),
    gap: moderateScale(15),
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
  text: {
    flex: 1,
  },
  image: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(15),
  },
});
