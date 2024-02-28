import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(30);

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
  },
  arrow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
