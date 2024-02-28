import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: moderateScale(5),
  },
  animation: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
  },
  text: {
    flex: 1,
  },
});
