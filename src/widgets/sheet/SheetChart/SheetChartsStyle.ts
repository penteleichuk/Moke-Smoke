import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: moderateScale(30),
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: moderateScale(160),
  },
});
