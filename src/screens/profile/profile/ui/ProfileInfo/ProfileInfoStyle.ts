import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(5),
  },
  pressable: {
    alignItems: 'center',
    gap: moderateScale(5),
  },
  indentLeft: {
    borderRightWidth: 1,
  },
  indentRight: {
    paddingHorizontal: moderateScale(10),
  },
});
