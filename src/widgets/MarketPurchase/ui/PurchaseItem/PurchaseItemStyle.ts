import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONTENT_RADIUS,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(30),
  },
  animation: {
    width: moderateScale(100),
    height: moderateScale(90),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: moderateScale(5),
  },
  price: {
    textAlign: 'center',
  },
  text: {
    marginVertical: moderateScale(10),
  },
  description: {
    textAlign: 'center',
  },
});
