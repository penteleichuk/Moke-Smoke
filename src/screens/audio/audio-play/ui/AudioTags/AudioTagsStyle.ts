import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(10),
  },
  tag: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(15),
  },
});
