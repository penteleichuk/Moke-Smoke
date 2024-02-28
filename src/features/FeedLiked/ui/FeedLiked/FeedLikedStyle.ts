import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(20);

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(10),
    gap: moderateScale(5),
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    zIndex: 500,
  },
});
