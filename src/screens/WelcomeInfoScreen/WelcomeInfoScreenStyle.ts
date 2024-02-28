import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  title: {
    textAlign: 'center',
  },
  inputs: {
    gap: moderateScale(20),
  },
});
