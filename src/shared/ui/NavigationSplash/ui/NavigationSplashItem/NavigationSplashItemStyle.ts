import { StyleSheet } from 'react-native';
import { MAIN_VERTICAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginVertical: MAIN_VERTICAL,
  },
  pressable: {
    borderWidth: 1,
    justifyContent: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  pressableText: {
    width: 'auto',
    paddingHorizontal: moderateScale(20),
  },
  disabled: {
    opacity: 0.3,
  },
  icon: {
    alignSelf: 'center',
  },
});
