import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MAIN_HORIZONTAL,
  },
  content: {
    paddingBottom: moderateScale(50),
    gap: moderateScale(10),
  },
  header: {
    gap: moderateScale(5),
    marginBottom: moderateScale(15),
  },
});
