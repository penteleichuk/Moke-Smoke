import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animation: {
    height: moderateScale(150),
  },
  text: {
    marginTop: moderateScale(15),
    alignItems: 'center',
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
});
