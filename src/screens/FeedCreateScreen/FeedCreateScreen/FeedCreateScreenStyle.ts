import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: MAIN_HORIZONTAL,
  },
  message: {
    flexGrow: 1,
  },
  info: {
    alignItems: 'center',
    marginTop: moderateScale(25),
    paddingBottom: moderateScale(10),
    paddingHorizontal: MAIN_HORIZONTAL,
  },
  text: {
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
});
