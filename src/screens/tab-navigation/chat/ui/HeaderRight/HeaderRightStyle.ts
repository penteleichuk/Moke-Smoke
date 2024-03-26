import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: moderateScale(50),
    marginRight: moderateScale(5),
  },
});
