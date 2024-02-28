import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: MAIN_HORIZONTAL,
    gap: moderateScale(40),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
});
