import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(20),
  },
  info: {
    marginBottom: moderateScale(30),
    padding: moderateScale(15),
    borderRadius: 10,
  },
});
