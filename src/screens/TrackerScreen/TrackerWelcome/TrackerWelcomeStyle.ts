import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    alignItems: 'center',
    width: '80%',
    height: 200,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  info: {
    marginTop: moderateScale(40),
    padding: moderateScale(15),
    gap: moderateScale(15),
    borderRadius: CONTENT_RADIUS,
  },
});
