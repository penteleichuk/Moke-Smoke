import { StyleSheet } from 'react-native';
import { TITLE_MARGIN, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: TITLE_MARGIN,
  },
  text: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: TITLE_MARGIN * 2,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  progress: {
    height: moderateScale(35),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  progressLine: {
    flex: 1,
  },
});
