import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    gap: moderateScale(15),
    marginHorizontal: MAIN_HORIZONTAL,
  },
});
