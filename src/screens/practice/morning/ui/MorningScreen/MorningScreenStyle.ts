import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: MAIN_HORIZONTAL,
    paddingBottom: moderateScale(20),
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(250),
    height: moderateScale(250),
  },
  text: {
    textAlign: 'center',
  },
  footer: {
    marginTop: moderateScale(20),
  },
});
