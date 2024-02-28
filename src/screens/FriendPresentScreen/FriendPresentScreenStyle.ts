import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MAIN_HORIZONTAL,
  },
  contentContainer: {
    paddingBottom: moderateScale(30),
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anim: {
    height: moderateScale(300),
  },
  content: {
    flex: 1,
  },
});
