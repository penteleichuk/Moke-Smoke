import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 1,
  },
  opacity: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    gap: moderateScale(10),
  },
  button: {
    textAlign: 'center',
    paddingVertical: moderateScale(14),
    textTransform: 'uppercase',
  },
});
