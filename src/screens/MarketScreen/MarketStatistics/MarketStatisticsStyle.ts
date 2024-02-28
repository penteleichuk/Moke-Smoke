import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: MAIN_HORIZONTAL,
    paddingVertical: moderateScale(15),
  },
  content: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  left: {
    borderRightWidth: 1,
    paddingRight: moderateScale(20),
    alignItems: 'center',
  },
  right: {
    alignItems: 'center',
  },
});
