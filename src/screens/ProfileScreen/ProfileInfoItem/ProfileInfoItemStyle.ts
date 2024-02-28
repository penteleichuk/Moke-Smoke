import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(35);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: moderateScale(10),
  },
});
