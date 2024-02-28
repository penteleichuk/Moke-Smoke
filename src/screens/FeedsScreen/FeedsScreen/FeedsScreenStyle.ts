import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  contenetLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: MAIN_HORIZONTAL,
  },
  footer: {
    marginHorizontal: MAIN_HORIZONTAL,
    marginBottom: MAIN_HORIZONTAL,
  },
  listHeader: {
    alignItems: 'center',
  },
  anims: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
});
