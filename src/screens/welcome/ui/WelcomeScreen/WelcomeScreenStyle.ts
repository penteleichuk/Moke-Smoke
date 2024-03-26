import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
    gap: moderateScale(30),
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
  },
  logoName: {
    marginTop: moderateScale(30),
  },
  message: {
    textAlign: 'center',
  },
});
