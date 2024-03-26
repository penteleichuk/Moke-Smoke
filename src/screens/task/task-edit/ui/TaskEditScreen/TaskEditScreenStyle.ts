import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
    gap: moderateScale(30),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  animation: {
    height: moderateScale(150),
    width: moderateScale(150),
  },
  form: {
    gap: moderateScale(15),
  },
});
