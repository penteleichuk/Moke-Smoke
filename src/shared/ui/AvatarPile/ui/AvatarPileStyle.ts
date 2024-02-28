import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    padding: 1.4,
    borderRadius: moderateScale(50),
  },
  itemOffset: {
    marginLeft: -14,
  },
  count: {
    zIndex: 0,
    padding: 1.4,
    borderRadius: moderateScale(50),
    marginLeft: -9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
