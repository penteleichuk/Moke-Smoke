import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
  toaster: {
    marginHorizontal: MAIN_HORIZONTAL,
  },
});
