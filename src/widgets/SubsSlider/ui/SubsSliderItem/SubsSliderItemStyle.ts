import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const CIRCLE_SIZE = moderateScale(35);

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE,
  },
  text: {
    flex: 1,
  },
});
