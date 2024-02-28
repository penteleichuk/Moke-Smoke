import { StyleSheet } from 'react-native';
import { TITLE_MARGIN, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: TITLE_MARGIN,
  },
  content: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(25),
  },
});
