import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(9),
  },
  buttonGoogle: {
    paddingVertical: moderateScale(10),
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(9),
  },
});
