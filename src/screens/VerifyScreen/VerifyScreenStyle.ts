import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  avoiding: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(180),
  },
  description: {
    textAlign: 'center',
  },
  wrapper: {
    gap: moderateScale(20),
    justifyContent: 'center',
  },
  title: {
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
});
