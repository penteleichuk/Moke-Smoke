import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  continaer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  contentContainer: {
    height: moderateScale(20),
  },
  footerContainer: {
    paddingBottom: moderateScale(20),
  },
});
