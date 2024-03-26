import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  content: {
    flexDirection: 'row',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    gap: moderateScale(20),
  },
  download: {
    paddingHorizontal: moderateScale(5),
  },
});
