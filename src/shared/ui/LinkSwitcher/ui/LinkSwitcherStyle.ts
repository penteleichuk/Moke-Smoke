import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(30);

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  first: {
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
});
