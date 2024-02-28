import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    padding: moderateScale(25),
    borderRadius: moderateScale(25),
    minHeight: moderateScale(200),
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: moderateScale(15),
    flexDirection: 'row',
    gap: moderateScale(10),
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: 60,
  },
});
